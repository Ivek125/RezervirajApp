import validator from 'validator'
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js'; // Import the user model
import doctorModel from '../models/doctorModel.js'; // Import the doctor model
import appointmentModel from '../models/appointmentModel.js'; // Import the appointment model
import jwt from 'jsonwebtoken'; // Import JWT for token generation
import {v2 as cloudinary}  from 'cloudinary';

//API za reg korisnika
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    //validacija podataka
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'All fields are required' });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid email' });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({ success: false, message: 'Weak password. Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.' });
    }

    //hashing lozinke
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
        name,
        email,
        password: hashedPassword
    }

    const newUser = new userModel(userData);
    const user = await newUser.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token } );

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za login korisnika

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
  

    //provjera korisnika
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    //provjera lozinke
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za profil korisnika
const getUserProfile = async (req, res) => {
  

  try {
    const { userId } = req.user;
    const userData = await userModel.findById(userId).select('-password'); // Exclude password from the response
    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za updejt profila korisnika
const updateProfile = async (req, res) => {

  const { userId } = req.user; // Get userId from the authenticated user
  const { name, phone, address, dob, gender } = req.body;
  const imageFile = req.file; // za multer


  try {

  if (!name || !phone || !dob || !gender || !address) {
    return res.json({ success: false, message: 'Data mising' });
  }
 const updatedUser = await userModel.findByIdAndUpdate(userId, {
     name,
     phone,
   address,
     dob,
     gender,

  }, { new: true }); 
  
  if (imageFile) {

    //upload slike na cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
    const imageURL = imageUpload.secure_url;

    await userModel.findByIdAndUpdate(userId, { image: imageURL });
  }
  res.json({ success: true, message: 'Profile updated successfully' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za rezervaciju termina
const bookAppointment = async (req, res) => {
 
  try {
  const { userId } = req.user; 
  // accept both docId and doctorId for compatibility
  const { docId: docIdRaw, doctorId: doctorIdRaw, slotDate, slotTime } = req.body;
  const doctorId = docIdRaw || doctorIdRaw;

  const docData = await doctorModel.findById(doctorId).select('-password');
    
    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor is not available' });
    }

    let slots_booked = docData.slots_booked; //kopiranje liste za provjeru
    
    //checkiranje za dostupnost timeslota (isti termin se ne moze dodati)

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Time slot is already booked' });
      }else {
        slots_booked[slotDate].push(slotTime);
      }
    }else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    //spremanje podataka, visak brisi
    const userData = await userModel.findById(userId).select('-password');
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId: doctorId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      status: 'pending',
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // spremanje podataka u doktorData
  await doctorModel.findByIdAndUpdate(doctorId, { slots_booked: slots_booked });
    res.json({ success: true, message: 'Appointment booked successfully' });


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za moje termine
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.user; // Get userId from the authenticated user
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za prekid termina
const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ success: false, message: 'Missing appointment ID' });
    }

    // Provjera postoji li termin
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Provjeri da li termin pripada korisniku
    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized action' });
    }

    // Promijeni status u "canceled"
  appointmentData.status = 'canceled';
  await appointmentData.save();

    // Vraćanje slobodnog termina doktoru
    const doctorData = await doctorModel.findById(appointmentData.docId);
    if (doctorData) {
      let slots_booked = doctorData.slots_booked;
      if (slots_booked[appointmentData.slotDate]) {
        slots_booked[appointmentData.slotDate] = slots_booked[appointmentData.slotDate].filter(
          slot => slot !== appointmentData.slotTime
        );
      }
      await doctorModel.findByIdAndUpdate(doctorData._id, { slots_booked });
    }

    // Email notifications (best-effort)
    try {
      const { sendEmail, formatApptSummary } = await import('../utils/mailer.js')
      const subject = 'Termin otkazan'
      const text = formatApptSummary({ appt: appointmentData, prefix: 'Vaš termin je otkazan' })
      const patientEmail = appointmentData?.userData?.email
      const doctorEmail = appointmentData?.docData?.email
      if (patientEmail) sendEmail({ to: patientEmail, subject, text })
      if (doctorEmail) sendEmail({ to: doctorEmail, subject, text })
    } catch (e) {
      console.warn('Email notify failed or disabled:', e?.message || e)
    }

    res.json({ success: true, message: 'Appointment canceled successfully', appointment: appointmentData });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { registerUser, loginUser, getUserProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };