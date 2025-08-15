import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB  from './config/mongodb.js';  
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js'; // Importing the admin router
import doctorRouter from './routes/doctorRoute.js'; // Importing the doctor router
import userRouter from './routes/userRoute.js';
import multer from 'multer';

//app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();


//middleware
app.use(cors());
app.use(express.json());

//api endpoints
  app.use('/api/admin', adminRouter);   // localhost:4000/api/admin/add-doctor
  app.use('/api/doctor', doctorRouter); // localhost:4000/api/doctor/list
  app.use('/api/user', userRouter); // localhost:4000/api/user/register

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});