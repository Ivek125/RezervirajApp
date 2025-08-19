import doctorModel from "../models/doctorModel.js"
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

const changeAvailability = async (req, res) => {
  const { id } = req.params
  const { available } = req.body

  try {
    const {docID} = req.body
    const docData = await doctorModel.findById(docID)
    await doctorModel.findByIdAndUpdate(docID, { available: !docData.available })
    res.json({ success: true, message: 'Dostupnost doktora promijenjena' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password','-email']);
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API za login doktora
const loginDoctor = async (req, res) => {
  

  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) return res.json({ success: false, message: ' Email ne postoji' });

    const isMatch = await bycrypt.compare(password, doctor.password);
    if (!isMatch) return res.json({ success: false, message: 'Pogresna lozinka' });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { changeAvailability, doctorList, loginDoctor }
