import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    // Validate product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    // Find user's cart or create new one
    let cart = await Cart.findOne({ user: req.user._id });
    let user = await User.findById(req.user._id);
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }
    // user.cart.push(productId);
    // await user.save();

    // Check if product already in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Update quantity if product exists
      existingItem.quantity += quantity;
    } else {
      // Add new item if product doesn't exist
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    // Populate product details
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [] },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const cartItem = cart.items.id(itemId);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Validate stock availability
    const product = await Product.findById(cartItem.product);
    if (product.countInStock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    cartItem.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart item",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
