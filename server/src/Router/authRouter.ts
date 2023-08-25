import { Router } from "express";
import { alluserController, deleteUserController, loginController, signUpController, updateUserController } from "../controller/userController";
import upload from "../middleware/Multer";
import { isadmin, requireSignin } from "../middleware/authMiddleware";

const app = Router();

app.post("/signup",upload.single("avatar"),signUpController);
app.post("/login",loginController);
app.get('/all-users',alluserController)
app.delete('/delete-user/:userId',requireSignin, isadmin, deleteUserController)
app.put('/update-user-role/:userId',requireSignin ,isadmin,updateUserController)

app.get("/admin-auth",requireSignin,isadmin, (req, res) => {
    res.status(200).send({ isAdmin: true });
  });
  
export const authRouter = app