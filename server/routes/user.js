const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const path = require("path");

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // 파일 저장 경로 설정
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // 파일 이름 설정
  },
});

const upload = multer({ storage });

// 회원가입 라우트
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

router.post("/check-email", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  userController.checkDuplicateEmail(email, (err, isDuplicate) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }

    if (isDuplicate) {
      return res.status(409).json({ message: "Email already exists" }); // 409: Conflict
    }

    return res.status(200).json({ message: "Email is available" });
  });
});

module.exports = router;
