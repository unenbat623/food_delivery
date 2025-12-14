import express, { Application, Response, Request } from "express";
import color from "colors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import authRoute from "./router/authRoute";
import userRoute from "./router/userRoute";
import verifyRoute from "./router/verifyRoute";
import dashboardRouter from "./router/dashboardRoute";
import categoryRoute from "./router/categoryRoute";
import foodRoute from "./router/foodRoute";
import uploadRoute from "./router/uploadRoute";
import basketRoute from "./router/basketRoutes";
import orderRoute from "./router/orderRoute";

import errorHandler from "./middleware/errorHandler";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI as string;

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/foods", foodRoute);
app.use("/verify", verifyRoute);
app.use("/upload", uploadRoute);
app.use("/basket", basketRoute);
app.use("/order", orderRoute);
app.use("/dashboard", dashboardRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Food Delivery</h1>");
});

// ... existing imports ...

// ... existing app setup ...

app.use(errorHandler);

const startServer = async () => {
  try {
    console.log("MONGO_URI:", MONGO_URI);
    await connectDB(MONGO_URI || "mongodb://127.0.0.1:27017/food-delivery");
    app.listen(PORT, () => console.log(color.rainbow("Сервер аслаа. " + PORT)));
  } catch (error) {
    console.error("Failed to start server:", error);
    // process.exit(1); // Optional: exit if critical
  }
};

if (!process.env.VERCEL) {
  startServer();
}

export default app;
