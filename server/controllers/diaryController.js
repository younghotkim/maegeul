const {
  saveDiary,
  getDiariesByUserId,
  countDiariesByUserId,
  getConsecutiveDaysByUserId, // 연속된 일수를 계산하는 함수 추가
} = require("../models/diaryModel");

// 일기를 저장하는 컨트롤러
const createDiary = (req, res) => {
  const { user_id, title, content, color } = req.body;

  // 필수 필드 확인
  if (!user_id || !title || !content) {
    return res.status(400).json({ error: "필수 데이터가 누락되었습니다." });
  }

  // 모델을 통해 일기 저장
  saveDiary({ user_id, title, content, color }, (err, result) => {
    if (err) {
      console.error("DB 저장 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 저장 중 오류 발생" });
    }
    res
      .status(200)
      .json({ message: "일기가 저장되었습니다.", diary_id: result.insertId });
  });
};

// 특정 사용자의 일기를 조회하는 컨트롤러
const getUserDiaries = (req, res) => {
  const { user_id } = req.params;

  // user_id가 존재하는지 확인
  if (!user_id) {
    return res.status(400).json({ error: "user_id가 누락되었습니다." });
  }

  // 모델을 통해 일기 조회
  getDiariesByUserId(user_id, (err, result) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 조회 중 오류 발생" });
    }

    // 결과가 없을 경우 처리
    if (result.length === 0) {
      return res.status(404).json({ message: "일기가 없습니다." });
    }

    res.status(200).json(result);
  });
};

// 특정 사용자의 일기 갯수를 조회하는 컨트롤러
const getDiaryCountByUser = (req, res) => {
  const { user_id } = req.params;

  // user_id가 존재하는지 확인
  if (!user_id) {
    return res.status(400).json({ error: "user_id가 누락되었습니다." });
  }

  // 모델을 통해 일기 갯수 조회
  countDiariesByUserId(user_id, (err, count) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 조회 중 오류 발생" });
    }

    res.status(200).json({ totalDiaries: count });
  });
};

// 특정 사용자의 연속된 일수를 조회하는 컨트롤러
const getConsecutiveDaysByUser = (req, res) => {
  const { user_id } = req.params;

  // user_id가 존재하는지 확인
  if (!user_id) {
    return res.status(400).json({ error: "user_id가 누락되었습니다." });
  }

  // 모델을 통해 연속된 일수 조회
  getConsecutiveDaysByUserId(user_id, (err, result) => {
    if (err) {
      console.error("DB 조회 중 오류 발생:", err);
      return res.status(500).json({ error: "DB 조회 중 오류 발생" });
    }

    res.status(200).json(result);
  });
};

module.exports = {
  createDiary,
  getUserDiaries,
  getDiaryCountByUser,
  getConsecutiveDaysByUser, // 새로운 함수 추가
};
