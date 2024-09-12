require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("DB 연결 실패:", err);
  } else {
    console.log("AWS RDS MySQL에 성공적으로 연결되었습니다.");
  }
});

module.exports = connection;
