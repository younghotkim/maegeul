const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원가입 라우트
router.post("/register", userController.register);

// 로그인 라우트
router.post("/login", userController.login);

// 회원 정보 조회 라우트
router.get("/user/:user_id", userController.getUser);

// 회원 정보 수정 라우트
router.put("/user", userController.updateUser);

// 회원 탈퇴 라우트
router.delete("/user/:user_id", userController.deleteUser);

module.exports = router;
