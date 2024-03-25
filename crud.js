const fs = require('fs');

// Read data from the JSON file
const readData = () => {
    try {
        const data = fs.readFileSync('bank_rates.json', 'utf8');

        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return { bank: [] };
    }
};

// Write data to the JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync('bank_rates.json', JSON.stringify(data, null, 2));
        console.log('Data written successfully.');
    } catch (error) {
        console.error('Error writing data:', error);
    }
};

// Create a new item
const createItem = (name) => {
    const data = readData();
    const newItem = { id: data.items.length + 1, name };
    data.items.push(newItem);
    writeData(data);
};

// Read all items
const readAllBanks = () => {
    const data = readData();
    return data.banks;
};

// Update an item by ID
const updateItem = (id, newName) => {
    const data = readData();
    const itemToUpdate = data.items.find(item => item.id === id);
    if (itemToUpdate) {
        itemToUpdate.name = newName;
        writeData(data);
        console.log(`Item with ID ${id} updated successfully.`);
    } else {
        console.error(`Item with ID ${id} not found.`);
    }
};

// Delete an item by ID
const deleteItem = (id) => {
    const data = readData();
    const index = data.items.findIndex(item => item.id === id);
    if (index !== -1) {
        data.items.splice(index, 1);
        writeData(data);
        console.log(`Item with ID ${id} deleted successfully.`);
    } else {
        console.error(`Item with ID ${id} not found.`);
    }
};

// Usage examples:
// createItem('New Item');
console.log(readAllBanks());
// updateItem(2, 'Updated Item');
// console.log(readAllItems());
// deleteItem(3);
// console.log(readAllItems());

