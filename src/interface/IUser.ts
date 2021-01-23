import { Document } from "mongoose";

export interface IUser extends Document {
  forename: string;
  surname: string;
  department: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  __v?: number;
}
