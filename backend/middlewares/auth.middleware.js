import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

// Verify JWT token and add user to request
export const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId)
      .select("-password")
      .populate({
        path: "cart.product",
        model: "Product",
      })
      .populate({
        path: "wishlist",
        model: "Product",
      })
      .populate("orders");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if account is active
    if (user.accountStatus !== "active") {
      return res.status(403).json({
        success: false,
        message: `Your account is ${user.accountStatus}. Please contact support.`,
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Check if user is admin
export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin rights required",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Authorization failed",
      error: error.message,
    });
  }
};
