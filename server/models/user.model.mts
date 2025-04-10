import { Model, Schema, Types, model } from "mongoose";
import { compare, genSalt, hashSync } from "bcrypt-ts";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

interface IUserMethods {
  matchPassword(enteredPassword: string): boolean | Promise<boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

// compare the current password with hashed password
userSchema.method("matchPassword", async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password);
});

const User = model<IUser, UserModel>("User", userSchema);
// hash the password before saving
userSchema.pre("save", async function (next) {
  console.log(this.password);
  if (!this.isModified("password")) {
    next();
  }

  const salt = await genSalt(10);
  this.password = await hashSync(this.password, salt);
});

export default User;
