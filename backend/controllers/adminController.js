import validator from 'validator';
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js'; // Import the doctor model
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js'; // Import the user model
import jwt from 'jsonwebtoken'; // Import JWT for token generation
import { sendEmail, formatApptSummary } from '../utils/mailer.js';


// API za dodavanje liječnika

const addDoctor = async (req, res) => {
  try {
    const { name, password, email, speciality, degree, experience, about, fees, address } = req.body;

    const imageFile = req.file;

    //validacija za podatke za doktora
    if (!name || !password || !email || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.status(400).json( {success: false, message: 'Missing details' });
    }
    //validacija emaila
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
    //validacija strong passworda
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ success: false, message: 'Weak password. Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.' });
    }
    // enkripcija passworda (bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload slike na cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address, // Pretvaranje adrese u objekt
      image: imageUrl, // URL slike
      date: Date.now()
    }
    
   

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: 'Doctor added successfully', data: newDoctor });

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });

  }
}
  //API za admin login
  const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;

      //validacija za email i password
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Missing email or password' });
      }

      //provjera admina
      if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      // Generisanje JWT tokena
      const token = jwt.sign(email+password, process.env.JWT_SECRET);

      res.json({ success: true, message: 'Admin logged in successfully', token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  //API za listu doktora iz bp
  const allDoctors = async (req, res) => {
    try {
      const doctors = await doctorModel.find({}).select('-password');
      res.json({ success: true, doctors: doctors });

    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };


  //API za listu termina
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za otkazivanje termina
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ success: false, message: 'Missing appointment ID' });
    }

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = 'canceled';
    await appointment.save();

    // Free the doctor's slot as well
    const doctorData = await doctorModel.findById(appointment.docId);
    if (doctorData) {
      let slots_booked = doctorData.slots_booked || {};
      if (slots_booked[appointment.slotDate]) {
        slots_booked[appointment.slotDate] = slots_booked[appointment.slotDate].filter(
          (t) => t !== appointment.slotTime
        );
      }
      await doctorModel.findByIdAndUpdate(doctorData._id, { slots_booked });
    }

    // Email notifications (best-effort)
    const subject = 'Termin otkazan (admin)';
    const text = formatApptSummary({ appt: appointment, prefix: 'Termin je otkazan' });
    const patientEmail = appointment?.userData?.email;
    const doctorEmail = appointment?.docData?.email;
    if (patientEmail) sendEmail({ to: patientEmail, subject, text });
    if (doctorEmail) sendEmail({ to: doctorEmail, subject, text });

    res.json({ success: true, message: 'Appointment canceled successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API za statistiku
 const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    // Statistika po danima
    const appointmentsByDay = {};
    const appointmentsByHour = {};

    appointments.forEach((appt) => {
      const day = new Date(appt.slotDate).toLocaleDateString("en-US", { weekday: 'long' });
      appointmentsByDay[day] = (appointmentsByDay[day] || 0) + 1;

      const hour = appt.slotTime.split(":")[0]; // Pretpostavljamo format HH:MM
      appointmentsByHour[hour] = (appointmentsByHour[hour] || 0) + 1;
    });

    const dashData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5),
      appointmentsByDay,
      appointmentsByHour
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, cancelAppointment, adminDashboard };
