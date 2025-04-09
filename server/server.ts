import express from "express";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
dotenv.config();
import connectdb from "./config/database";
import { notFound, errorHandler } from "./middleware/error.middleware";

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

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
