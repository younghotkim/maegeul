const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 카카오 로그인 라우트
router.get("/auth/kakao", passport.authenticate("kakao"));

// 카카오 로그인 콜백 처리 라우트
router.get("/auth/kakao/callback", (req, res, next) => {
  passport.authenticate("kakao", (err, user, info) => {
    if (err || !user) {
      console.error("카카오 로그인 실패:", err || info);
      return res.redirect("/login"); // 실패 시 로그인 페이지로 리다이렉트
    }

    // 카카오 로그인 성공 시 토큰 생성
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // 1시간 유효 토큰
    });

    // 로그인 성공 시 클라이언트로 리다이렉트 (토큰과 userId 전달)
    res.redirect(
      `http://localhost:3000/kakao/callback?userId=${user.user_id}&token=${token}`
    );
  })(req, res, next); // 이 부분에 `(req, res, next)`를 반드시 포함해야 합니다.
});

module.exports = router;
