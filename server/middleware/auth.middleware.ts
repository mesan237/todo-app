import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserDocument } from "../models/user.model.mjs";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

// protect routes

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // read the jwt from the cooie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as CustomJwtPayload;

      const user: UserDocument | null = await User.findById(
        decoded.userId
      ).select("-password");

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }
      req.user = user;
      console.log("req_user", req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token not found");
    }
  } else {
    res.status(401);
    throw new Error("Please login to access this route");
  }
};

export { protect };
