import express from "express";
import {
  register,
  login,
  me,
  logout,
  sendVerificationEmail,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

// Public routes
authRouter.post("/register", register);
authRouter.post("/login", login);

// Protected routes
authRouter.get("/me", isAuthenticated, me);
authRouter.post(
  "/send-verification-email",
  isAuthenticated,
  sendVerificationEmail
);
authRouter.post("/verify-email", isAuthenticated, verifyEmail);
authRouter.post("/logout", isAuthenticated, logout); // Protected with verifyToken middleware

export default authRouter;
