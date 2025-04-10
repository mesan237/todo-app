import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

// generate the token
const generateToken = (res: Response, userId: Types.ObjectId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  // console.log("user id", userId);
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
