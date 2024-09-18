const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const userModel = require("../models/user"); // user.js 파일을 불러옴

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID, // Kakao App의 REST API 키
      callbackURL: process.env.KAKAO_REDIRECT_URI, // Kakao 로그인 완료 후 호출되는 콜백 URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 카카오 로그인 처리 로직 호출
        userModel.handleKakaoLogin(profile, (err, user) => {
          if (err) return done(err);
          return done(null, user); // 성공 시 사용자 정보 전달
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// 세션에 사용자 정보를 저장
passport.serializeUser((user, done) => {
  done(null, user.user_id); // 세션에 user_id 저장
});

// 세션에서 사용자 정보를 복원
passport.deserializeUser((user_id, done) => {
  userModel.get_user(user_id, (err, user) => {
    if (err) return done(err);
    done(null, user); // 사용자 정보를 복원
  });
});

module.exports = passport;
