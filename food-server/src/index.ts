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

const PORT = Number(process.env.PORT || 8000);
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
  res.json({
    status: "ok",
    message: "Pinecone Food Delivery API is running smoothly 🚀",
    docs: "/api/health",
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB:", MONGO_URI || "mongodb://127.0.0.1:27017/food-delivery");
    await connectDB(MONGO_URI || "mongodb://127.0.0.1:27017/food-delivery");
    app.listen(PORT, "0.0.0.0", () =>
      console.log(color.rainbow(`Сервер амжилттай аслаа: http://localhost:${PORT}`))
    );
  } catch (error) {
    console.error("Database холболтонд алдаа гарлаа:", error);
    app.listen(PORT, "0.0.0.0", () =>
      console.log(color.yellow(`Сервер DB-гүй аслаа: http://localhost:${PORT}`))
    );
  }
};

if (!process.env.VERCEL) {
  startServer();
}

export default app;
