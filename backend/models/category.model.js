import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: String,
    image: {
      type: String,
      default: "default-category.png",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug before saving
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
