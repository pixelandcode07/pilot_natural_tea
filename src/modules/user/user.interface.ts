import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  avatar?: string;
  role: "user" | "admin";
}