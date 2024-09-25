const express = require("express");
const router = express.Router();
const {
  createEmotionAnalysis,
  getEmotionAnalysis,
  getEmotionAnalysisCount,
} = require("../controllers/emotionAnalysisController");

// 감정 분석 결과 저장
router.post("/emotion", createEmotionAnalysis);

// 특정 일기(diary_id)의 감정 분석 결과 조회
router.get("/emotion/:diary_id", getEmotionAnalysis);

// 특정 사용자의 감정 분석 결과 갯수 조회
router.get("/emotion/user/:user_id/count", getEmotionAnalysisCount);

module.exports = router;
