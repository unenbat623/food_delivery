import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  name: {
    type: String,
    required: [true, "Хоолны нэрийг заавал оруулна уу"],
    unique: true,
    maxlength: [100, "Хоолны нэр 100 тэмдэгтээс хэтрэхгүй байна"],
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  isSale: {
    type: Boolean,
    default: false,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Хоолны тайлбарыг заавал оруулна уу"],
  },
  ingredients: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "no-food-photo",
  },
  category: {
    type: Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  portion: {
    type: String,
    default: "",
  },
  prepTime: {
    type: String,
    default: "15-20 мин",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Model = model("Food", foodSchema);
export default Model;
