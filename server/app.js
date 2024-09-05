const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

// 라우트 파일들
const userApi = require('./routes/User.api');
const authRoutes = require('./routes/auth');
const analyzeRoute = require('./routes/analyze');

dotenv.config();

const app = express();

// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.json()); // JSON 요청 처리

// MongoDB 연결
mongoose
    .connect(process.env.MONGODB_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongoose connected'))
    .catch((err) => console.log('DB connection failed:', err));

// 세션 설정
app.use(session({
    secret: 'yourSecretKey', // 환경 변수로 설정하는 것이 좋음
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // 로컬 개발에서는 false, 프로덕션에서는 true
}));

// Passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session());

// 라우트 설정
app.use('/users', userApi);         // 사용자 관련 API
app.use('/auth', authRoutes);       // 인증 관련 API
app.use('/api/analyze', analyzeRoute); // AI 감정 분석 API

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Kakao 인증 콜백 처리
app.get('/auth/kakao/callback', passport.authenticate('kakao', { session: false }), (req, res) => {
    const { token } = req.user;
    res.redirect(`http://localhost:3000/login/success?token=${token}`);
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
