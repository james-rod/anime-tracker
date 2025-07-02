import express from "express";
import User from "../Models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ADD USER TO SIGN UP
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10); // Generates a cryptographic "salt" — random data that will be combined with the password to make hashing more secure.
    const hashedPassword = await bcrypt.hash(password, salt); //Uses bcrypt to hash the user's plain-text password combined with the generated salt.
    const newUser = new User({ username, email, password: hashedPassword }); //Prepares the user data to be saved securely in the database.
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      //Generates a JSON Web Token containing the user’s ID, signed with your secret key. This token is valid for 30 days.
      expiresIn: "30d",
    });
    res.status(201).json({ _id: newUser._id, username, email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD USER TO SIGN IN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); // Looks in the database for a user with the provided email.
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password); //Validates that the user’s input matches the stored hashed password (proving their identity).
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" }); // Prevents users from logging in with incorrect credentials.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      //Creates a JSON Web Token with the user’s ID, signed with a secret key, set to expire in 30 days.
      expiresIn: "30d",
    });
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    }); //Sends back the user’s data (excluding the password) along with the token.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
