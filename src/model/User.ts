import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  forename: string;
  surname: string;
  department: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}

const userSchema = new mongoose.Schema({
  forename: { type: String, required: true },
  surname: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
