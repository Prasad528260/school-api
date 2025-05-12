const mysql = require('mysql2/promise');
require('dotenv').config();

// Check if we're in production (Render provides a RENDER environment variable)
const isProduction = process.env.RENDER === 'true';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'PrasadMy@5460',
  database: process.env.DB_NAME || 'school_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// For production on Render, use the connection string if available
if (isProduction && process.env.DATABASE_URL) {
  dbConfig.uri = process.env.DATABASE_URL;
  dbConfig.ssl = {
    rejectUnauthorized: false
  };
}

const pool = mysql.createPool(dbConfig);

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Test the connection when the app starts
testConnection();

module.exports = pool;
