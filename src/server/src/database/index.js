/**
 * @file database/index.js
 * @description Handles database connection to MongoDB using Mongoose.
 * @author @Tarak1246 @satyaaneesh98
 * @date March 13, 2024
 */
const mongoose = require("mongoose");
const { mongoURI } = require("../../config/variables");
/**
 * @description Connects to the MongoDB database.
 * @returns {Promise<void>} Resolves upon successful connection.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

// Export the connected Mongoose instance
module.exports = {
  connectDB,
};
