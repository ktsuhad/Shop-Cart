import { Request, Response } from "express";
import userModel from "../Model/userModel";
import { userInterface } from "../interface/userInterface";
import { comparePassword, hashPassword } from "../Helpers/authHelper";
import jwt from "jsonwebtoken";
import fs from "fs";

//Register user
export const signUpController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const avatarUrl = req.file ? req.file.path : null;

    if (!name || !email || !password) {
      res.status(400).send({ message: "all fields are required" });
    }

    //find exist user
    const existingUser = await userModel.findOne({ email });

    //if esists
    if (existingUser) {
      const filename = req.file?.filename;
      const filepath = `../uploads/${filename}`;
      fs.unlink(filepath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "error deleting file" });
        } else {
          res.status(500).send({ message: "file deleting succefully " });
        }
      });
      return res.status(409).send("User already exists");
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    // let role = "user";
    // if (password === (process.env.SECRETE_KEY as string)) {
    //   role = "admin";
    // }

    const newUser = new userModel<userInterface>({
      name,
      email,
      password: hashedPassword as string,
      avatar: avatarUrl,
    });

    await newUser.save();
    res
      .status(201)
      .send({ success: true, message: "user registered successfuly" });
  } catch (error) {
    res.status(500).send({ success: false, message: "error in registering" });
  }
};

// -----------------------------------------------------------------------------

//login user
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    //validation
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "all field are mandatory" });
    }

    //find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(302)
        .send({ success: false, message: "user not found" });
    }

    //compare password and hashed password
    const match = await comparePassword(password, user.password as string);
    if (!match) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password" });
    }

    // token
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_KEY as string,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "successfully loged in",
      accessToken,
      user,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "error in login" });
  }
};

// -----------------------------------------------------------------------------
