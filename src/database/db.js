const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: 'games-db.cva6sq4ykuc2.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Ceg49p7ZF!8FU$vwPbf',
  database: 'games_db',
  port: 3306,
});

// Create users table if it doesn't exist
db.query(
  `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`,
  (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table ready");
    }
  }
);

module.exports = db;
