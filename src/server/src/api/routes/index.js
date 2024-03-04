const express = require('express');
const app = express();
const itemsRouter = require('./items');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const loggingMiddleware = require('../middlewares/loggingMiddleware');
const registerRouter = require('./registerUser');
const loginRouter = require("./loginUser");
const settingsRouter = require("./userSettings");

// Main route
app.get('/', loggingMiddleware, (req, res) => {
  res.send('Hello, this is project tracker API!');
});

// register route
app.use('/v', loggingMiddleware, registerRouter);

// login route
app.use('/v1', loggingMiddleware, loginRouter);

//user settings route
app.use('/v2', authorizeMiddleware, loggingMiddleware, settingsRouter );

module.exports = app;