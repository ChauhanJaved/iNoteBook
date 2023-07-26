import express from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
const router = express.Router();
import UserSchema from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'thisismysecretkey@@@';

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post(
  "/createuser",
  [
    // Validation middleware using express-validator
    // Check if the 'name' field is not empty
    body("name").notEmpty().withMessage("Name must not be empty"),

    // Check if the 'email' field is a valid email address
    body("email").isEmail().withMessage("Enter a valid email address"),

    // Check if the 'password' field is at least 6 characters long
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    // Check for validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // If there are validation errors, return them as a JSON response
      return res.status(400).json({ errors: result.array() });
    }

    // Log the request body (optional, for debugging)
    console.log(req.body);

    // Create a Mongoose model called 'UserModel' based on 'UserSchema'
    const UserModel = mongoose.model("users", UserSchema);

    // Check if the email is already taken
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Extract the data from req.body that you want to modify
    const { name, email, password } = req.body;

    // Generate a random salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance using the modified data
    const newUser = new UserModel({
      name, // Modified name
      email, // Modified email
      password: hashedPassword, // Modified and hashed password with salt
    });

    // Save the new user to the database
    newUser
      .save()
      .then((savedUser) => {
        console.log("User saved:", savedUser);
        // Return the saved user as a JSON response
        const data = { user: { id: newUser.id } };
        const authtoken = jwt.sign(data, JWT_SECRET);
        return res.json(authtoken);
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        // Return an error response as a JSON response
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
);

// Endpoint for user login: POST "/api/auth/login"
router.post(
  "/login",
  [
    // Validation middleware using express-validator
    // Check if the 'email' field is a valid email address
    body("email").isEmail().withMessage("Enter a valid email address"),

    // Check if the 'password' field exists (not empty)
    body("password").exists().withMessage("Password cannot be blank"),
  ],
  async (req, res) => {
    // Check for validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // If there are validation errors, return them as a JSON response
      return res.status(400).json({ errors: result.array() });
    }

    // Extract the data from req.body that you want to use for login
    const { email, password } = req.body;
    try {
      // Create a Mongoose model called 'UserModel' based on 'UserSchema'
      const UserModel = mongoose.model("users", UserSchema);
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct password" });
      }

      // If login successful, create a JWT token and send it as a JSON response
      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      return res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      // Return an error response as a JSON response
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
