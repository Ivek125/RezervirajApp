import express from 'express';
import { addDoctor, loginAdmin } from '../controllers/adminController.js';
import { upload } from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js'; // Middleware for admin authentication

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor); // Endpoint for adding a doctor
adminRouter.post('/login', loginAdmin); // Endpoint for admin login


export default adminRouter;
// Ovaj router se koristi za administrativne funkcionalnosti, uključujući dodavanje liječnika.
