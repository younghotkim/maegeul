const db = require("../db"); // MySQL DB 연결 설정

// 일기 저장하는 함수
const saveDiary = (diaryData, callback) => {
  const { user_id, title, content, color } = diaryData; // color 추가
  const sql = `INSERT INTO Diary (user_id, title, content, color, date) VALUES (?, ?, ?, ?, NOW())`; // color 필드 추가

  db.query(sql, [user_id, title, content, color], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// 특정 유저의 모든 일기를 조회하는 함수
const getDiariesByUserId = (user_id, callback) => {
  const sql = `SELECT * FROM Diary WHERE user_id = ? ORDER BY date DESC`;
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// 특정 유저의 총 일기 갯수를 카운트하는 함수
const countDiariesByUserId = (user_id, callback) => {
  const sql = `SELECT COUNT(*) AS totalDiaries FROM Diary WHERE user_id = ?`;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0].totalDiaries); // 총 갯수 반환
  });
};

module.exports = {
  saveDiary,
  getDiariesByUserId,
  countDiariesByUserId,
};
