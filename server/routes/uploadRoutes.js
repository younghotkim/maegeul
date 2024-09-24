const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { uploadFile } = require("../controllers/uploadControllers");

// multer 설정
const isProduction = process.env.NODE_ENV === "production";
const uploadPath = isProduction
  ? "/home/ec2-user/maegeul/server/uploads" // EC2 배포 환경 경로
  : path.join(__dirname, "../uploads"); // 로컬 개발 환경 경로

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
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
