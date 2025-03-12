import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Street address is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Don't include password by default in queries
    },
    avatar: {
      type: String,
      default: "/avatar.png",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio cannot exceed 250 characters"],
      default: "",
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    addresses: [addressSchema],
    cart: [
      {
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
        selectedVariant: {
          color: String,
          size: String,
        },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    paymentMethods: [
      {
        type: {
          type: String,
          enum: ["card", "bank"],
          required: true,
        },
        provider: String,
        lastFourDigits: String,
        expiryDate: Date,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    notifications: {
      email: {
        marketing: { type: Boolean, default: true },
        orderUpdates: { type: Boolean, default: true },
      },
      push: {
        marketing: { type: Boolean, default: true },
        orderUpdates: { type: Boolean, default: true },
      },
    },
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deactivated"],
      default: "active",
    },
    sessionHistory: [
      {
        action: {
          type: String,
          enum: ["login", "logout", "token_refresh"],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        userAgent: String,
        ip: String,
        device: String,
        location: String,
      },
    ],
    verificationCode: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to get user's public profile
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

// Method to add item to cart
userSchema.methods.addToCart = async function (
  productId,
  quantity = 1,
  variant = {}
) {
  const existingItem = this.cart.find(
    (item) =>
      item.product.toString() === productId &&
      item.selectedVariant.color === variant.color &&
      item.selectedVariant.size === variant.size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.cart.push({
      product: productId,
      quantity,
      selectedVariant: variant,
    });
  }

  return this.save();
};

// Method to add/remove from wishlist
userSchema.methods.toggleWishlist = async function (productId) {
  const index = this.wishlist.indexOf(productId);
  if (index > -1) {
    this.wishlist.splice(index, 1);
  } else {
    this.wishlist.push(productId);
  }
  return this.save();
};

// Method to add address
userSchema.methods.addAddress = async function (addressData) {
  if (addressData.isDefault) {
    this.addresses.forEach((addr) => (addr.isDefault = false));
  }
  this.addresses.push(addressData);
  return this.save();
};

// Static method to find user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model("User", userSchema);

export default User;
