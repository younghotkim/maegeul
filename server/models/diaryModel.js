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
  const sql = `
    SELECT diary_id, user_id, title, content, color, 
           DATE_FORMAT(date, '%H:%i') AS formatted_date 
    FROM Diary 
    WHERE user_id = ? 
    ORDER BY date DESC
  `;
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

// 특정 유저의 연속된 일수 계산하는 함수
const getConsecutiveDaysByUserId = (user_id, callback) => {
  const sql = `
    SELECT 
      DATE_FORMAT(MIN(date), '%Y-%m-%d') AS start_date, 
      DATEDIFF(MAX(date), MIN(date)) + 1 AS consecutive_days
    FROM (
        SELECT date, 
               ROW_NUMBER() OVER (ORDER BY date) - DATEDIFF(date, MIN(date) OVER (PARTITION BY user_id)) AS grp
        FROM Diary
        WHERE user_id = ?
    ) AS subquery
    GROUP BY grp
    ORDER BY start_date;
  `;

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
  countDiariesByUserId,
  getConsecutiveDaysByUserId, // 연속된 일수를 계산하는 함수 추가
};
