import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  getAdminDashboard,
  getAdminOrders,
  updateAdminOrderById,
  getAdminCustomers,
} from "../controllers/admin.controller.js";
const adminRouter = express.Router();

// Protect all admin routes with authentication and admin check
adminRouter.use(isAuthenticated, isAdmin);

// Dashboard route
adminRouter.get("/dashboard", getAdminDashboard);

// Orders routes
adminRouter.get("/orders", getAdminOrders);

adminRouter.put("/orders/:id", updateAdminOrderById);

adminRouter.get("/customers", getAdminCustomers);

export default adminRouter;
