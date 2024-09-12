const express = require("express");
const router = express.Router();
const connection = require("../db");

// 사용자 정보 불러오기 API
router.get("/profile/:userId", (req, res) => {
  res.set("Cache-Control", "no-store"); // 캐시 무효화
  const userId = req.params.userId; // 요청에서 userId를 가져옴
  const query = "SELECT profile_name FROM User WHERE user_id = ?";

  // MySQL 쿼리 실행
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error executing query: ", error);
      res.status(500).json({ error: "Error executing query" });
      return;
    }

    if (results.length > 0) {
      // 프로필 이름 반환
      res.json(results[0]); // { profile_name: "..." } 형태로 반환
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

module.exports = router;
