import express from "express";
const router = express.Router();

router.route("/").post(addCategories).get(getCategories);

router.get("/mycategories", getCategories);
router.route("/:categoryId").get(getCategoryById);

export default router;
