import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import userModel from "../Model/userModel";

declare module "express" {
  interface Request {
    user?: JwtPayload; // Replace JwtPayload with the appropriate type for your user data
  }
}

export const requireSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).send({ error: "Authorization header missing" });
    }
    const accessToken = authorizationHeader.split(" ")[1]; // Extract token from "Bearer token"
    const decoded = jwt.verify(accessToken, process.env.JWT_KEY as Secret) as JwtPayload;
    req.user = decoded
    // console.log(req.user);
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Invalid token" });
  }
};


//check isadmin or not
export const isadmin = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user?.role !== "admin") {
       res
        .status(401)
        .send({ success:false, message: "Unuthorized Access" });
    } else {
      next()  
    }
  } catch (error) {
    res.status(401).send({success:false, message: "error in Isadmin middleware", error });
  }
};