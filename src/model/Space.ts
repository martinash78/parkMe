import mongoose, { Schema, Document } from "mongoose";

export interface ISpace extends Document {
  _id: number;
  status: string;
  ownerId: string;
  onLoan: boolean;
  loaneeId: number;
}

export const spaceSchema = new Schema({
  _id: { type: Number, required: true },
  ownerId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  onLoan: { type: Boolean, required: true },
  loaneeId: { type: Number, required: false },
});

const Space = mongoose.model<ISpace>("Space", spaceSchema);
export default Space;
