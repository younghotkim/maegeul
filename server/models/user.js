const bcrypt = require("bcrypt");
const connection = require("../db"); // MySQL 연결

// 회원가입 정보 입력
exports.insert = async (data, cb) => {
  try {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const sql = `INSERT INTO User (username, email, profile_name, password, age, gender, login_type, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      sql,
      [
        data.username,
        data.email,
        data.profile_name,
        hashedPassword,
        data.age,
        data.gender,
        data.login_type || "local", // 기본값 'local'
        data.profile_picture,
      ],
      (err, rows) => {
        if (err) {
          return cb(err); // 에러 발생 시 콜백으로 에러 전달
        }
        cb(null, rows.insertId); // 성공 시 생성된 user_id 반환
      }
    );
  } catch (error) {
    cb(error); // 암호화 중 에러 발생 시 에러 처리
  }
};

// 로그인 정보 읽기 (로그인 시 비밀번호 비교)
exports.select = (email, password, cb) => {
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
exports.get_user = (user_id, cb) => {
  const sql = `SELECT * FROM User WHERE user_id = ? LIMIT 1`;

  connection.query(sql, [user_id], (err, rows) => {
    if (err) {
      return cb(err); // 에러 처리
    }
    cb(null, rows[0]); // 사용자 정보 반환
  });
};

// 회원 정보 수정
exports.update = async (data, cb) => {
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
exports.delete = (user_id, cb) => {
  const sql = `DELETE FROM User WHERE user_id = ?`;

  connection.query(sql, [user_id], (err, rows) => {
    if (err) {
      return cb(err); // 에러 처리
    }
    cb(null, rows); // 삭제된 사용자 정보 반환
  });
};
