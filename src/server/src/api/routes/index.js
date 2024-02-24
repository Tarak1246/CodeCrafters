const express = require('express');
const router = express.Router();
const itemsRouter = require('./items');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const loggingMiddleware = require('../middlewares/loggingMiddleware');
const registerRouter = require('./registerUser');
// Main route
router.get('/', loggingMiddleware, (req, res) => {
  res.send('Hello, this is your API!');
});

// register route
router.use('/v', loggingMiddleware, registerRouter);

// login route
router.use('/v1', loggingMiddleware, registerRouter);

// Items route
router.use('/items', itemsRouter);

module.exports = router;