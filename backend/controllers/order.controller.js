import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const createOrder = async (req, res) => {
  try {
    // Validate required fields
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Shipping address and payment method are required",
      });
    }

    // Validate shipping address fields
    const requiredAddressFields = [
      "street",
      "city",
      "state",
      "postalCode",
      "country",
    ];

    for (const field of requiredAddressFields) {
      if (!shippingAddress[field]) {
        return res.status(400).json({
          success: false,
          message: `Shipping address ${field} is required`,
        });
      }
    }

    // Validate payment method
    const validPaymentMethods = ["cash_on_delivery", "bkash"];
    if (!validPaymentMethods.includes(paymentMethod.type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Validate stock availability and calculate totals
    let subtotal = 0;
    for (const item of cart.items) {
      const product = item.product;
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock available for ${product.name}`,
        });
      }
      subtotal += product.price * item.quantity;
    }

    // Calculate other amounts
    const shippingCost = 0; // Can be modified based on business logic
    const tax = 0; // Can be modified based on business logic
    const total = subtotal + shippingCost + tax;

    // Create order items array
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Create new order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: total, // For backwards compatibility
      subtotal,
      shippingCost,
      tax,
      total,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      phone: req.body.phone,
    });

    // Update product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { countInStock: -item.quantity },
      });
    }

    // Clear user's cart
    await Cart.findByIdAndDelete(cart._id);

    await order.populate("items.product");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    // Validate status
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "returned",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update order status",
      });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();
    await order.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Can only cancel pending orders",
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: item.quantity },
      });
    }

    order.status = "cancelled";
    await order.save();
    await order.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling order",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
