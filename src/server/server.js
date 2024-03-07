const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/api/routes/index");
const { connectDB } = require("./src/database/index");
const morgan = require("morgan");
const errorHandlerMiddleware = require("./src/api/middlewares/errorHandlerMiddleware.js");
const authorizeMiddleware = require("./src/api/middlewares/authorizeMiddleware.js");
const variables = require("./config/variables.js");
const pino = require("pino");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const key = require("./src/config/config.js");

let server = null;
// Connect to MongoDB using a connection pool
connectDB()
  .then(() => {
    // Start server only after successful connection
    startServer();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

function startServer() {
  // Middleware for logging
  app.use(morgan("dev"));

  // Middleware for parsing JSON
  app.use(express.json());

  //cross origin requests handling
  app.use(
    cors({
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      origin: true,
    })
  );

  //allow requests from all servers
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  // Create a writable stream to the log file
  const logFile = fs.createWriteStream("./logs/logfile.log", { flags: "a" });

  // Create a pino logger with the writable stream as a destination
  const logger = pino({ level: "info" }, logFile);

  // Middleware for logging incoming requests
  app.use((req, res, next) => {
    // Log the incoming request
    logger.info({ req: req }, "Incoming request");
    next();
  });

  // Routes
  app.use("/", routes);
  
  // Error handling middleware
  app.use(errorHandlerMiddleware);

  // Middleware for logging responses
  app.use((req, res, next) => {
    const originalEnd = res.end;

    res.end = function (chunk, encoding) {
      res.end = originalEnd;
      res.end(chunk, encoding);

      // Log the response
      logger.info({ res: res }, "Response sent");
    };

    next();
  });
  app.use(cookieParser()); // Enable cookie parsing

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Additional error handling logic
  });
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error.message);
    // Additional error handling logic
    process.exit(1); // Exit the process to prevent it from running indefinitely
  });
  // Start server
  try {
    server = app.listen(variables.port, () =>
      console.log("server started on port", variables.port, variables.env)
    );
  } catch (err) {
    console.error("Error starting server:", err.message);
    process.exit(1);
  }
}

module.exports = {
  server,
};
