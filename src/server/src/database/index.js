const mongoose = require('mongoose');
const { mongoURI } = require('../config/config');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

// Export the connected Mongoose instance
module.exports = {
  connectDB
};