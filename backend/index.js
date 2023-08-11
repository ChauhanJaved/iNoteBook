// Importing required dependencies from "express" library
import express from "express";
import { json } from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Importing custom modules (files)
import connectToMongo from "./db.js";
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

// Creating an Express application instance
const app = express();



// Setting the port number for the server to listen on
const port = 5000;

// Parsing incoming JSON data in the request body
app.use(json());
app.use(cors());

// Available Routes: Configuring routes for the application
// When a request comes to '/api/auth', the 'authRoutes' will be used to handle it.
app.use('/api/auth', authRoutes);

// When a request comes to '/api/notes', the 'notesRoutes' will be used to handle it.
app.use('/api/notes', notesRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`);
});

// Connect to MongoDB using the function defined in './db.js'
connectToMongo();
