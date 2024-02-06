import { Schema, SchemaType, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    require: [true, "category neriig zaaval oruul"],
    unique: true,
    maxlenght: [50, "categoriin nernii urt 50temtegtees hetrehgui"],
  },
  description: {
    type: String,
    required: [true, "categorin taillbariig zaaval oruul."],
  },
  image: {
    type: String,
    default: "no-category-photo",
  },
  category: {
    type: Schema.ObjectId,
    ref: "category",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = model("Category", categorySchema);
export default Category;
