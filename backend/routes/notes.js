// Importing necessary modules.
import express from "express";
import mongoose from "mongoose";
// Creating a new router instance.
const router = express.Router();
// Importing JWT decoding middleware.
import decoding_jwt from "../middleware/decoding_jwt.js";
// Importing the Notes schema model.
import NotesSchema from "../models/Notes.js";
// Importing validation tools from express-validator.
import { body, validationResult } from "express-validator";

// Creating a GET route to fetch all notes of a user.
router.get("/fetchallnotes", decoding_jwt, async (req, res) => {
  try {
    // Creating a mongoose model using the Notes schema.
    const NotesModel = mongoose.model("notes", NotesSchema);
    // Querying the notes of the user from the database.
    const notes = await NotesModel.find({ user: req.data.user.id });
    // Returning the notes.
    res.json(notes);
  } catch (error) {
    // Handling any errors and returning a 500 status code.
    console.error("Error saving notes:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Creating a POST route to add a new note.
router.post(
  "/addnote",
  decoding_jwt,
  [
    // Validating that the note's title is at least 3 characters long.
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    // Validating that the note's description is at least 6 characters long.
    body("description")
      .isLength({ min: 6 })
      .withMessage("Description must be at least 6 characters long"),
  ],
  async (req, res) => {
    try {
      // Checking if the request validation resulted in any errors.
      const result = validationResult(req);
      if (!result.isEmpty()) {
        // If there are validation errors, return them with a 400 status code.
        return res.status(400).json({ errors: result.array() });
      }
      // Creating a mongoose model using the Notes schema.
      const NotesModel = mongoose.model("notes", NotesSchema);
      // Extracting title, description, and tag from the request body.
      const { title, description, tag } = req.body;
      // Creating a new note instance with the user's id and the note's details.
      const newNote = new NotesModel({
        user: req.data.user.id,
        title,
        description,
        tag,
      });
      // Saving the new note to the database and returning it.
      newNote
        .save()
        .then((savedNotes) => {
          console.log("Notes saved:", savedNotes);
          return res.json(savedNotes);
        })
        .catch((error) => {
          // Handling any errors and returning a 500 status code.
          console.error("Error saving user:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        });
    } catch (error) {
      // Handling any errors and returning a 500 status code.
      console.error("Error saving notes:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Define the route for updating a note
router.put("/updatenote/:id", decoding_jwt, async (req, res) => {
  try {
    // Destructure title, description, and tag from request body
    const {title, description, tag} = req.body;

    // Define a new note object
    const newNote = {};

    // Assign values to the newNote object if they exist
    if (title) {newNote.title = title };
    if (description) {newNote.description = description};
    if (tag) {newNote.tag = tag};

    // Create the Notes model using the notes schema
    const NotesModel = mongoose.model("notes", NotesSchema);

    // Find note by id 
    let note = await NotesModel.findById(req.params.id);

    // If the note is not found, return a 404 error
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user is authorized to update the note
    if (note.user.toString() != req.data.user.id){
      return res.status(401).send("Not Allowed");
    }

    // Update the note and return the updated note
    note = await NotesModel.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});

    // Send the updated note as a response
    res.json({note});
  } catch (error) {
    // Log the error and return a 500 status code
    console.error("Error saving notes:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the route for deleting a note
router.delete("/deletenote/:id", decoding_jwt, async (req, res) => {
  try {
    // Get the NotesModel based on the NotesSchema
    const NotesModel = mongoose.model("notes", NotesSchema);

    // Find the note with the provided ID
    let note = await NotesModel.findById(req.params.id);

    // If the note doesn't exist, return a 404 Not Found response
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user attempting to delete the note is the same user who created it
    if (note.user.toString() != req.data.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the note from the database
    note = await NotesModel.findByIdAndDelete(req.params.id);

    // Return a success response with the deleted note
    res.json({ "Success": "Note has been deleted", "note": note });
  } catch (error) {
    // If an error occurs during the process, log the error and return a 500 Internal Server Error response
    console.error("Error saving notes:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exporting the router to be used in other parts of the application.
export default router;
