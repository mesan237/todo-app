import express from "express";
const router = express.Router();

import {
  registerUser,
  getUsers,
  getUserById,
  getUserProfile,
  loginUser,
  updateProfile,
  logoutUser,
} from "../controllers/users.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

router.route("/").get(getUsers);
router.route("/:id").get(getUserById, protect);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser, protect);
router
  .route("/profile")
  .get(getUserProfile, protect)
  .put(updateProfile, protect);

export default router;
