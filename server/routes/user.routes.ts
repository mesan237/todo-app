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
router.route("/:id").get(protect, getUserById);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(protect, logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateProfile);

export default router;
