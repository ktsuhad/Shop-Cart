import mongoose from "mongoose";
import { userInterface } from "../interface/userInterface";

const userSchema = new mongoose.Schema<userInterface>(
  {
    name: {
      type: String,
      required:[true,'name is required'],
    },
    email: {
      type: String,
      required:[true,'email is required'],
      unique:true
    },
    password: {
      type: String,
      required:[true,'password is required'],
    },
    avatar:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;