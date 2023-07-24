import express from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
const router = express.Router();
import UserSchema from "../models/User.js";

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post(
  "/",
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
    console.log(req.body);

    // Create a Mongoose model called 'UserModel' based on 'UserSchema'
    const UserModel = mongoose.model("users", UserSchema);

    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }
    // Create a new user instance using the UserModel and request body
    const newUser = new UserModel(req.body);

    // Save the new user to the database
    newUser
      .save()
      .then((savedUser) => {
        console.log("User saved:", savedUser);
        // Return the request body as a JSON response
        return res.json(req.body);
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        // Return the request body as a JSON response
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
);

export default router;
