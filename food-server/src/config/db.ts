import mongoose from "mongoose";
import color from "colors";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log(color.bgGreen("холбогдлоо MongoDB-д."));
  } catch (error) {
    console.log(color.bgRed("Database холболтонд алдаа гарлаа."));
  }
};
