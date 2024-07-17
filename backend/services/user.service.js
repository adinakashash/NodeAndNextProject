const bcrypt = require('bcryptjs');
const User = require("../models/user.schema");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (userData) => {
  const { name, email, phone, password } = userData;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      phone,
      password: hashedPassword
    });
    const result = await newUser.save();
    return result;
  } catch (error) {
    console.error("Failed to add user:", error.message);
    throw new Error(error.message || "Failed to add user");
  }
};

exports.login = async (userData) => {
  const { email, password } = userData;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Auth failed');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Auth failed');
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h'
      }
    );
    return {
      message: 'Auth successful',
      token
    };
  } catch (error) {
    console.error('Auth failed:', error.message);
    throw new Error(error.message || 'Auth failed');
  }
};

exports.deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userId: userId });
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error) {
    console.error("Failed to delete user:", error.message);
    throw new Error(error.message || "Failed to delete user");
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error("Failed to get users:", error.message);
    throw new Error(error.message || "Failed to get users");
  }
};

exports.updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user:", error.message);
    throw new Error(error.message || "Failed to update user");
  }
};

exports.getUserByName = async (name) => {
  try {
    const user = await User.findOne({ name });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Failed to get user:", error.message);
    throw new Error(error.message || "Failed to get user");
  }
};
