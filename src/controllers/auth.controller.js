import User from "../models/use.model.js";
import jwt from "jsonwebtoken";
import Cloudinary from "../utils/cloudinary.js";

// Register a new user
export const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload new avatar
export const uploadAvatar = async (req, res) => {
  const { userId } = req.user; // Authenticated user

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload avatar to Cloudinary
    const result = await Cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      public_id: `user_${userId}`,
    });

    // Update user avatar in database
    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({ message: "Avatar uploaded successfully", avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update avatar
export const updateAvatar = async (req, res) => {
  const { userId } = req.user; // Authenticated user

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // If the user already has an avatar, delete it from Cloudinary
    if (user.avatar) {
      const publicId = user.avatar.split("/").pop().split(".")[0]; // Extract public ID
      await Cloudinary.uploader.destroy(`avatars/${publicId}`);
    }

    // Upload new avatar to Cloudinary
    const result = await Cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      public_id: `user_${userId}`,
      overwrite: true,
    });

    // Update user avatar in database
    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({ message: "Avatar updated successfully", avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove avatar
export const removeAvatar = async (req, res) => {
  const { userId } = req.user; // Authenticated user

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If no avatar exists, respond accordingly
    if (!user.avatar) {
      return res.status(400).json({ message: "No avatar to remove" });
    }

    // Delete the avatar from Cloudinary
    const publicId = user.avatar.split("/").pop().split(".")[0]; // Extract public ID
    await Cloudinary.uploader.destroy(`avatars/${publicId}`);

    // Remove avatar from the database
    user.avatar = null;
    await user.save();

    res.status(200).json({ message: "Avatar removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar, // Include avatar in response
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
};
