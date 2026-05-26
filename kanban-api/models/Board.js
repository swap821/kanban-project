import mongoose from 'mongoose';

// Define the structure of a Task
const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  content: { type: String, required: true }
});

// Define the structure of a Column
const columnSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  taskIds: [{ type: String }] // Array of string IDs
});

// Define the main Board schema
const boardSchema = new mongoose.Schema({
  // Mongoose "Map" is perfect for our dictionary objects (Record<Id, Task>)
  tasks: {
    type: Map,
    of: taskSchema,
    default: {}
  },
  columns: {
    type: Map,
    of: columnSchema,
    default: {}
  },
  columnOrder: [{ type: String, default: [] }]
});

// Export the model so we can use it in our server
export default mongoose.model('Board', boardSchema);