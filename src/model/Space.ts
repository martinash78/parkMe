import mongoose, { Schema, Document } from "mongoose";
import { ISpace } from "../interface/ISpace";

export const spaceSchema = new Schema({
  _id: { type: Number, required: true },
  ownerId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  onLoan: { type: Boolean, required: true },
  loaneeId: { type: String, required: false },
});

const Space = mongoose.model<ISpace>("Space", spaceSchema);
export default Space;
