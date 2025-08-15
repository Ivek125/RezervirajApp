import validator from 'validator'
import bycrpyt from 'bcrypt'
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js'; // Import the user model
import jwt from 'jsonwebtoken'; // Import JWT for token generation

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

export { registerUser, loginUser, getUserProfile };