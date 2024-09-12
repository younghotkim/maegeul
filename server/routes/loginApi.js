const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../db"); // MySQL 연결
const jwt = require("jsonwebtoken"); // JWT 토큰 생성
const router = express.Router();
require("dotenv").config(); // 환경 변수 로드

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received with email:", email);

  // 데이터베이스에서 사용자 찾기
  const query = "SELECT * FROM User WHERE email = ?";
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error("Database query failed:", error); // 쿼리 실패 로그 출력
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      console.warn("User not found:", email); // 사용자 없음 경고 로그
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];

    // 비밀번호 확인
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison failed:", err); // 비밀번호 비교 실패 로그 출력
        return res.status(500).json({ error: "Password comparison failed" });
      }

      if (!isMatch) {
        console.warn("Invalid password attempt for user:", email); // 비밀번호 불일치 경고 로그
        return res.status(401).json({ error: "Invalid password" });
      }

      // JWT 토큰 발급
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("Login successful for user:", user.profile_name); // 성공 로그 출력
      // 로그인 성공 응답
      res.json({
        message: "Login successful",
        token,
        profile_name: user.profile_name,
      });
    });
  });
});

module.exports = router;
