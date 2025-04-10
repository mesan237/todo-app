import { Request } from "express";
import { UserDocument } from "../models/user.model.mjs";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        name: string;
        email: string;
        password: string;
      };
    }
  }
}
