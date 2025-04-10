import express from "express";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
dotenv.config();
import connectdb from "./config/database.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import categoriesRoutes from "./routes/category.routes.js";

import cors from "cors";

connectdb();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "http://localhost:4200", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
