import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  addTodos,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todos.controllers.js";

const router = Router();

router.route("/").post(protect, addTodos).get(protect, getTodos);
router.route("/:todoId").get(protect, getTodoById);
router.route("/:todoId").put(protect, updateTodo).delete(protect, deleteTodo);

export default router;
