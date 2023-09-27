import { Request, Response } from "express";
import userModel from "../Model/userModel";
import { userInterface } from "../interface/Interface";
import { comparePassword, hashPassword } from "../Helpers/authHelper";
import jwt from "jsonwebtoken";
import { Cloud } from "../config/Cloudinary";

//Register user
export const signUpController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const avatar = req.file;

    if (!name || !email || !password) {
      res.status(400).send({ message: "all fields are required" });
    }

    //find exist user
    const existingUser = await userModel.findOne({ email });

    //if esists
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    let avatarUrl = ""; // Initialize avatarUrl variable

    if (avatar) {
      const imageStream = await Cloud.uploader.upload(avatar.path, {
        folder: "profile-folder",
        transformation: [{ width: 200, height: 200, crop: "fill" }],
      });
      avatarUrl = imageStream.secure_url;
    }

    //hash password
    const hashedPassword = await hashPassword(password);

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
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "error in login" });
  }
};

// -----------------------------------------------------------------------------

// getting all users
export const alluserController = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res
      .status(200)
      .send({ success: true, message: "all users getting successfull", users });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in getting all users" });
  }
};

//deleteUserController
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const users = await userModel.findByIdAndDelete(userId);
    res
      .status(200)
      .send({ success: true, message: `${users?.name} is deleted`, users });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in getting all users" });
  }
};

//updateUserController
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: `${updatedUser.name}  is updated`,
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in getting all users" });
  }
};