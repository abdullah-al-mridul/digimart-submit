import Order from "../models/order.model.js";
import User from "../models/user.model.js";

// Get admin dashboard statistics
export const getAdminDashboard = async (req, res) => {
  try {
    // Get total orders count
    const totalOrders = await Order.countDocuments();

    // Get orders grouped by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get total customers count
    const totalCustomers = await User.countDocuments({ role: "user" });

    // Get total revenue
    const revenue = await Order.aggregate([
      {
        $match: { paymentStatus: "paid" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Get orders by payment status
    const ordersByPaymentStatus = await Order.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        ordersByStatus,
        totalCustomers,
        totalRevenue: revenue[0]?.total || 0,
        ordersByPaymentStatus,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get all orders for admin
export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update order status by ID
export const updateAdminOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (
      !["pending", "processing", "shipped", "delivered", "cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get all customers for admin
export const getAdminCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching customers",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
