import express from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
const router = express.Router();
import UserSchema from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import decoding_jwt from "../middleware/decoding_jwt.js"




// Create a User using: POST "/api/auth/createuser". Doesn't require Auth *****************Route 1
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
      return res.status(400).json({ success: false, error: result.array() });
    }

    // Log the request body (optional, for debugging)
    console.log(req.body);

    // Create a Mongoose model called 'UserModel' based on 'UserSchema'
    const UserModel = mongoose.model("users", UserSchema);

    // Check if the email is already taken
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Email is already taken" });
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
        console.log(process.env.JWT_SECRET);
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        return res.json({success: true, authtoken: authtoken});
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        // Return an error response as a JSON response
        return res.status(500).json({ success: false,  error: "Internal Server Error" });
      });
  }
);

// Endpoint for user login: POST "/api/auth/login" *****************Route 2
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
          .json({ success: false, error: "Please try to login with correct credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success: false, error: "Please try to login with correct password" });
      }

      // If login successful, create a JWT token and send it as a JSON response
      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);      
      return res.json({success: true, authtoken: authtoken});
    } catch (error) {
      console.error(error.message);
      // Return an error response as a JSON response
      res.status(500).send("Internal Server Error");
    }
  }
);

// This is a route handler for the POST "/api/auth/getuser" endpoint. Route handlers take in a request and send back a response.
router.post('/getuser', 
  // 'decoding_jwt' is a middleware function that was defined elsewhere. 
  // This middleware function decodes the JSON Web Token (JWT) provided in the request headers and attaches the payload of the JWT to 'req.data'.
  decoding_jwt,
  // This is an async function, which means it returns a Promise and can use the 'await' keyword to pause execution until a Promise is resolved.
  async(req, res) => {
    // Create a Mongoose model called 'UserModel' based on 'UserSchema'. 
    // This allows us to perform CRUD operations on the 'users' collection in MongoDB.
    const UserModel = mongoose.model("users", UserSchema);
    // 'findById' is a Mongoose method that finds a document in the 'users' collection by its ID.
    // Here we're passing the ID from the decoded JWT payload. 
    // The '.select("-password")' method tells Mongoose not to include the password property in the returned user object.
    const user = await UserModel.findById(req.data.user.id).select("-password");
    // If the user was not found (i.e., 'findById' returned null), send back an error response.
    if (!user) return res.status(400).json({error: "User not found"});
    // If the user was found, return the user object as a JSON response. The user's password will not be included because of '.select("-password")'.
    return res.json(user);
  }
);

// Export the router for use in other modules
export default router;

