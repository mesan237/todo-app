import { Request, Response } from "express";
import User from "../models/user.model.mjs";
import generateToken from "../utils/generateToken.js";

const loginUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  // console.log(user);
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
};

const registerUser = async (req: Request, res: Response) => {
  const { password, email, name } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("User already exists");
  } else {
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();

    if (user) {
      generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid user data");
    }
  }
};

// @desc fetch a single product
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.user);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("User not found ! ");
  }
};
// @desc fetch a single product
// @route GET /api/products/:productId
// @access Public
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};
// @desc log
// @route GET /api/registe/login
// @access Public
const updateUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save({});
    if (updatedUser) {
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(401);
      throw new Error("user update failed ! ");
    }
  } else {
    res.status(401);
    throw new Error("User not found ! ");
  }
};
// @desc log
// @route GET /api/registe/login
// @access Public
const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id ? req.params.id : req.params.user;

  const user = await User.findById(id);
  console.log(user);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("User not found ! ");
  }
};
// @desc logout&& clear cookie
// @route GET /api/users/logout
// @access Private
const logoutUser = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Successfully logged out",
  });
};
// @desc fetch a single product
// @route GET /api/products/:productId
// @access Public
const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const deleteUser = await user.deleteOne({ _id: user._id });
    if (deleteUser) {
      res.status(200).json({
        message: "User deleted successfully",
      });
    }
  } else {
    res.status(401);
    throw new Error("User not found ! ");
  }
};

const updateProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save({});

    if (updateUser) {
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
      });
    } else {
      res.status(401);
      throw new Error("user edit failed ! ");
    }
  } else {
    res.status(401);
    throw new Error("User not found ! ");
  }
};

export {
  loginUser,
  registerUser,
  getUserProfile,
  getUsers,
  updateUser,
  getUserById,
  logoutUser,
  deleteUser,
  updateProfile,
};
