import { Router } from "express";
import { alluserController, deleteUserController, loginController, signUpController, updateUserController } from "../controller/userController";
import upload from "../middleware/Multer";

const app = Router();

app.post("/signup",upload.single("avatar"),signUpController);
app.post("/login",loginController);
app.get('/all-users',alluserController)
app.delete('/delete-user/:userId',deleteUserController)
app.put('/update-user-role/:userId',updateUserController)
export const authRouter = app