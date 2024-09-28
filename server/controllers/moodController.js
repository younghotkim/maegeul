const {
  saveMoodMeter,
  getMoodMeterByUserId,
  getColorKeywordCountByUserId,
  getLabelByUserId,
} = require("../models/moodModel");

// 감정 데이터를 저장하는 컨트롤러
const createMoodMeter = (req, res) => {
  const moodData = req.body;

  // 필수 데이터가 있는지 확인
  if (!moodData.user_id || !moodData.pleasantness || !moodData.energy) {
    return res.status(400).json({ error: "필수 데이터가 누락되었습니다." });
  }

  saveMoodMeter(moodData, (err, result) => {
    if (err) {
      console.error("DB 저장 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 저장 중 오류 발생" });
    }

    res.status(200).json({
      message: "MoodMeter 데이터가 성공적으로 저장되었습니다",
      id: result.insertId,
    });
  });
};

// 특정 user_id에 해당하는 감정 데이터를 조회하는 컨트롤러
const getMoodMeterForUser = (req, res) => {
  const { user_id } = req.params;

  // user_id가 존재하는지 확인
  if (!user_id) {
    return res.status(400).json({ error: "user_id가 누락되었습니다." });
  }

  getMoodMeterByUserId(user_id, (err, result) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 조회 중 오류 발생" });
    }

    // 결과가 없는 경우 처리
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 사용자의 데이터가 없습니다." });
    }

    res.status(200).json(result);
  });
};

// 특정 user_id에 해당하는 감정 데이터를 조회하는 컨트롤러
const getLabelForUser = (req, res) => {
  const { user_id } = req.params;

  // user_id가 존재하는지 확인
  if (!user_id) {
    return res.status(400).json({ error: "user_id가 누락되었습니다." });
  }

  getLabelByUserId(user_id, (err, result) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 조회 중 오류 발생" });
    }

    // 결과가 없는 경우 처리
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 사용자의 데이터가 없습니다." });
    }

    res.status(200).json(result);
  });
};

// 특정 user_id의 MoodMeter 색깔별 키워드 개수를 반환하는 컨트롤러
const getColorKeywordCount = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ error: "user_id가 누락되었습니다." });
  }

  getColorKeywordCountByUserId(user_id, (err, result) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 조회 중 오류 발생" });
    }

    res.status(200).json(result);
  });
};

module.exports = {
  createMoodMeter,
  getMoodMeterForUser,
  getColorKeywordCount,
  getLabelForUser,
};
