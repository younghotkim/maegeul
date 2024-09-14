const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const axios = require("axios");

// 회원가입 컨트롤러
exports.register = (req, res) => {
  const { email, password, username, profile_name, age, gender, login_type } =
    req.body;

  const profileImagePath = req.file ? `/uploads/${req.file.filename}` : null; // 업로드된 파일 경로 설정

  const userData = {
    email,
    password,
    username,
    profile_name,
    age,
    gender,
    login_type,
    profile_picture: profileImagePath,
  };

  userModel.insert(userData, (err, user_id) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "회원가입 중 오류가 발생했습니다.", error: err });
    }
    res.status(201).json({ message: "회원가입 성공", user_id });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // 로그인 처리
  userModel.select(email, password, (err, user) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "서버 오류" });
    }

    if (!user) {
      console.log("Invalid email or password");
      return res
        .status(401)
        .json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    console.log("Login successful for user:", user.profile_name);

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, profileName: user.profile_name }, // 토큰에 포함할 정보
      JWT_SECRET, // 비밀키
      { expiresIn: "1h" } // 토큰 유효 기간 설정
    );

    // 토큰과 사용자 정보를 함께 클라이언트로 반환
    res.status(200).json({
      message: "로그인 성공",
      token, // 생성된 JWT 토큰
      user: {
        id: user.id,
        profileName: user.profile_name,
        email: user.email,
        profile_picture: user.profile_picture,
      },
    });
  });
};

// 회원 정보 조회 컨트롤러
exports.getUser = (req, res) => {
  const { user_id } = req.params;

  // 회원 정보 조회 처리
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

    // 프로필 이미지 경로가 포함된 사용자 정보를 응답
    res.status(200).json({
      message: "회원 정보 조회 성공",
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        profile_name: user.profile_name,
        profile_picture: user.profile_picture, // 프로필 이미지 경로 포함
      },
    });
  });
};

// 회원 정보 수정 컨트롤러
exports.updateUser = (req, res) => {
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

  // 수정할 회원 정보 생성
  const userData = {
    user_id,
    username,
    email,
    profile_name,
    password, // 수정하려는 비밀번호 (수정하지 않으면 기존 비밀번호 유지)
    age,
    gender,
    login_type,
    profile_picture,
  };

  // 회원 정보 수정 처리
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

  // 회원 탈퇴 처리
  userModel.delete(user_id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "회원 탈퇴 중 오류가 발생했습니다.", error: err });
    }

    res.status(200).json({ message: "회원 탈퇴 성공", result });
  });
};
