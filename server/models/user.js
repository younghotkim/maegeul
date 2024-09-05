const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // 비밀번호 암호화 라이브러리

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'Nickname is required'],
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  // 로컬 로그인 전용 필드
  local: {
    email: {
      type: String,
      unique: true,
      sparse: true  // email 필드에 대한 중복을 허용하지 않지만, null 값은 허용
    },
    password: {
      type: String
    }
  },

  // 카카오 로그인 전용 필드
  kakao: {
    kakaoId: {
      type: String,
      unique: true,  // 고유한 값을 요구
      sparse: true   // null 값이 중복될 수 있도록 설정
    },
    profile_nickname: {
      type: String,
      required: [true, 'Profile nickname is required']
    },
    profileImage: {
      type: String
    }
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
