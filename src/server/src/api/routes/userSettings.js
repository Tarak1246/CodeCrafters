const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/userSettingsController');

//user settings
router.post('/getLoggedinUserData', settingsController.getLoggedinUserData);

// Get item by ID
// router.get('/:id', authorizeMiddleware, loggingMiddleware, itemsController.getItemById);

// // Create a new item
// router.post('/', authorizeMiddleware, loggingMiddleware, itemsController.createItem);

// // Update item by ID
// router.put('/:id', authorizeMiddleware, loggingMiddleware, itemsController.updateItem);

// // Delete item by ID
// router.delete('/:id', authorizeMiddleware, loggingMiddleware, itemsController.deleteItem);

module.exports = router;