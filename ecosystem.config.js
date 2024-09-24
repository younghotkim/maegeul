module.exports = {
  apps: [
    {
      name: "maegeul",
      script: "./server/app.js", // 서버 실행 파일 경로
      env: {
        // 개발 환경 변수
        NODE_ENV: "development",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        KAKAO_CLIENT_ID: "797e07c746ca1237b813e1799b53977a",
        KAKAO_REDIRECT_URI: "http://localhost:3000/auth/kakao/callback",
        CALLBACK_URL: "http://localhost:3000/kakao/callback",
        PORT: 5000,
        JWT_SECRET: "your_secret_key_here",
        DB_HOST:
          "db-team06-identifier.c9kciawyijr0.ap-northeast-2.rds.amazonaws.com",
        DB_USER: "team06",
        DB_PASSWORD: "qwer1234!",
        DB_NAME: "maegeul",
        DB_PORT: 3306,
      },
      env_production: {
        // 프로덕션 환경 변수
        NODE_ENV: "production",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        KAKAO_CLIENT_ID: "797e07c746ca1237b813e1799b53977a",
        KAKAO_REDIRECT_URI: "https://maegeul.com/auth/kakao/callback",
        CALLBACK_URL: "https://maegeul.com/kakao/callback",
        PORT: 5000,
        JWT_SECRET: "your_secret_key_here",
        DB_HOST:
          "db-team06-identifier.c9kciawyijr0.ap-northeast-2.rds.amazonaws.com",
        DB_USER: "team06",
        DB_PASSWORD: "qwer1234!",
        DB_NAME: "maegeul",
        DB_PORT: 3306,
      },
    },
  ],
};
