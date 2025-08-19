import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  cancelled: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" },
  isCompleted: { type: Boolean, default: false }
});

const appointmentModel = mongoose.model("Appointment", appointmentSchema);

export default appointmentModel;