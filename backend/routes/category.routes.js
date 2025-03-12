import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const categoryRouter = express.Router();

// Public routes
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);

// Protected admin routes
categoryRouter.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createCategory
);
categoryRouter.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateCategory
);
categoryRouter.delete("/:id", isAuthenticated, isAdmin, deleteCategory);

export default categoryRouter;
