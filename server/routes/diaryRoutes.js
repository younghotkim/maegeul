const express = require("express");
const router = express.Router();
const {
  createDiary,
  getUserDiaries,
} = require("../controllers/diaryController");

// POST 요청으로 일기 저장
router.post("/diary", createDiary);

// GET 요청으로 특정 사용자의 일기 조회
router.get("/diary/:user_id", getUserDiaries);

module.exports = router;
