const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const axios = require("axios");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// 회원가입 컨트롤러
exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      salt,
      username,
      profile_name,
      age,
      gender,
      birthdate,
      profile_picture,
    } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "필수 항목이 누락되었습니다." });
    }

    const userData = {
      email,
      password, // 해싱된 비밀번호
      salt, // 생성된 salt 저장
      username,
      profile_name,
      age,
      gender,
      birthdate,
      profile_picture,
    };

    // 데이터베이스에 userData 저장 (userModel.insertUser 등)
    userModel.insertUser(userData, (err, userId) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "DB 저장 중 오류 발생", error: err });
      }
      res.status(201).json({ message: "회원가입 성공", userId });
    });
  } catch (error) {
    res.status(500).json({ message: "회원가입 중 오류 발생", error });
  }
};

// 로그인 컨트롤러
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body); // 클라이언트로부터 전달된 데이터 확인

  // 사용자 조회
  userModel.select(email, password, async (err, user) => {
    console.log(user); // 데이터베이스에서 조회된 사용자 정보 확인

    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "서버 오류" });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.user_id, profileName: user.profile_name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("로그인 성공: ", user.profile_name, user.user_id);

    res.status(200).json({
      message: "로그인 성공",
      token,
      user: {
        user_id: user.user_id,
        profile_name: user.profile_name,
        email: user.email,
        profile_picture: user.profile_picture,
      },
    });
  });
};

// 회원 정보 조회 컨트롤러
exports.getUser = (req, res) => {
  const { user_id } = req.params;

  userModel.get_user(user_id, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "회원 정보를 가져오는 중 오류가 발생했습니다.",
        error: err,
      });
    }

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({
      message: "회원 정보 조회 성공",
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        profile_name: user.profile_name,
        profile_picture: user.profile_picture,
      },
    });
  });
};

// 회원 정보 수정 컨트롤러
exports.updateUser = async (req, res) => {
  const {
    user_id,
    username,
    email,
    profile_name,
    password,
    age,
    gender,
    login_type,
    profile_picture,
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "사용자 ID가 필요합니다." });
  }

  let updatedPassword = null;
  let salt = null;

  // 비밀번호가 수정된 경우 새로운 salt 생성 및 비밀번호 해싱
  if (password) {
    salt = crypto.randomBytes(16).toString("hex");
    updatedPassword = await bcrypt.hash(password + salt, 10);
  }

  const userData = {
    user_id,
    username,
    email,
    profile_name,
    password: updatedPassword || password,
    salt: salt || null, // 새로운 비밀번호가 있을 때만 salt 업데이트
    age,
    gender,
    login_type,
    profile_picture,
  };

  userModel.update(userData, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "회원 정보 수정 중 오류가 발생했습니다.",
        error: err,
      });
    }

    res.status(200).json({ message: "회원 정보 수정 성공", result });
  });
};

// 회원 탈퇴 컨트롤러
exports.deleteUser = (req, res) => {
  const { user_id } = req.params;

  userModel.delete(user_id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "회원 탈퇴 중 오류가 발생했습니다.",
        error: err,
      });
    }

    res.status(200).json({ message: "회원 탈퇴 성공", result });
  });
};

// 이메일 중복 검사 함수
exports.checkDuplicateEmail = (email, callback = () => {}) => {
  userModel.findByEmail(email, (err, user) => {
    if (err) {
      return callback(err, null);
    }
    if (user) {
      // 사용자가 존재하면 중복된 이메일이 있다는 것을 알림
      return callback(null, true); // true: 중복된 이메일 존재
    }
    return callback(null, false); // false: 중복된 이메일 없음
  });
};
