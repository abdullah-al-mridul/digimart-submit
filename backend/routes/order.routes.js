import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

// Create new order
orderRouter.post("/", isAuthenticated, createOrder);

// Get all orders for authenticated user
orderRouter.get("/", isAuthenticated, getOrders);

// Get specific order by ID
orderRouter.get("/:orderId", isAuthenticated, getOrderById);

// Update order status (admin only)
orderRouter.put(
  "/:orderId/status",
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

// Cancel order
orderRouter.put("/:orderId/cancel", isAuthenticated, cancelOrder);

export default orderRouter;
