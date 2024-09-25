const db = require("../db"); // MySQL DB 연결 설정

const saveEmotionAnalysis = (analysisData, callback) => {
  const { user_id, diary_id, emotion_result } = analysisData;
  const sql = `INSERT INTO EmotionAnalysis (user_id, diary_id, emotion_result, created_at) VALUES (?, ?, ?, NOW())`;

  db.query(sql, [user_id, diary_id, emotion_result], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// diary_id를 통해 감정 분석 리포트를 가져오는 함수
const getEmotionAnalysisByDiaryId = (diary_id, callback) => {
  const sql = `SELECT emotion_result FROM EmotionAnalysis WHERE diary_id = ?`;

  db.query(sql, [diary_id], (err, results) => {
    if (err) {
      return callback(err, null);
    }

    if (results.length > 0) {
      const emotionReport = results[0].emotion_result; // 감정 분석 리포트
      callback(null, emotionReport);
    } else {
      callback(null, null); // 해당 diary_id에 데이터가 없을 경우
    }
  });
};

// user_id를 통해 갯수 카운트
const countEmotionAnalysisByUserId = (user_id, callback) => {
  const sql = `SELECT COUNT(*) AS totalEmotionResults FROM EmotionAnalysis WHERE user_id = ?`;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0].totalEmotionResults); // 카운트 결과 반환
  });
};

module.exports = {
  saveEmotionAnalysis,
  getEmotionAnalysisByDiaryId,
  countEmotionAnalysisByUserId,
};
