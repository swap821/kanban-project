import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Board from './models/Board.js'; // <-- Import the new model

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174'
}));
app.use(express.json());

// ==========================================
// API ROUTES
// ==========================================

// 1. GET Route: Fetch the board data
app.get('/api/board', async (req, res) => {
  try {
    // Look for the first board in the database
    let board = await Board.findOne();
    
    // If no board exists yet, send back an empty template
    if (!board) {
      return res.json({ tasks: {}, columns: {}, columnOrder: [] });
    }
    
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching board' });
  }
});

// 2. POST Route: Save/Update the entire board
app.post('/api/board', async (req, res) => {
  try {
    const { tasks, columns, columnOrder } = req.body;

    // Find the board and replace it, or create a new one if it doesn't exist
    // Upsert means "Update if it exists, Insert if it doesn't"
    const updatedBoard = await Board.findOneAndUpdate(
      {}, // empty filter means "just grab the first document you see"
      { tasks, columns, columnOrder },
      { new: true, upsert: true } 
    );

    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: 'Error saving board' });
  }
});

// ==========================================
// DATABASE CONNECTION
// ==========================================

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
  });