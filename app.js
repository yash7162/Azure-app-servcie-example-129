const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

app.get("/", (req, res) => {
  res.send("App Service is running!");
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email FROM users"
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
