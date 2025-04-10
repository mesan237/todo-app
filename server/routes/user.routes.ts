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

router.route("/").get(getUsers);
router.route("/:id").get(getUserById);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(getUserProfile).put(updateProfile);

export default router;
