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

router.route("/").post(addCategories, protect).get(getCategories, protect);

router.route("/:categoryId").get(getCategoryById, protect);
router
  .route("/:categoryId")
  .put(updateCategory, protect)
  .delete(deleteCategory, protect);

export default router;
