import Todo from "../models/todos.model.mjs";
import { Request, Response } from "express";

const addTodos = async (req: Request, res: Response) => {
  try {
    const { title, category, desciprion, status, priority, due_date } =
      req.body;
    const user = req.user;

    const todo = await Todo.create({
      title,
      category,
      user: user?._id,
      desciprion,
      status,
      priority,
      due_date,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user?._id }).populate("category");
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getTodoById = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    const todo = await Todo.findById(req.params.todoId)
      .where("user", user?._id)
      .populate("category");
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const todo = await Todo.findById(req.params.todoId)
      .where("user", user?._id)
      .populate("category");
    if (todo) {
      todo.title = req.body.title || todo.title;
      todo.category = req.body.category || todo.category;
      todo.description = req.body.desciprion || todo.description;
      todo.status = req.body.status || todo.status;
      todo.priority = req.body.priority || todo.priority;
      todo.due_date = req.body.due_date || todo.due_date;

      const updatedTodo = await todo.save();
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const todo = await Todo.findById(req.params.todoId)
      .where("user", user?._id)
      .populate("category");
    if (todo) {
      await todo.deleteOne();
      res.status(200).json({ message: "Todo removed" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { updateTodo, deleteTodo, addTodos, getTodos, getTodoById };
