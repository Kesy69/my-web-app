import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Define the path for the database
const dbDir = path.resolve(process.cwd(), 'db');
const dbPath = path.join(dbDir, 'marketplace.db');

// Ensure the directory exists
fs.mkdirSync(dbDir, { recursive: true });

// Create a new database connection
// The file will be created if it doesn't exist
const db = new Database(dbPath, { verbose: console.log });

/**
 * Initializes the database by creating tables if they don't already exist.
 */
export function initDb() {
  console.log('Initializing database...');
  
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  // Run the SQL to create the table
  db.exec(createProductsTable);

  // Add some sample data if the table is empty
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  if (count.count === 0) {
    console.log('Adding sample data...');
    const insert = db.prepare('INSERT INTO products (name, price) VALUES (?, ?)');
    insert.run('Laptop Pro', 1299.99);
    insert.run('Smartphone X', 799.00);
    insert.run('Wireless Mouse', 25.50);
  }

  console.log('Database initialized successfully.');
}

// Export the database connection for use in other parts of the app
export default db;
