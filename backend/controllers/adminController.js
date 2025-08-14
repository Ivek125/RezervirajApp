import validator from 'validator';
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js'; // Import the doctor model
import jwt from 'jsonwebtoken'; // Import JWT for token generation


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

export {addDoctor, loginAdmin};