import mongoose from "mongoose";
import Product from "../models/product.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utilities/cloudinary.js";

// @desc    Get all products
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      category,
      search,
      minPrice,
      maxPrice,
      rating,
    } = req.query;

    // Build query
    const query = {};

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by rating
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Execute query
    const products = await Product.find(query)
      .populate("category")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    // Get total count
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Create new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
      discount,
      isFeatured,
      rating,
    } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, price, and category",
      });
    }

    // Validate price
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    // Validate category ID format
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // Handle image uploads
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file);
        images.push(result.url);
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock: stock || 0,
      images,
      discount: discount || 0,
      isFeatured: isFeatured || false,
      rating: rating || 0,
    });
    await product.populate("category");
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    // Delete uploaded images if product creation fails
    if (req.files) {
      for (const file of req.files) {
        const publicId = file.filename.split(".")[0];
        await deleteFromCloudinary(publicId);
      }
    }

    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      // Delete old images
      for (const imageUrl of product.images) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await deleteFromCloudinary(publicId);
      }

      // Upload new images
      const images = [];
      for (const file of req.files) {
        const result = await uploadToCloudinary(file);
        images.push(result.url);
      }
      req.body.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("category");

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete product images
    for (const imageUrl of product.images) {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
