import { Types, model, Schema } from "mongoose";

interface ICategory {
  _id: Types.ObjectId;
  name: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", categorySchema);

export default Category;
