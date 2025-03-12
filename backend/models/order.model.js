import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  variant: {
    color: String,
    size: String,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: { type: String, required: true },
      details: { type: mongoose.Schema.Types.Mixed },
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },
    status: {
      // Changed from orderStatus to status to match controller
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },
    totalAmount: {
      // Added to match controller
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    trackingNumber: String,
    estimatedDelivery: Date,
    notes: String,
    statusHistory: [
      {
        status: String,
        date: { type: Date, default: Date.now },
        note: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Calculate total before saving
orderSchema.pre("save", function (next) {
  this.total = this.subtotal + this.shippingCost + this.tax;
  next();
});

// Add status to history when status changes
orderSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    // Changed from orderStatus to status
    this.statusHistory.push({
      status: this.status,
      date: new Date(),
    });
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
