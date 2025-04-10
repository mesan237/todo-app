import express from "express";
import {
  addCategories,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.controllers.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/").post(protect, addCategories).get(protect, getCategories);

router.route("/:categoryId").get(getCategoryById, protect);
router
  .route("/:categoryId")
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

export default router;
