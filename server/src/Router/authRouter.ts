import { Router } from "express";
import { loginController, signUpController } from "../controller/userController";
import upload from "../middleware/Multer";

const app = Router();

app.post("/signup",upload.single("avatar"),signUpController);
app.post("/login",loginController);



export const router = app