const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 배포 환경과 로컬 환경에 따른 CALLBACK_URL 설정
const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "https://maegeul.com/"
    : "http://localhost:3000/";

// 카카오 로그인 콜백 처리 라우트
router.get("/kakao/callback", (req, res, next) => {
  passport.authenticate("kakao", (err, user, info) => {
    if (err || !user) {
      console.error("카카오 로그인 실패:", err || info);
      return res.redirect("/login"); // 실패 시 로그인 페이지로 리다이렉트
    }

    // 카카오 로그인 성공 시 JWT 토큰 생성
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // 토큰 유효 기간
    });

    // 로그인 성공 시 클라이언트로 리다이렉트 (토큰과 userId 전달)
    res.redirect(
      `${CALLBACK_URL}kakao/callback?userId=${user.user_id}&token=${token}`
    );
  })(req, res, next); // authenticate 함수 호출 시 (req, res, next) 필요
});

module.exports = router;
