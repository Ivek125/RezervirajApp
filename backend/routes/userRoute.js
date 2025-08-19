import express from "express";
import { registerUser, loginUser, getUserProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js"; // Import the authentication middleware
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getUserProfile);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

userRouter.post("/book-appointment", authUser, bookAppointment);

userRouter.get("/appointments", authUser, listAppointment);

userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
