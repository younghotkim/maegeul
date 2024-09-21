const db = require("../db"); // MySQL DB 연결 설정

// 일기 저장하는 함수
const saveDiary = (diaryData, callback) => {
  const { user_id, title, content } = diaryData;
  const sql = `INSERT INTO Diary (user_id, title, content, date) VALUES (?, ?, ?, NOW())`;

  db.query(sql, [user_id, title, content], (err, result) => {
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

module.exports = {
  saveDiary,
  getDiariesByUserId,
};
