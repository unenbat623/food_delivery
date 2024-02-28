import express, { Application } from "express";
import color from "colors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import authRoute from "./router/authRoute";
import userRoute from "./router/userRoute";
import verifyRoute from "./router/verifyRoute";
import categoryRoute from "./router/categoryRoute";
import foodRoute from "./router/foodRoute";
import uploadRoute from "./router/uploadRoute";
import basketRoute from "./router/basketRoutes";

import errorHandler from "./middleware/errorHandler";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI as string;

const app: Application = express();

connectDB(MONGO_URI);

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/foods", foodRoute);
app.use("/verify", verifyRoute);
app.use("/upload", uploadRoute);
app.use("/basket", basketRoute);

app.use(errorHandler);

app.listen(PORT, () => console.log(color.rainbow("Сервер аслаа. " + PORT)));
