import express from 'express';
import { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, cancelAppointment, adminDashboard } from '../controllers/adminController.js';
import { upload } from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js'; // Middleware for admin authentication
import { changeAvailability } from '../controllers/doctorController.js'; // Importing the changeAvailability function

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor); // Endpoint for adding a doctor
adminRouter.post('/login', loginAdmin); // Endpoint for admin login
adminRouter.post('/all-doctors', authAdmin, allDoctors); // Endpoint for getting all doctors
adminRouter.post('/change-availability', authAdmin, changeAvailability); // Endpoint for changing doctor availability
adminRouter.get('/appointments', authAdmin, appointmentsAdmin); // Endpoint for getting all appointments

adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment); // Endpoint for canceling an appointment
adminRouter.get('/dashboard', authAdmin, adminDashboard); // Endpoint for getting dashboard data

export default adminRouter;
// Ovaj router se koristi za administrativne funkcionalnosti, uključujući dodavanje liječnika.
