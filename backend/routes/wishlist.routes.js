import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js";

const wishlistRouter = express.Router();

// Get wishlist
wishlistRouter.get("/", isAuthenticated, getWishlist);

// Add item to wishlist
wishlistRouter.post("/:productId", isAuthenticated, addToWishlist);

// Remove item from wishlist
wishlistRouter.delete("/:productId", isAuthenticated, removeFromWishlist);

export default wishlistRouter;
