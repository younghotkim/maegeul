const db = require("../db"); // MySQL DB 연결 설정
const { encrypt, decrypt, generateEncryptionKey } = require("../util/encrypt");
const crypto = require("crypto");

const saveDiary = (diaryData, callback) => {
  const { user_id, title, encryptedContent, color } = diaryData;

  // 암호화는 Controller에서 처리된 후, 이미 암호화된 content를 받음

  // 암호화된 일기 데이터를 DB에 저장
  const sql = `INSERT INTO Diary (user_id, title, content, color, date) VALUES (?, ?, ?, ?, NOW())`;
  db.query(sql, [user_id, title, encryptedContent, color], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// 특정 유저의 모든 일기를 조회하는 함수
const getDiariesByUserId = (user_id, encryptionKey, callback) => {
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

    // 암호화된 일기 내용 복호화
    const decryptedDiaries = result.map((diary) => {
      try {
        diary.content = decrypt(diary.content, encryptionKey); // 복호화 처리
      } catch (error) {
        console.error("일기 복호화 중 오류 발생:", error);
        diary.content = "복호화 실패"; // 복호화 실패 시 처리
      }
      return diary;
    });

    callback(null, decryptedDiaries);
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
               CAST(ROW_NUMBER() OVER (ORDER BY date) AS SIGNED) - DATEDIFF(date, MIN(date) OVER (PARTITION BY user_id)) AS grp
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
