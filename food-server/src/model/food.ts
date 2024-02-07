import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  name: {
    type: String,
    require: [true, "HOOLNII NERIIG zaaval oruul"],
    unique: true,
    maxlegth: [50, "hoolnii nernii urt 50 temdegtees hetrehgui baina"],
  },
  price: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  isSale: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: [true, "hoolnii tailbariig zaaval oruulanu"],
  },
  image: {
    type: String,
    default: "no-food-photo",
  },
  category: {
    type: Schema.ObjectId,
    ref: "Category",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Model = model("Food", foodSchema);
export default Model;
