require('dotenv').config();

const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const jwt = require('jsonwebtoken');

const User = require('../models/user'); // User 모델 임포트

passport.use(new KakaoStrategy({
  clientID: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/kakao/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // 사용자 찾기 또는 생성 로직
    let user = await User.findOne({ 'kakao.kakaoId': profile.id });

    if (!user) {
      user = new User({
        nickname: profileNickname,
        kakao: {
          kakaoId: profile.id,
          profile_nickname: profileNickname,
          profileImage: profileImage
        }
      });
      await user.save();
    }

    // JWT 생성
    const token = jwt.sign(
      { id: user.id, nickname: user.nickname },
      process.env.JWT_SECRET, // JWT 비밀 키
      { expiresIn: '1h' } // 토큰 유효 기간
    );

    // 사용자 정보와 토큰 반환
    return done(null, { user, token });
  } catch (error) {
    return done(error);
  }
}));

// 세션에 사용자 정보를 저장할 때 _id를 저장
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);  // 직렬화할 사용자 객체를 출력하여 확인
  if (!user.user || !user.user._id) {
    return done(new Error('User ID is missing'));
  }
  done(null, user.user._id);  // 세션에 user.user._id 저장
});

passport.deserializeUser(async (_id, done) => {
  console.log('Deserializing user with _id:', _id);  // 세션에서 저장된 _id 출력
  try {
    const user = await User.findById(_id);  // _id로 사용자 정보 찾기
    if (!user) {
      return done(new Error('User not found'), null);
    }
    console.log('Found user:', user);  // 찾은 사용자 정보 출력
    done(null, user);  // 세션에 사용자 정보를 복원
  } catch (err) {
    done(err, null);
  }
});
