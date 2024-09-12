const userModel = require("../models/user");
const bcrypt = require("bcrypt");

// 회원가입 컨트롤러
exports.register = (req, res) => {
  const {
    username,
    email,
    profile_name,
    password,
    age,
    gender,
    login_type,
    profile_picture,
  } = req.body;

  if (!username || !email || !profile_name || !password) {
    return res.status(400).json({ message: "필수 필드를 입력해주세요." });
  }

  // 회원가입 데이터 생성
  const userData = {
    username,
    email,
    profile_name,
    password,
    age,
    gender,
    login_type,
    profile_picture,
  };

  // 회원가입 처리
  userModel.insert(userData, (err, user_id) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "회원가입 중 오류가 발생했습니다.", error: err });
    }
    res.status(201).json({ message: "회원가입 성공", user_id });
  });
};

// 로그인 컨트롤러
exports.login = (req, res) => {
  console.log("Login request received", req.body); // 로그 추가
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
    res.status(200).json({ message: "로그인 성공", user });
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

    res.status(200).json({ message: "회원 정보 조회 성공", user });
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
