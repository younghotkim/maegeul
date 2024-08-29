// routes/analyze.js
const express = require('express');
const { analyzeEmotion } = require('../controllers/analyzeController'); // 올바른 경로로 임포트하고 있는지 확인
const router = express.Router();

router.post('/', analyzeEmotion); // analyzeEmotion이 함수로 전달되는지 확인

module.exports = router;
