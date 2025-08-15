import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js"; // Import the authentication middleware

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getUserProfile);

export default userRouter;
