
# 📚 Read me and Lead me <릿미>

## 🌟 프로젝트 주제 선정
- **셀프 탐색**부터 **보완점 진단**, 이에 대한 **글쓰기 지원**하는 웹 서비스

<br/>

## 🗓️ 작업 기간 및 형태
- **작업 기간** : 24.07.19 - 24.09.30
- **형태** : 단단한 '나'를 만들기 위한 쉬운 글쓰기 플랫폼

---

## 👥 프로젝트 팀원

- **서비스 개발자(풀스택)**: 김영하
- **서비스 개발자(프론트)**: 박세양

---

## 📁 폴더 구조

```
MAEGEUL/
│
├── client/                     # 프론트엔드 소스 코드
│   ├── components/             # UI 컴포넌트
│   ├── pages/                  # 페이지 컴포넌트
│   ├── store/                  # 전역 상태 관리 (예: Redux)
│   ├── App.css
│   ├── App.styles.ts
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│
├── server/                    # 백엔드 관련 폴더
│   ├── controllers/            # 라우트 핸들러
│   │   └── User.controller.js  # 사용자 관련 컨트롤러
│   ├── models/                 # Mongoose 모델
│   │   └── User.js             # 사용자 스키마 정의
│   ├── routes/                 # API 라우트
│   │   └── User.api.js         # 사용자 관련 API 라우트
│   ├── .env                    # 환경 변수 파일
│   └── server.js               # Express 서버 엔트리 포인트
│
├── node_modules/               # 프론트엔드 의존성 (프론트엔드와 백엔드의 의존성을 분리할 수 있음)
│
├── public/                     # 정적 파일 (예: index.html)
├── .gitignore
├── package-lock.json           # 프론트엔드 의존성 관리
├── package.json                # 프론트엔드 의존성 관리
├── README.md
├── tailwind.config.js
└── tsconfig.json

```

---

## 💻 GIT 규칙 - commit, branch

💡 가급적 아래 가이드라인에 따라 개발을 진행해주세요.

### 📝 Commit 규칙

📢 커밋 메시지 작성 방식은 개인마다 차이가 있어 굳이 아래 내용을 따르지 않아도 좋습니다. 단, 내용을 알 수 있도록 `이슈타입: 세부 설명` 구조를 지켜주세요 😊

- ⭕ `코드수정 : 로그인 코드 수정`, `replace : 로고 교체`, `북마크 조회 EndPoint 변경`
- ❌ `aaa`, `엔드포인트 변경`, `기능 완성`

#### 커밋 메시지 유형:

- **`Feat`**: 새로운 기능을 추가할 경우
- **`Add`**: 새로운 파일을 추가한 경우
- **`Update`**: 기능, 코드를 수정한 경우
- **`Fix`**: 버그를 고친 경우
- **`Remove`**: 파일을 삭제하는 작업만 수행한 경우
- **`Rename`**: 파일 및 폴더명을 수정하거나 옮긴 경우
- **`Chore`**: 패키지 매니저를 설정하는 경우 (예: `npm i ~` 로 package.json 변경된 경우)

### 🌿 Branch 컨벤션

1. 매주 토요일 **`master branch`**에 merge 
2. 기능(feature)별로 작성 (예시 : `back/jm_login`)
3. **`feature`**는 **`dev`**로부터 분기
4. 완성된 **`feature`**는 **`dev`**에 병합

---
