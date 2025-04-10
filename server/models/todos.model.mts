import { model, Schema, Types } from "mongoose";

interface ITodo {
  user: Types.ObjectId;
  category: Types.ObjectId;
  title: string;
  description: string;
  status: "not started" | "pending" | "completed";
  priority: "low" | "medium" | "high";
  due_date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["not started", "pending", "completed"],
      default: "not started",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    due_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
