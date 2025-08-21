import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { sendEmail, formatApptSummary } from "../utils/mailer.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const changeAvailability = async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  try {
    const { docID } = req.body;
    const docData = await doctorModel.findById(docID);
    await doctorModel.findByIdAndUpdate(docID, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Dostupnost doktora promijenjena" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za login doktora
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor)
      return res.json({ success: false, message: " Email ne postoji" });

    const isMatch = await bycrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.json({ success: false, message: "Pogresna lozinka" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API za doktor appointments za doktora
const appointmentsDoctor = async (req, res) => {
  try {
  // Prefer id from auth middleware; fallback to body
  const docId = req?.body?.docId;
  const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API za prihvaćanje termina od strane doktora
const acceptAppointment = async (req, res) => {
  try {
  const { appointmentId, docId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing appointment ID" });
    }

    const appt = await appointmentModel.findById(appointmentId);
    if (!appt) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // provjera da li termin pripada ovom doktoru
    if (String(appt.docId) !== String(docId)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Forbidden: This appointment does not belong to you",
        });
    }

    // postavljanje statusa na "confirmed" (što tvoj model koristi)
  appt.status = "confirmed";
  await appt.save();

  // send emails (best-effort)
  const subject = "Termin potvrđen";
  const text = formatApptSummary({ appt, prefix: "Vaš termin je potvrđen" });
  const patientEmail = appt?.userData?.email;
  const doctorEmail = appt?.docData?.email;
  if (patientEmail) sendEmail({ to: patientEmail, subject, text });
  if (doctorEmail) sendEmail({ to: doctorEmail, subject, text });

    return res.json({
      success: true,
      message: "Appointment accepted successfully",
      appointment: appt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const cancelAppointmentDoctor = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing appointment ID" });
    }

    const appt = await appointmentModel.findById(appointmentId);
    if (!appt) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // provjera da li termin pripada ovom doktoru
    if (String(appt.docId) !== String(docId)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Forbidden: This appointment does not belong to you",
        });
    }

    // postavljanje statusa na "canceled"
  appt.status = "canceled";

  await appt.save();

    //vracanje termina
    const doctorData = await doctorModel.findById(docId);
    if (doctorData) {
      let slots_booked = doctorData.slots_booked || {};

      if (slots_booked[appt.slotDate]) {
        // ukloni termin iz booked lista
        slots_booked[appt.slotDate] = slots_booked[appt.slotDate].filter(
          (slot) => slot !== appt.slotTime
        );
      }

      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

  // send emails (best-effort)
  const subject = "Termin otkazan";
  const text = formatApptSummary({ appt, prefix: "Vaš termin je otkazan" });
  const patientEmail = appt?.userData?.email;
  const doctorEmail = appt?.docData?.email;
  if (patientEmail) sendEmail({ to: patientEmail, subject, text });
  if (doctorEmail) sendEmail({ to: doctorEmail, subject, text });

  return res.json({
      success: true,
      message: "Appointment canceled successfully",
      appointment: appt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//API za dash data doktor panela
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    // Fetch doctor data
    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Fetch appointments for the doctor
    const appointments = await appointmentModel.find({ docId });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    return res.json({ success: true, dashboard: dashData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
//API za doktor profil
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    // Fetch doctor data
    const profileData = await doctorModel.findById(docId).select("-password");
    if (!profileData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    return res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//API za updejtanje profila (doctor panel)
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available, about } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    return res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  acceptAppointment,
  cancelAppointmentDoctor,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
