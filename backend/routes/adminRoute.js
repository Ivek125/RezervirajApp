import express from 'express';
import { addDoctor } from '../controllers/adminController.js';
import { upload } from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor); // Endpoint for adding a doctor

export default adminRouter;
// Ovaj router se koristi za administrativne funkcionalnosti, uključujući dodavanje liječnika.
