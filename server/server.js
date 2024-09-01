const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS 패키지 가져오기
const analyzeRoute = require('./routes/analyze');

dotenv.config();

const app = express();

// CORS 설정
app.use(cors());

app.use(express.json());

app.use('/api/analyze', analyzeRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
