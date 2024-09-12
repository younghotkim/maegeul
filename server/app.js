const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const mysql = require("mysql");

// 라우트 파일들
const userApi = require("./routes/userApi");
const authRoutes = require("./routes/auth");
const analyzeRoute = require("./routes/analyze");

dotenv.config();

const app = express();

// CORS 설정
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(cors()); // 모든 도메인에서의 요청을 허용

app.use(bodyParser.json());
app.use(express.json()); // JSON 요청 처리

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_LOCAL)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log("DB connection failed:", err));

const connection = mysql.createConnection({
  host: "db-team06-identifier.c9kciawyijr0.ap-northeast-2.rds.amazonaws.com",
  user: "team06",
  password: "qwer1234!",
  database: "maegeul",
  port: 3306, // 일반적으로 MySQL은 3306 포트를 사용함
});

connection.connect((err) => {
  if (err) {
    console.error("DB 연결 실패:", err);
  } else {
    console.log("AWS RDS MySQL에 성공적으로 연결되었습니다.");
  }
});

app.get("/profile/:userId", (req, res) => {
  res.set("Cache-Control", "no-store"); // 캐시 무효화
  const userId = req.params.userId;
  const query = "SELECT profile_name FROM User WHERE user_id = ?";

  connection.query(query, [userId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error executing query" });
      return;
    }

    if (results.length > 0) {
      res.json(results[0]); // profile_name 반환
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// 세션 설정
app.use(
  session({
    secret: "yourSecretKey", // 환경 변수로 설정하는 것이 좋음
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // 로컬 개발에서는 false, 프로덕션에서는 true
  })
);

// Passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session());

// 라우트 설정
app.use("/users", userApi); // 사용자 관련 API
app.use("/auth", authRoutes); // 인증 관련 API
app.use("/api/analyze", analyzeRoute); // AI 감정 분석 API

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Kakao 인증 콜백 처리
app.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", { session: false }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`http://localhost:3000/login/success?token=${token}`);
  }
);

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
