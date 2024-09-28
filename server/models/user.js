const bcrypt = require("bcrypt");
const connection = require("../db"); // MySQL 연결
const {
  generateEncryptionKey,
  generateRandomSalt,
} = require("../util/encrypt");
const crypto = require("crypto");

// 카카오 로그인 로직
// 카카오 로그인 시 암호화 키 생성
exports.handleKakaoLogin = async (profile, cb = () => {}) => {
  try {
    const kakaoId = profile.id;
    const email = profile._json.kakao_account.email;
    const nickname = profile.displayName;
    const profileImage = profile._json.properties.profile_image;

    // 기존 사용자 검색 후 없으면 회원가입
    this.findByKakaoId(kakaoId, (err, existingKakaoUser) => {
      if (err) return cb(err);
      console.log("카카오 로그인");

      if (existingKakaoUser) {
        return cb(null, existingKakaoUser);
      }

      // 새로운 사용자 생성
      const salt = generateRandomSalt(); // 랜덤 Salt 생성
      const encryptionKey = generateEncryptionKey(kakaoId, salt); // 암호화 키 생성

      const newUser = {
        kakao_id: kakaoId,
        email: email || `kakao_${kakaoId}@example.com`,
        username: nickname || "카카오유저",
        password: kakaoId,
        profile_name: nickname,
        profile_picture: profileImage,
        login_type: "kakao",
        salt: salt, // 암호화 키 생성에 사용한 salt 저장
      };

      this.insert(newUser, (err, userId) => {
        if (err) return cb(err);

        newUser.user_id = userId;
        return cb(null, newUser); // 사용자 생성 후 로그인 처리
        console.log("새로운 카카오 사용자");
      });
    });
  } catch (error) {
    return cb(error);
  }
};

// userModel.js 파일에서 사용자 정보 조회 함수
exports.findByEmail = (email, callback) => {
  const sql = `SELECT * FROM User WHERE email = ? LIMIT 1`;

  connection.query(sql, [email], (err, result) => {
    if (err) {
      return callback(err, null); // 에러 발생 시 콜백으로 에러 전달
    }

    if (result.length === 0) {
      return callback(null, null); // 사용자가 없으면 null 반환
    }

    return callback(null, result[0]); // 첫 번째 사용자 정보 반환
  });
};

// 카카오 ID로 사용자 찾기 (findByKakaoId 함수)
exports.findByKakaoId = (kakaoId, callback = () => {}) => {
  const sql = `SELECT * FROM User WHERE kakao_id = ? LIMIT 1`;
  connection.query(sql, [kakaoId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result[0]); // 카카오 ID로 찾은 사용자 반환
  });
};

// 새로운 사용자 추가 (insert 함수)
exports.insert = (data, callback = () => {}) => {
  const sql = `INSERT INTO User (kakao_id, email, profile_name, password, username, login_type, profile_picture, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [
      data.kakao_id,
      data.email,
      data.profile_name,
      data.password,
      data.username,
      data.login_type,
      data.profile_picture,
      data.salt,
    ],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result.insertId); // 새로 생성된 사용자 ID 반환
    }
  );
};

// 회원가입 시 사용자 정보를 DB에 저장하는 로직
exports.insertUser = async (data, cb = () => {}) => {
  try {
    // salt 생성
    const salt = crypto.randomBytes(16).toString("hex");
    // PBKDF2를 사용한 비밀번호 해싱
    const hashedPassword = crypto
      .pbkdf2Sync(data.password, salt, 10000, 64, "sha512")
      .toString("hex");

    console.log("user_model: Generated salt:", salt);
    console.log("user_model: Hashed password:", hashedPassword); // 해시된 비밀번호 출력

    const sql = `INSERT INTO User (username, email, profile_name, password, salt, age, gender, login_type, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      sql,
      [
        data.username,
        data.email,
        data.profile_name,
        hashedPassword, // 해시된 비밀번호
        salt, // 생성된 salt 저장
        data.age || null,
        data.gender || null,
        data.login_type || "local",
        data.profile_picture || null,
      ],
      (err, rows) => {
        if (err) {
          return cb(err); // 에러 발생 시 콜백으로 에러 전달
        }
        cb(null, rows.insertId); // 성공 시 생성된 user_id 반환
      }
    );
  } catch (error) {
    cb(error);
  }
};

exports.select = (email, password, cb = () => {}) => {
  const sql = `SELECT * FROM User WHERE email = ? LIMIT 1`;

  connection.query(sql, [email], (err, rows) => {
    if (err) {
      console.error("Database query failed:", err);
      return cb(err); // 에러 처리
    }

    if (rows.length === 0) {
      return cb(null, null); // 사용자가 없을 경우 null 반환
    }

    const user = rows[0];

    // 로그로 확인하기
    console.log("User's salt from DB:", user.salt); // 저장된 salt 출력

    // 만약 user.salt가 null이라면 여기서 중단
    if (!user.salt) {
      return cb(new Error("Salt 값이 null입니다."));
    }

    // 저장된 salt를 사용해 입력된 비밀번호를 다시 해싱
    const hashedInputPassword = crypto
      .pbkdf2Sync(password, user.salt, 10000, 64, "sha512")
      .toString("hex");

    //const salt = crypto.randomBytes(16).toString("hex");
    // PBKDF2를 사용한 비밀번호 해싱

    console.log("로그인 Stored password:", user.password); // 저장된 해싱된 비밀번호
    console.log("로그인 Hashed input password:", hashedInputPassword); // 입력된 비밀번호 해싱 결과

    // 해싱된 비밀번호가 일치하는지 비교
    if (hashedInputPassword === user.password) {
      cb(null, user); // 비밀번호가 일치하면 사용자 반환
    } else {
      cb(null, null); // 비밀번호가 일치하지 않으면 null 반환
    }
  });
};

exports.getUserPasswordAndSalt = (user_id, callback) => {
  const sql = `SELECT password, salt FROM User WHERE user_id = ? LIMIT 1`;
  connection.query(sql, [user_id], (err, result) => {
    console.log("쿼리 실행 확인");

    if (err) {
      console.error("DB 오류 발생:", err);
      return callback(err, null); // DB 오류 발생 시 콜백으로 에러 전달
    }

    if (!result || result.length === 0) {
      console.log("사용자 조회 실패");
      return callback(new Error("사용자를 찾을 수 없습니다."), null); // 사용자를 찾지 못한 경우
    }

    console.log("사용자 정보 조회 성공");
    callback(null, { password: result[0].password, salt: result[0].salt }); // 성공 시 비밀번호와 salt 반환
  });
};

// 회원 정보 조회 (ID로 사용자 정보 가져오기)
exports.get_user = (user_id, cb = () => {}) => {
  const sql = `SELECT * FROM User WHERE user_id = ?`;

  connection.query(sql, [user_id], (err, rows) => {
    if (err) {
      return cb(err); // 에러 처리
    }
    cb(null, rows[0]); // 사용자 정보 반환
  });
};

// 회원 정보 수정
exports.update = async (data, cb = () => {}) => {
  try {
    // 비밀번호가 수정된 경우에만 암호화
    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : null;

    const sql = `UPDATE User SET username = ?, email = ?, profile_name = ?, password = ?, age = ?, gender = ?, login_type = ?, profile_picture = ? WHERE user_id = ?`;

    connection.query(
      sql,
      [
        data.username,
        data.email,
        data.profile_name,
        hashedPassword || data.password, // 비밀번호가 수정되지 않으면 기존 비밀번호 유지
        data.age,
        data.gender,
        data.login_type,
        data.profile_picture,
        data.user_id,
      ],
      (err, rows) => {
        if (err) {
          return cb(err); // 에러 처리
        }
        cb(null, rows); // 수정된 사용자 정보 반환
      }
    );
  } catch (error) {
    cb(error); // 암호화 중 에러 발생 시 처리
  }
};

// 회원 탈퇴
exports.delete = (user_id, cb = () => {}) => {
  const sql = `DELETE FROM User WHERE user_id = ?`;

  connection.query(sql, [user_id], (err, rows) => {
    if (err) {
      return cb(err); // 에러 처리
    }
    cb(null, rows); // 삭제된 사용자 정보 반환
  });
};
