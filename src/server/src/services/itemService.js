// Sample data (in-memory database)
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];
  
  // Get all items
  const getAllItems = () => {
    return items;
  };
  
  // Get item by ID
  const getItemById = (itemId) => {
    return items.find((item) => item.id == itemId);
  };
  
  // Create a new item
  const createItem = (newItem) => {
    const itemId = items.length + 1;
    newItem.id = itemId;
    items.push(newItem);
    return newItem;
  };
  
  // Update item by ID
  const updateItem = (itemId, updatedItem) => {
    items = items.map((item) => (item.id == itemId ? updatedItem : item));
    return updatedItem;
  };
  
  // Delete item by ID
  const deleteItem = (itemId) => {
    items = items.filter((item) => item.id != itemId);
    return { message: 'Item deleted successfully' };
  };
  
  module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
  };
  