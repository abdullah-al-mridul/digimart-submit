import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total price virtual
cartSchema.virtual("totalPrice").get(function () {
  return this.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

// Ensure virtuals are included in JSON output
cartSchema.set("toJSON", { virtuals: true });
cartSchema.set("toObject", { virtuals: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
