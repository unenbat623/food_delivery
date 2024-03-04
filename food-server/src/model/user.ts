import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Нэрээ заавал оруулна уу"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "И-мэйл хаяг заавал оруулна уу"],
    },
    password: {
      type: String,
      required: [true, "Нууц үг заавал оруулна уу"],
      minlenght: 6,
      select: false,
    },
    avatarUrl: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["Admin", "User", "Moderator"],
      default: "User",
    },
    otp: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    orders: [
      {
        orderNo: String,
        payment: {
          paymentAmount: Number,
          status: {
            type: String,
            enum: ["paid", "unpaid"],
            default: "unpaid",
          },
          paidDate: Date,
          createdAt: Date,
        },
        address: {
          khoroo: { type: String },
          duureg: { type: String },
          buildingNo: { type: Number },
          info: String,
        },
        delivery: {
          status: {
            type: String,
            enum: ["Pending", "Progressing", "Delivered"],
            default: "Pending",
          },
          deliveredAt: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function async(next) {
  console.log("Savingg User Model");
  if (!this.isModified("password")) {
    console.log("RE-PASS-SAVE-FINISH");
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  console.log("PASS-SAVE", this.password);
  console.log("PASS-HASH", hash);
  this.password = hash;
  console.log("PASS-SAVE-FINISH");
});

const User = model("User", userSchema);

export default User;
