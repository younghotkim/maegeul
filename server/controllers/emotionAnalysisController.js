const {
  saveEmotionAnalysis,
  getEmotionAnalysisByDiaryId,
  countEmotionAnalysisByUserId,
} = require("../models/emotionAnalysisModel");

// 감정 분석 결과를 저장하는 컨트롤러
const createEmotionAnalysis = (req, res) => {
  const { user_id, diary_id, emotion_result } = req.body;

  // 필수 필드 확인
  if (!user_id || !diary_id || !emotion_result) {
    return res.status(400).json({ error: "필수 데이터가 누락되었습니다." });
  }

  saveEmotionAnalysis({ user_id, diary_id, emotion_result }, (err, result) => {
    if (err) {
      console.error("DB 저장 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 저장 중 오류 발생" });
    }
    res.status(200).json({ message: "감정 분석 결과가 저장되었습니다." });
  });
};

// 특정 일기(diary_id)의 감정 분석 결과 조회 컨트롤러
const getEmotionAnalysis = (req, res) => {
  const { diary_id } = req.params;

  if (!diary_id) {
    return res.status(400).json({ error: "diary_id가 누락되었습니다." });
  }

  getEmotionAnalysisByDiaryId(diary_id, (err, emotionReport) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 조회 중 오류 발생" });
    }

    if (!emotionReport) {
      return res.status(404).json({ message: "감정 분석 결과가 없습니다." });
    }

    res.status(200).json({ emotionReport });
  });
};

// 특정 사용자의 감정 분석 결과 개수 조회 컨트롤러
const getEmotionAnalysisCount = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ error: "user_id가 누락되었습니다." });
  }

  countEmotionAnalysisByUserId(user_id, (err, count) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 조회 중 오류 발생" });
    }

    res.status(200).json({ totalEmotionResults: count });
  });
};

module.exports = {
  createEmotionAnalysis,
  getEmotionAnalysis,
  getEmotionAnalysisCount,
};
