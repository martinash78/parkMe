import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interface/IUser";

const userSchema = new Schema({
  forename: { type: String, required: true },
  surname: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now() },
  __V: { type: Number, default: 0 },
});

const User = mongoose.model<IUser & Document>("User", userSchema);
export default User;
