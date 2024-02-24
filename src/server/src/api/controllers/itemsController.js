const itemService = require('../../services/itemService');

// Get all items
const getAllItems = (req, res) => {
  const items = itemService.getAllItems();
  res.json(items);
};

// Get item by ID
const getItemById = (req, res) => {
  const itemId = req.params.id;
  const item = itemService.getItemById(itemId);
  res.json(item);
};

// Create a new item
const createItem = (req, res) => {
  const newItem = req.body;
  const createdItem = itemService.createItem(newItem);
  res.status(201).json(createdItem);
};

// Update item by ID
const updateItem = (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const result = itemService.updateItem(itemId, updatedItem);
  res.json(result);
};

// Delete item by ID
const deleteItem = (req, res) => {
  const itemId = req.params.id;
  const result = itemService.deleteItem(itemId);
  res.json(result);
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};