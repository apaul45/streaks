import mongoose, { Schema } from "mongoose";
import { User } from "../di";

const userSchema: Schema = new Schema<User>(
  {
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    streak: { type: Number, required: true },
    lastSignIn: { type: Date, required: false },
    coins: { type: Number, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
