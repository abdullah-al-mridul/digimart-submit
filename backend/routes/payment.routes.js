import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  paymentController,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIpn,
} from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

// Create payment intent
paymentRouter.post("/", isAuthenticated, paymentController);

paymentRouter.post("/success", paymentSuccess);
paymentRouter.post("/fail", paymentFail);
paymentRouter.post("/cancel", paymentCancel);
paymentRouter.post("/ipn", paymentIpn);
export default paymentRouter;
