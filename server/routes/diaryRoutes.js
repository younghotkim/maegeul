const express = require("express");
const router = express.Router();
const {
  createDiary,
  getUserDiaries,
  getDiaryCountByUser,
  getConsecutiveDaysByUser,
} = require("../controllers/diaryController");

// POST 요청으로 일기 저장
router.post("/diary", createDiary);

// GET 요청으로 특정 사용자의 일기 조회
router.get("/diary/:user_id", getUserDiaries);

// GET 요청으로 특정 사용자의 일기 총 갯수 조회
router.get("/diary/count/:user_id", getDiaryCountByUser);

// GET 요청으로 연속 작성일수 구하기
router.get("/diary/consecutive/:user_id", getConsecutiveDaysByUser);

module.exports = router;
