const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("../config/passport");

const multer = require("multer");
const path = require("path");

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 이미지 저장 폴더 설정
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname}`; // 파일명 중복 방지를 위한 유니크한 이름 생성
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// 회원가입 라우트 - 여기서 콜백 함수가 제대로 정의되었는지 확인
router.post(
  "/register",
  upload.single("profile_picture"),
  userController.register
);

// 로그인 라우트
router.post("/login", userController.login);

// 회원 정보 조회 라우트
router.get("/user/:user_id", userController.getUser);

// 회원 정보 수정 라우트
router.put("/user", userController.updateUser);

// 회원 탈퇴 라우트
router.delete("/user/:user_id", userController.deleteUser);

module.exports = router;
