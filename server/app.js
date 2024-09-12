const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");

// 라우트 파일들
const authRoutes = require("./routes/auth");
const analyzeRoute = require("./routes/analyze");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user"); // 라우트 파일 임포트

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 파싱 미들웨어
app.use(express.urlencoded({ extended: true })); // URL 인코딩 파싱 미들웨어

// CORS 설정 (개발 시 모든 도메인 허용)
app.use(cors());

// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret", // 환경 변수 사용
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // 프로덕션에서는 true
  })
);

// Passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session());

// 라우트 설정
app.use("/auth", authRoutes); // 인증 관련 API
app.use("/api/analyze", analyzeRoute); // AI 감정 분석 API
app.use("/", profileRoutes); // 사용자 정보 조회

// 사용자 라우트 등록
app.use("/api", userRoutes); // '/api' 경로 하위에 사용자 관련 라우트를 등록

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
