import { Document } from "mongoose";

export interface ISpace extends Document {
  _id: number;
  status: string;
  ownerId: string;
  onLoan: boolean;
  loaneeId: string;
}
