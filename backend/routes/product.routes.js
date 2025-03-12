import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

// Public routes
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

// Protected admin routes
productRouter.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.array("images", 5),
  createProduct
);
productRouter.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images", 5),
  updateProduct
);
productRouter.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

export default productRouter;
