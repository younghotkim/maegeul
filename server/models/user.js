const bcrypt = require("bcrypt");
const connection = require("../db"); // MySQL 연결

// 카카오 로그인 로직
exports.handleKakaoLogin = async (profile, cb = () => {}) => {
  try {
    const kakaoId = profile.id;
    const email = profile._json.kakao_account.email; // 카카오에서 제공한 이메일
    const nickname = profile.displayName;
    const profileImage = profile._json.properties.profile_image;

    // 이메일로 먼저 사용자 찾기
    this.findByEmail(email, (err, existingUser) => {
      // `this`를 사용하여 같은 파일 내 함수 참조
      if (err) return cb(err);

      if (existingUser) {
        // 이메일이 이미 존재하는 경우, 로그인 처리
        console.log("기존 이메일로 로그인 처리");
        return cb(null, existingUser); // 기존 사용자로 로그인
      }

      // 이메일이 없는 경우, 카카오 ID로 사용자 찾기
      this.findByKakaoId(kakaoId, (err, existingKakaoUser) => {
        if (err) return cb(err);

        if (existingKakaoUser) {
          // 카카오 ID로 기존 사용자 발견, 로그인 처리
          console.log("기존 카카오 ID로 로그인 처리");
          return cb(null, existingKakaoUser);
        }

        // 새로운 사용자 회원가입
        const newUser = {
          kakao_id: kakaoId,
          email: email || `kakao_${kakaoId}@example.com`, // 이메일이 없을 경우 기본값 설정
          username: nickname || "카카오유저",
          profile_name: nickname,
          profile_picture: profileImage,
          login_type: "kakao",
        };

        this.insert(newUser, (err, userId) => {
          if (err) return cb(err);

          newUser.user_id = userId; // 새로 생성된 userId를 추가
          console.log("새로운 사용자로 회원가입 후 로그인 처리");
          return cb(null, newUser); // 새로운 사용자로 로그인 처리
        });
      });
    });
  } catch (error) {
    return cb(error); // 에러 처리
  }
};

// 이메일로 사용자 찾기 (findByEmail 함수)
exports.findByEmail = (email, callback = () => {}) => {
  const sql = `SELECT * FROM User WHERE email = ? LIMIT 1`;
  connection.query(sql, [email], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result[0]); // 이메일로 찾은 사용자 반환
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
  const sql = `INSERT INTO User (kakao_id, email, profile_name, username, login_type, profile_picture) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [
      data.kakao_id,
      data.email,
      data.profile_name,
      data.username,
      data.login_type,
      data.profile_picture,
    ],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result.insertId); // 새로 생성된 사용자 ID 반환
    }
  );
};

// 회원가입 정보 입력
exports.insert = async (data, cb = () => {}) => {
  try {
    let hashedPassword = null;

    // 비밀번호가 있을 때만 해시, 카카오 로그인 등 비밀번호가 없는 경우 null 유지
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const sql = `INSERT INTO User (username, email, profile_name, password, age, gender, login_type, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      sql,
      [
        data.username || data.profile_name, // username이 없으면 profile_name 사용
        data.email,
        data.profile_name,
        hashedPassword, // 비밀번호가 없는 경우 NULL로 저장
        data.age || null, // 나이가 없으면 null 저장
        data.gender || null, // 성별이 없으면 null 저장
        data.login_type || "local", // 기본값 'local'
        data.profile_picture || null, // 프로필 사진이 없으면 null 저장
      ],
      (err, rows) => {
        if (err) {
          return cb(err); // 에러 발생 시 콜백으로 에러 전달
        }
        cb(null, rows.insertId); // 성공 시 생성된 user_id 반환
      }
    );
  } catch (error) {
    cb(error); // 에러 처리
  }
};

// 로그인 정보 읽기 (로그인 시 비밀번호 비교)
exports.select = (email, password, cb = () => {}) => {
  const sql = `SELECT * FROM User WHERE email = ? LIMIT 1`;

  connection.query(sql, [email], async (err, rows) => {
    if (err) {
      console.error("Database query failed:", err);
      return cb(err); // 에러 처리
    }

    if (rows.length === 0) {
      return cb(null, null); // 사용자가 없을 경우 null 반환
    }

    const user = rows[0];

    try {
      // DB에서 가져온 해시된 비밀번호와 클라이언트에서 받은 평문 비밀번호를 비교
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        cb(null, user); // 비밀번호가 일치하면 사용자 반환
      } else {
        cb(null, null); // 비밀번호가 일치하지 않으면 null 반환
      }
    } catch (err) {
      console.error("Password comparison failed:", err);
      return cb(err); // 에러 처리
    }
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
