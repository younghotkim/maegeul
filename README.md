# ✍️ 하루 5분 마음챙김 글쓰기 플랫폼, <매글>

![home1](https://github.com/user-attachments/assets/a835cbef-33c1-42ad-b30c-621b2eed3483)

## 🌟 프로젝트 서비스 목표

- **셀프 탐색**부터 **보완점 진단**, 이에 대한 **글쓰기 지원**하는 웹 서비스

![slider](https://github.com/user-attachments/assets/191eb6a2-5895-478b-8a44-fc77c3bb91b4)


- 기분 수치 측정을 통한 무드 컬러 추출과 감정 일기 작성을 통해 자신의 감정을 더욱 자세히 느끼고 글로 표현할 수 있도록 도와줌. 이러한 경험을 바탕으로 자기 이해 및 자아 효능감을 증진시키고자 함.
  
![moodmeter](https://github.com/user-attachments/assets/03195c7b-4e35-4349-8efb-b32c2bd1b889)

![writing](https://github.com/user-attachments/assets/af3dfb18-33c3-416f-bb98-3985adc57970)

![aianalysis](https://github.com/user-attachments/assets/6a8488ae-ab81-49f5-b176-fc3789636042)




- 일상의 스트레스에 효과적으로 대처할 수 있고, 부정 감정을 해소하는 방법을 익히며 자신의 감정을 조절하고 더 나은 방향으로 개선해 나갈 수 있도록 안내함. 이러한 사용 경험이 사용자의 정서 건강과 편안한 일상 구축에 기여할 수 있음.
  
![dashboard_maeguel](https://github.com/user-attachments/assets/82871860-960c-46af-9193-71e9bc4f8180)

![diary](https://github.com/user-attachments/assets/328c08fd-fb0d-42b0-96e2-0438ee8ba2ad)


## 🗓️ 작업 기간 및 주요기능

- **작업 기간** : 24.07.19 - 24.09.30
- **형태** : 단단한 '나'를 만들기 위한 쉬운 글쓰기 플랫폼
- **기분 수치 측정 기능** :
- 사용자가 매일 자신의 감정을 기록하면 이를 바탕으로 무드컬러를 추출해주어 감정의 상태를 시각화하여 파악할 수 있음. 이를 통해 사용자는 자신의 감정을 보다 상세히 이해할 수 있고, 이를 바탕으로 더 나은 감정 관리 방법을 찾아갈 수 있다.
- **감정일기 AI 분석 기능** :
- 사용자는 기분 수치 측정 및 감정 키워드 파악을 통해 자신의 감정 상태를 조금 더 자세히 이해한 다음, 이를 바탕으로 일기를 작성한다. 이때 작성한 글을 자사 AI봇인 '무디타봇'에게 분석 요청(하루 감정 가이드)할 경우, AI가 사용자의 글 속에서 느껴지는 주요 감정 상태를 분석하고 이를 바탕으로 하루를 진단해준다. 또 이때 사용자의 상태 및 기분에 따라 메시지를 전해준다.
- **개인화된 대시보드** :
- 사용자가 작성한 글들과 기록한 감정들이 시간의 흐름에 따라 대시보드에 시각적으로 표시되며, 서비스 이용을 통해 쌓은 감정 기록 및 일기 로그를 한눈에 확인할 수 있다.(이용 통계 및 기분 변화, 긍정 감정 증감률 등) 이 대시보드를 통해 사용자는 보이지 않는 감정과 하루의 일상들을 기록할 수 있게 되고, 변화하는 감정이나 생각들 역시 시각화하여 모아볼 수 있다.

---

## 👥 프로젝트 팀원

- **서비스 개발자(풀스택)**: 김영하
- **서비스 개발자(프론트)**: 박세양
- **서비스 기획자(상위계획)**: 이승연
- **서비스 기획자(하위계획)**: 최성환
- **서비스 기획자(하위계획)**: 김현우

---

## 🚀 기술 스택

### **프론트엔드 (Client)**:

- **React**: `^18.3.1` - 사용자 인터페이스를 구축하는 라이브러리.
- **React Router DOM**: `^6.26.2` - 라우팅을 처리하는 라이브러리.
- **Ant Design (antd)**: `^5.20.2` - UI 컴포넌트 라이브러리.
- **MUI (Material-UI)**: `@mui/material`, `@mui/lab` - UI 요소를 위한 또 다른 라이브러리.
- **Axios**: `^1.7.5` - HTTP 클라이언트로, API 호출에 사용.
- **React-Quill**: `^2.0.0` - 리치 텍스트 에디터.
- **ApexCharts**: `react-apexcharts`, `apexcharts` - 데이터 시각화를 위한 차트 라이브러리.
- **D3 Cloud**: `d3-cloud`, `d3` - 워드 클라우드와 데이터 시각화를 위한 라이브러리.
- **Styled Components**: `^6.1.13` - 컴포넌트 스타일링을 위한 CSS-in-JS 라이브러리.
- **Framer Motion**: `^11.5.6` - 애니메이션 라이브러리.
- **Tailwind CSS**: `^3.4.10` - 유틸리티 기반 CSS 프레임워크.
- **Typescript**: `^4.9.5` - JavaScript에 타입을 추가하는 언어.

### **백엔드 (Server)**:

- **Express**: `^4.17.1` - Node.js 기반 웹 프레임워크.
- **MySQL**: `^2.18.1` - MySQL 데이터베이스를 연결하는 라이브러리.
- **Mongoose**: `^8.6.0` - MongoDB 연결을 위한 ODM.
- **Axios**: `^0.21.1` - 서버에서 API 호출을 처리하기 위한 HTTP 클라이언트.
- **Bcrypt/Bcryptjs**: `^5.1.1`, `^2.4.3` - 비밀번호 해싱을 위한 라이브러리.
- **JWT (jsonwebtoken)**: `^9.0.2` - 토큰 기반 인증을 위한 라이브러리.
- **Multer**: `^1.4.5-lts.1` - 파일 업로드를 처리하는 미들웨어.
- **Passport**: `^0.7.0`, **Passport Kakao**: `^1.0.1` - 인증 및 카카오 로그인.
- **OpenAI**: `^4.56.1` - OpenAI API를 사용한 기능 통합.
- **Crypto**: `^1.0.1` - 데이터를 암호화하고 복호화하는 기능을 제공.

### **빌드 및 개발 도구**:

- **Concurrently**: `^9.0.1` - 프론트엔드와 백엔드 서버를 동시에 실행할 수 있도록 해주는 유틸리티.
- **Nodemon**: `^2.0.22` - 코드 변경 시 서버를 자동으로 재시작하는 도구.

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
