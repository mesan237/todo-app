import dotenv from "dotenv";
dotenv.config();
import connectdb from "./config/database.js";
import User from "./models/user.model.mjs";
import Todo from "./models/todos.model.mjs";
import Category from "./models/categories.model.mjs";
import users from "./data/users.js";
import { categories } from "./data/categories.js";
import { todos } from "./data/todos.js";

connectdb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Todo.deleteMany();
    await Category.deleteMany();

    const insertedUsers = await User.insertMany(users);
    const user = insertedUsers[Math.floor(Math.random() * users.length)];

    const categoryDatas = categories.map((category) => {
      return { user: user._id, ...category };
    });
    const insertedCategories = await Category.insertMany(categoryDatas);

    // pick a random category
    const category =
      insertedCategories[Math.floor(Math.random() * categories.length)];

    const todoDatas = await Todo.insertMany(
      todos.map((todo) => {
        return { user: user, category: category._id, ...todo };
      })
    );

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log("Import failed ", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Todo.deleteMany();

    console.log("Data detroyed");
    process.exit();
  } catch (error) {
    console.log("destroy failed ", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
