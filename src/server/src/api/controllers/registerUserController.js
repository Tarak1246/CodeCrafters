const registerUserService = require('../../services/registerUserService');

// register user
const registerUser = async (req, res) => {
  const userData = req?.body;
  const createUserResponse = await registerUserService.createUser(userData);
  res.json(createUserResponse);
};

//login user
const loginUser = async (req, res) => {
  const userData = req?.body;
  const loginUserResponse = await registerUserService.loginUser(userData);
  res.json(loginUserResponse);
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
  registerUser,
  loginUser,
  createItem,
  updateItem,
  deleteItem,
};