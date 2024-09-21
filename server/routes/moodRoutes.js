const express = require("express");
const router = express.Router();
const {
  createMoodMeter,
  getMoodMeterForUser,
  getColorKeywordCount,
} = require("../controllers/moodController"); // Controller 임포트

// POST 요청: 감정 데이터를 저장하는 API
router.post("/save-moodmeter", createMoodMeter);

// GET 요청: 특정 user_id에 해당하는 감정 데이터를 조회하는 API
router.get("/moodmeter/user/:user_id", getMoodMeterForUser);

// 특정 user_id로 색깔별 키워드 개수 조회하는 API
router.get("/moodmeter/colorcount/:user_id", getColorKeywordCount);

module.exports = router;
