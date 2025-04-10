import { Request, Response } from "express";
import Category from "../models/categories.model.mjs";
import { CustomRequest } from "../middleware/auth.middleware.js";

const addCategories = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const { name } = customReq.body;
    const user = customReq.user;

    const category = await Category.create({ name, user });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCategories = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const categories = await Category.find({ user: customReq.user._id });
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = req.body.name || category.name;
      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      // await category.remove();
      res.status(200).json({ message: "Category removed" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  addCategories,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
