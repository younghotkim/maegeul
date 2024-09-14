const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const userModel = require("../models/user");

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const kakaoId = profile.id;
        const email = profile._json.kakao_account.email;
        const nickname = profile.displayName; // 카카오에서 제공하는 닉네임
        const profileImage = profile._json.properties.profile_image;

        userModel.findByKakaoId(kakaoId, (err, user) => {
          if (err) return done(err);

          if (user) {
            // 기존 사용자가 있는 경우
            return done(null, user);
          } else {
            // 새로운 사용자 회원가입
            const newUser = {
              kakao_id: kakaoId,
              email,
              username: nickname || "카카오유저", // 닉네임 또는 기본값 설정
              profile_name: nickname, // profile_name에 닉네임 저장
              profile_picture: profileImage,
              login_type: "kakao",
            };

            userModel.insert(newUser, (err, userId) => {
              if (err) return done(err);

              newUser.user_id = userId; // 새로 생성된 userId 추가
              return done(null, newUser);
            });
          }
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// 사용자 세션에 정보 저장 (세션을 사용할 경우)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
