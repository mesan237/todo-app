import { Request } from "express";
import { UserDocument } from "../models/user.model.mjs";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
