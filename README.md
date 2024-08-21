
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
- **서비스 기획자(상위계획)**: 이승연
- **서비스 기획자(하위계획)**: 최성환
- **서비스 기획자(하위계획)**: 김현우

---

## 📁 폴더 구조

```
# 📂 MAEGEUL

## 📁 /client                   # 프론트엔드 (React TypeScript)
│   ├── 📁 /node_modules         # Node.js 모듈 (자동으로 생성된 폴더)
│   ├── 📁 /public               # 정적 파일 (예: index.html, favicon 등)
│   ├── 📁 /src
│   │   ├── 📁 /assets           # 이미지, 폰트, 기타 에셋
│   │   ├── 📁 /components       # 재사용 가능한 React 컴포넌트
│   │   ├── 📁 /context          # 글로벌 상태 관리를 위한 React 컨텍스트
│   │   ├── 📁 /hooks            # 커스텀 React 훅
│   │   ├── 📁 /services         # API 서비스 및 비즈니스 로직
│   │   ├── 📁 /styles           # 글로벌 스타일 (CSS 또는 SASS)
│   │   ├── 📝 App.tsx           # 메인 React 컴포넌트
│   │   ├── 📝 index.tsx         # React 애플리케이션의 진입점
│   │   ├── 📝 routes.tsx        # 애플리케이션 라우트
│   ├── 📝 README.md             # 클라이언트 문서
│   ├── 📝 package.json          # 프로젝트 종속성 및 스크립트
│   ├── 📝 package-lock.json     # 패키지 잠금 파일
│   └── 📝 tsconfig.json         # 클라이언트의 TypeScript 구성 파일
│
## 📁 /server                   # 백엔드 (Node.js, Express)
│   ├── 📁 /node_modules         # Node.js 모듈 (자동으로 생성된 폴더)
│   ├── 📁 /src
│   │   ├── 📁 /controllers      # Express 라우트 컨트롤러
│   │   ├── 📁 /middleware       # Express 미들웨어 (예: 인증, 검증)
│   │   ├── 📁 /models           # 데이터베이스 모델 (예: Mongoose 스키마)
│   │   ├── 📁 /routes           # Express 라우트
│   │   ├── 📁 /services         # 비즈니스 로직 및 외부 API 호출
│   │   ├── 📁 /utils            # 유틸리티 함수
│   │   ├── 📝 app.ts            # Express 앱 설정
│   │   ├── 📝 server.ts         # Node.js 서버의 진입점
│   ├── 📝 .gitignore            # Git 무시 파일
│   ├── 📝 README.md             # 서버 문서
│   ├── 📝 package.json          # 프로젝트 종속성 및 스크립트
│   ├── 📝 package-lock.json     # 패키지 잠금 파일
│   └── 📝 tsconfig.json         # 서버의 TypeScript 구성 파일
│
## 📁 /config                   # 구성 파일 (예: 환경 변수)
## 📁 /scripts                  # 유틸리티 스크립트 (예: 배포 또는 설정용)
## 📁 /tests                    # 프론트엔드 및 백엔드 테스트 케이스
📝 .gitignore                # Git 무시 파일
📝 README.md                 # 프로젝트 문서
📝 package.json              # 프로젝트 종속성 및 스크립트


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
