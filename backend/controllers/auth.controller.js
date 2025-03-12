import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendCodeToEmail from "../utilities/emailverification.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }
      if (existingUser.username === username) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password, // Password will be hashed by the pre-save middleware
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(201).json({
      message: "Registration successful",
      user: newUser,
      token,
    });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Handle other errors
    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Get user from database with password
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Update last login time and session history
    user.lastLogin = new Date();
    user.sessionHistory.push({
      action: "login",
      timestamp: new Date(),
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      device: req.headers["sec-ch-ua-platform"] || "unknown",
    });

    await user.save();

    // Get user data without sensitive information
    const userData = user.getPublicProfile();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      success: true,
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const me = async (req, res) => {
  try {
    console.log("middle ware passed");
    // Verify token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId)
      .populate("cart.product")
      .populate("wishlist")
      .populate("orders");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if account is active
    if (user.accountStatus !== "active") {
      return res.status(403).json({
        message: `Your account is ${user.accountStatus}. Please contact support.`,
      });
    }

    // Get user data without sensitive information
    const userData = user.getPublicProfile();

    res.json({
      user: userData,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const user = req.user;

    // Update user's last login time
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
      $push: {
        // Keep track of logout history
        sessionHistory: {
          action: "logout",
          timestamp: new Date(),
          userAgent: req.headers["user-agent"],
          ip: req.ip,
        },
      },
    });

    // Clear cookies if they exist
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error during logout",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const sendVerificationEmail = async (req, res) => {
  const user = req.user;
  const email = user.email;
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const authUser = await User.findOne({ email });
  authUser.verificationCode = code;
  await authUser.save();
  await sendCodeToEmail(email, code);
  res.json({
    message: "Verification email sent",
  });
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  const user = req.user;
  if (user.verificationCode === code) {
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } else {
    res.status(400).json({
      message: "Invalid verification code",
    });
  }
};
