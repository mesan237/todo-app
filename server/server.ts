import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import connectdb from "./config/database.js";

import { notFound, errorHandler } from "./middleware/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import todosRoutes from "./routes/todo.routes.js";

connectdb();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: "POST,GET,PUT,OPTIONS,DELETE",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/todos", todosRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
