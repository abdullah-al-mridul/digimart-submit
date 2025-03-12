import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import adminRouter from "./routes/admin.routes.js";
dotenv.config();

const server = express();

server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/products", productRouter);
server.use("/api/v1/categories", categoryRouter);
server.use("/api/v1/cart", cartRouter);
server.use("/api/v1/orders", orderRouter);
server.use("/api/v1/wishlist", wishlistRouter);
server.use("/api/v1/payment", paymentRouter);
server.use("/api/v1/admin", adminRouter);
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log("FRONTEND_URL", process.env.FRONTEND_URL);
});
