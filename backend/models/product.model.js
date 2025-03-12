import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // slug: {
    //   type: String,
    //   unique: true,
    //   lowercase: true,
    // },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: String,
    stock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug before saving
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
