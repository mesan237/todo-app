import { model, Schema } from "mongoose";

interface ITask {
  title: string;
  status: "not started" | "pending" | "completed";
  priority: "low" | "medium" | "high";
  due_date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
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

const Task = model<ITask>("Task", taskSchema);

export default Task;
