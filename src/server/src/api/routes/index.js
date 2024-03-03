const express = require('express');
const router = express.Router();
const itemsRouter = require('./items');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const loggingMiddleware = require('../middlewares/loggingMiddleware');
const registerRouter = require('./registerUser');
const loginRouter = require("./loginUser");
const settingsRouter = require("./userSettings");

// Main route
router.get('/', loggingMiddleware, (req, res) => {
  res.send('Hello, this is project tracker API!');
});

// register route
router.use('/v', loggingMiddleware, registerRouter);

// login route
router.use('/v1', loggingMiddleware, loginRouter);

//user settings route
router.use('/v2', loggingMiddleware, authorizeMiddleware, settingsRouter);

module.exports = router;