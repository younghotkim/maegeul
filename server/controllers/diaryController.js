const {
  saveDiary,
  getDiariesByUserId,
  countDiariesByUserId,
  getConsecutiveDaysByUserId,
  deleteDiaryById,
} = require("../models/diaryModel");
const { getUserPasswordAndSalt } = require("../models/user");
const { encrypt, generateEncryptionKey } = require("../util/encrypt");

const createDiary = (req, res) => {
  console.log("createDiary 컨트롤러에 요청이 도달했습니다.");

  const { user_id, title, content, color } = req.body;

  console.log(user_id, title, content, color);

  // 사용자의 해시된 비밀번호와 salt를 가져와 암호화 키를 생성
  getUserPasswordAndSalt(user_id, (err, user) => {
    if (err) {
      console.error("사용자의 비밀번호 및 salt 가져오는 중 오류 발생:", err);
      return res.status(500).json({
        error: "사용자의 비밀번호 및 salt를 가져오는 중 오류가 발생했습니다.",
      });
    }

    if (!user || !user.password || !user.salt) {
      console.error("비밀번호 또는 Salt 값이 정의되지 않았습니다.");
      return res.status(500).json({
        error: "비밀번호 또는 Salt 값이 정의되지 않았습니다.",
      });
    }

    const encryptionKey = generateEncryptionKey(user.password, user.salt);

    // 일기 내용을 암호화
    const encryptedContent = encrypt(content, encryptionKey);
    // 모델을 통해 일기 저장

    console.log("암호화: ", encryptedContent);

    saveDiary({ user_id, title, encryptedContent, color }, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "DB 저장 중 오류가 발생했습니다." });
      }
      res
        .status(200)
        .json({ message: "일기가 저장되었습니다.", diary_id: result.insertId });
      console.log("암호화 일기 저장 성공!");
    });
  });
};

// 특정 사용자의 일기를 조회하는 컨트롤러
const getUserDiaries = (req, res) => {
  const { user_id } = req.params;

  // user_id가 존재하는지 확인
  if (!user_id) {
    return res.status(400).json({ error: "user_id가 누락되었습니다." });
  }

  // 사용자의 비밀번호 및 salt 조회
  getUserPasswordAndSalt(user_id, (err, user) => {
    if (err) {
      console.error("사용자의 비밀번호 및 salt 가져오는 중 오류 발생:", err);
      return res.status(500).json({
        error: "사용자의 비밀번호 및 salt를 가져오는 중 오류가 발생했습니다.",
      });
    }

    if (!user || !user.password || !user.salt) {
      console.error("비밀번호 또는 Salt 값이 정의되지 않았습니다.");
      return res.status(500).json({
        error: "비밀번호 또는 Salt 값이 정의되지 않았습니다.",
      });
    }

    // 암호화 키 생성 (사용자 비밀번호 + salt 기반)
    const encryptionKey = generateEncryptionKey(user.password, user.salt);

    // 모델을 통해 일기 조회 및 복호화
    getDiariesByUserId(user_id, encryptionKey, (err, diaries) => {
      if (err) {
        console.error("DB 조회 중 오류 발생:", err);
        return res.status(500).json({ error: "DB 조회 중 오류 발생" });
      }

      // 결과가 없을 경우 처리
      if (diaries.length === 0) {
        return res.status(404).json({ message: "일기가 없습니다." });
      }

      // 복호화된 일기 반환
      res.status(200).json(diaries);
    });
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

const deleteDiary = (req, res) => {
  const { diary_id } = req.params; // URL에서 diary_id를 가져옴

  if (!diary_id) {
    return res.status(400).json({ error: "Diary ID is required" });
  }

  // deleteDiaryById 함수 호출
  deleteDiaryById(diary_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete diary" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Diary not found" });
    }

    return res.status(200).json({ message: "Diary deleted successfully" });
  });
};

module.exports = {
  createDiary,
  getUserDiaries,
  getDiaryCountByUser,
  getConsecutiveDaysByUser,
  deleteDiary,
};
