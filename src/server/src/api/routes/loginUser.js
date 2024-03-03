const express = require('express');
const router = express.Router();
const loggingMiddleware = require('../middlewares/loggingMiddleware');
const loginController = require('../controllers/loginUserController');

//user login
router.post('/login', loggingMiddleware, loginController.loginUser);

// Get item by ID
// router.get('/:id', authorizeMiddleware, loggingMiddleware, itemsController.getItemById);

// // Create a new item
// router.post('/', authorizeMiddleware, loggingMiddleware, itemsController.createItem);

// // Update item by ID
// router.put('/:id', authorizeMiddleware, loggingMiddleware, itemsController.updateItem);

// // Delete item by ID
// router.delete('/:id', authorizeMiddleware, loggingMiddleware, itemsController.deleteItem);

module.exports = router;