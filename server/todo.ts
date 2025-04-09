import * as mongodb from "mongodb";

export interface Todo {
  title: string;
  status: "not started" | "pending" | "completed";
  completedAt?: Date;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  id?: mongodb.ObjectId;
}
