// backend/server.js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/contactModel"); // Assuming you have a Contact model defined

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Server is running");
});

// POST route for adding a new contact
app.post("/contacts", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;

  try {
    // Validate that all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !company ||
      !jobTitle
    ) {
      return res.status(400).json({
        message: "All fields are required. Please provide all information.",
      });
    }

    // Create a new contact and save to the database
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });
    await newContact.save();

    // Log success to the console and respond with success message
    console.log("New contact added:", newContact);
    res.status(201).json({
      message: "Contact added successfully!",
      contact: newContact,
    });
  } catch (error) {
    console.log("Error saving contact:", error); // Log error to understand the issue
    res.status(500).json({
      message: "Error saving contact. Please try again.",
      error: error.message, // Send the error message for debugging
    });
  }
});

// GET route for retrieving all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log("Fetched contacts:", contacts); // Log fetched contacts to the console
    res.status(200).json(contacts);
  } catch (error) {
    console.log("Error fetching contacts:", error);
    res
      .status(500)
      .json({ message: "Error fetching contacts.", error: error.message });
  }
});

// Error handling middleware for unexpected errors
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/contacts", async (req, res) => {
  console.log("Request Body:", req.body); // Log incoming request data
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !company ||
    !jobTitle
  ) {
    return res.status(400).json({
      message: "All fields are required. Please provide all information.",
    });
  }

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });
    await newContact.save();
    console.log("New contact saved:", newContact); // Log saved contact
    res.status(201).json({ message: "Contact added successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error); // Log error for debugging
    res
      .status(500)
      .json({ message: "Error saving contact.", error: error.message });
  }
});
