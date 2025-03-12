import SSLCommerzPayment from "sslcommerz-lts";
import Order from "../models/order.model.js";
import dotenv from "dotenv";

dotenv.config();

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; // Set to true for production

export const paymentController = async (req, res) => {
  try {
    const order = await Order.findById(req.body.orderId).populate(
      "items.product"
    );
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order already paid",
      });
    }
    const data = {
      total_amount: order.totalAmount,
      currency: "BDT",
      tran_id: order._id.toString(), // unique transaction ID
      success_url: `${process.env.API_BASE_URL}/api/v1/payment/success?orderId=${order._id}`,
      fail_url: `${process.env.API_BASE_URL}/api/v1/payment/fail?orderId=${order._id}`,
      cancel_url: `${process.env.API_BASE_URL}/api/v1/payment/cancel?orderId=${order._id}`,
      ipn_url: `${process.env.API_BASE_URL}/api/v1/payment/ipn?orderId=${order._id}`,
      shipping_method: "NO",
      //   multi_card_name: "brac_visa,dbbl_visa,ebl_visa,master",
      product_name: order.items.map((item) => item.product.name).join(", "),
      product_category: "Mixed",
      product_profile: "general",
      cus_name: req.user.name,
      cus_email: req.user.email,
      cus_add1: order.shippingAddress.address,
      cus_city: order.shippingAddress.city,
      cus_postcode: order.shippingAddress.postalCode,
      cus_country: order.shippingAddress.country,
      cus_phone: order.shippingAddress.phone,
      ship_name: order.shippingAddress.name,
      ship_add1: order.shippingAddress.address,
      ship_city: order.shippingAddress.city,
      ship_postcode: order.shippingAddress.postalCode,
      ship_country: order.shippingAddress.country,
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    if (apiResponse?.GatewayPageURL) {
      res.json({
        success: true,
        redirectUrl: apiResponse.GatewayPageURL,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment session creation failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error initiating payment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const { val_id } = req.body;
    const { orderId } = req.query;
    console.log("success", val_id);
    if (!val_id) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.validate({ val_id }).then(async (data) => {
      if (data.status === "VALID") {
        order.paymentStatus = "paid";
        await order.save();
      } else {
        order.paymentStatus = "failed";
        await order.save();
      }
    });
    res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
    // res.status(200).json({
    //   success: true,
    //   message: "Payment successful",
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing payment success",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const paymentFail = async (req, res) => {
  //   try {
  //     console.log(req.body);
  //     const { tran_id } = req.body;
  //     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  //     sslcz.transactionQueryByTransactionId({ tran_id }).then((data) => {
  //       console.log(data);
  //     });
  //   } catch (error) {
  //     console.error("Payment Failure Error:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Error processing payment failure!",
  //       error: process.env.NODE_ENV === "development" ? error.message : undefined,
  //     });
  //   }
  res.redirect(`${process.env.FRONTEND_URL}/payment/fail`);
};
export const paymentCancel = async (req, res) => {
  //   try {
  //     const { orderId } = req.query;
  //     const { status } = req.body;
  //     const order = await Order.findById(orderId);
  //     res.status(200).json({
  //       success: true,
  //       message: "Payment cancelled",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "Error processing payment cancellation",
  //       error: process.env.NODE_ENV === "development" ? error.message : undefined,
  //     });
  //   }
};

export const paymentIpn = async (req, res) => {
  console.log(req.body);
  //   res.status(200).json({
  //     success: true,
  //     message: "Payment IPN received",
  //   });
};
