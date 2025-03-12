import User from "../models/user.model.js";

// @desc    Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    user.wishlist.push(productId);
    await user.save();
    await user.populate("wishlist");

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product to wishlist",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;

    if (!user.wishlist.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: "Product not in wishlist",
      });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();
    await user.populate("wishlist");

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing product from wishlist",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
