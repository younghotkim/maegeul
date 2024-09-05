const express = require('express');
const passport = require('passport');
const router = express.Router();

// 패스포트 설정
require('../config/passport'); // 패스포트 설정 파일 불러오기

// Kakao 로그인 라우트
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 인증 콜백 경로
router.get('/auth/kakao/callback', passport.authenticate('kakao', { session: false }), (req, res) => {
  const { token } = req.user;  // 사용자 인증 후 생성된 JWT 토큰
  // 토큰을 포함하여 프론트엔드로 리다이렉트
  res.redirect(`http://localhost:3000/login/success?token=${token}`);
});

module.exports = router;
