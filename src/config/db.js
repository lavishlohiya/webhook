const { Pool } = require("pg");

// Configure PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test initial database connection
pool
    .connect()
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection error:", err.message));

module.exports = pool;