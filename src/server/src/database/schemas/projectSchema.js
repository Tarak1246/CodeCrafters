/**
* @author @Satyaaneesh98
*/

// Import mongoose library for creating database schemas
const mongoose = require("mongoose");

// Defining project schema using mongoose.Schema
const projectSchema = new mongoose.Schema({
  // Defining schema fields
  id: {
    type: String, // Data type is String
    required: true, // Field is required
    default: "", // Default value is empty string
    unique: true, // Field must be unique
  },
  name: {
    type: String, // Data type is String
    required: true, // Field is required
    unique: true, // Field must be unique
    default: "", // Default value is empty string
  },
  client: {
    type: String, // Data type is String
    required: true, // Field is required
  },
  startDate: {
    type: Date, // Data type is Date
    required: true, // Field is required
  },
  endDate: {
    type: Date, // Data type is Date
    required: true, // Field is required
  },
  deadline: {
    type: Date, // Data type is Date
    required: true, // Field is required
  },
  status: {
    type: String, // Data type is String
    required: true, // Field is required
    enum: ["In-Progress", "Completed", "InComplete"], // Field values must be one of these
    default: "In-Progress", // Default value is "In-Progress"
  },
  progress: {
    type: String, // Data type is String
    required: true, // Field is required
    enum: [ // Field values must be one of these
      "0% - Req & Design Phase",
      "25% - Development Phase",
      "50% - Testing Phase",
      "75% - Support Phase",
      "100% - Completed",
    ],
  },
});

// Set toJSON transform for formatting date fields in output.
// This is mainly used as seeing the date in default format in UI is casuing error. Hence converted it to toJSON for seeing the date as needed.
projectSchema.set("toJSON", {
  transform: function (doc, dateFormatChange) {
    // Format startDate, endDate, and deadline to locale date string
    dateFormatChange.startDate = dateFormatChange.startDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    dateFormatChange.endDate = dateFormatChange.endDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    dateFormatChange.deadline = dateFormatChange.deadline.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    return dateFormatChange; // Return transformed object
  },
});

// Create Project model from project schema
const Project = mongoose.model("Project", projectSchema);

// Export Project model
module.exports = Project;
