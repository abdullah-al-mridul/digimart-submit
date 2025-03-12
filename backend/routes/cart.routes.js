import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", isAuthenticated, addToCart);

cartRouter.get("/", isAuthenticated, getCart);

cartRouter.put("/:itemId", isAuthenticated, updateCartItem);

cartRouter.delete("/:itemId", isAuthenticated, removeFromCart);

cartRouter.delete("/", isAuthenticated, clearCart);

export default cartRouter;
