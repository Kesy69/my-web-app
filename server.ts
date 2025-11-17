import express from 'express';
import cors from 'cors';
import { initDb, default as db } from './src/lib/db.ts';

// Initialize the Express app
const app = express();
const port = 3001; // Choose a port that doesn't conflict with Vite

// --- Middleware ---
// Enable CORS for all routes to allow frontend to connect
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());


// --- Database Initialization ---
// Run the database initialization script
try {
  initDb();
  console.log('Database connection and initialization successful.');
} catch (error) {
  console.error('Failed to initialize the database:', error);
  process.exit(1); // Exit if DB fails to initialize
}


// --- API Routes ---
// Define a route to get all products
app.get('/api/products', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products');
    const products = stmt.all();
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// --- Server Startup ---
// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
