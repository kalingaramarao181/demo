const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
app.get("/", (req, res) => {
  res.json("Welcome to BDMS Database System.....");
});
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));


const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "demo",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    process.exit(1);
  }
  console.log("Connected to MySQL database as ID " + connection.threadId);
  connection.release();
});

app.get("/data", (req, res) => {
    const sql = "SELECT * FROM dummy"
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data) 
    })
})

app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000");
})
