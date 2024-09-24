const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { uploadFile } = require("../controllers/uploadControllers");

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // 업로드 폴더 설정
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`; // 파일 이름 설정
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB 제한
});

// 파일 업로드 엔드포인트
router.post("/upload", upload.single("profile_picture"), uploadFile);

module.exports = router;
