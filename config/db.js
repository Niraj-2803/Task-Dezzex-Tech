const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool(process.env.DATABASE_URL);

pool.getConnection()
  .then(conn => {
    console.log("MySQL Connected!");
    conn.release();
  })
  .catch(err => {
    console.error("MySQL Connection Failed:", err.message);
  });

module.exports = pool;
