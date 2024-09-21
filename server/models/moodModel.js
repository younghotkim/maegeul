const db = require("../db"); // MySQL 데이터베이스 설정 파일 (db 연결)

// 감정 데이터를 저장하는 함수
const saveMoodMeter = (moodData, callback) => {
  const { user_id, label, color, pleasantness, energy } = moodData;

  const sql =
    "INSERT INTO MoodMeter (user_id, label, color, pleasantness, energy) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [user_id, label, color, pleasantness, energy],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

// 특정 user_id에 해당하는 감정 데이터를 조회하는 함수
const getMoodMeterByUserId = (user_id, callback) => {
  const sql = "SELECT * FROM MoodMeter WHERE user_id = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getColorKeywordCountByUserId = (user_id, callback) => {
  const sql = `
    SELECT color, COUNT(*) AS count 
    FROM MoodMeter 
    WHERE user_id = ? 
    GROUP BY color
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  saveMoodMeter,
  getMoodMeterByUserId,
  getColorKeywordCountByUserId,
};
