const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.port || 8080;
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  connectionLimit: 10,
  host: "sql10.freesqldatabase.com",
  user: "sql10622868",
  password: "vhvbzjpT2C",
  database: "sql10622868",
});

app.post("/adddata", function (req, res) {
  const body = req.body;
  console.log(body);
  const sql_insert = `INSERT INTO Data (title, description, image, author, date) VALUES ("${body.title}","${body.description}","${body.image}","${body.author}","${body.date}");`;
  db.query(sql_insert, (err) => {
    if (err) {
      return res.status(400).send("No able to create the data!");
    } else {
      res.status(200).send("Data added successfully!");
    }
  });
});

app.get("/getdata/:limit", function (req, res) {
  const limit = parseInt(req.params.limit);
  const sql = "SELECT * FROM Data ORDER BY id LIMIT ?";
  db.query(sql, [limit], (err, result) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).json({
      message: "success",
      data: result,
    });
  });
});

app.listen(port, function () {
  console.log("server running on 8080");
});
