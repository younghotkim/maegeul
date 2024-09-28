const crypto = require("crypto");

// 암호화 설정
const algorithm = "aes-256-cbc";

// 암호화 함수
function encrypt(text, encryptionKey) {
  const iv = crypto.randomBytes(16); // 초기화 벡터 생성
  const keyBuffer = Buffer.from(encryptionKey, "hex"); // 암호화 키를 Buffer 형식으로 변환
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv); // Buffer로 변환된 키 사용
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // IV와 암호화된 내용을 같이 반환
}

// 복호화 함수
function decrypt(encryptedText, encryptionKey) {
  const textParts = encryptedText.split(":"); // IV와 암호화된 텍스트 분리
  const iv = Buffer.from(textParts.shift(), "hex"); // 앞부분에서 IV 추출
  const encryptedContent = Buffer.from(textParts.join(":"), "hex"); // 나머지 암호화된 텍스트 추출
  const keyBuffer = Buffer.from(encryptionKey, "hex"); // 암호화 키를 Buffer 형식으로 변환

  // 암호화와 동일한 방식으로 복호화 수행
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
  let decrypted = decipher.update(encryptedContent);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString(); // 복호화된 텍스트 반환
}

// PBKDF2를 사용한 암호화 키 생성
// 암호화 키 생성 (PBKDF2)
function generateEncryptionKey(password, salt) {
  const iterations = 100000;
  const keyLength = 32; // 256 bits (32 bytes)
  const digest = "sha256";
  return crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest); // Buffer로 반환
}

// 카카오 암호화키 생성 (PBKDF2)
function generateEncryptionKey(kakaoId, salt) {
  // AES-256 requires a 32-byte key
  return crypto
    .pbkdf2Sync(kakaoId.toString(), salt, 10000, 32, "sha512")
    .toString("hex");
}

// 랜덤 Salt 생성
function generateRandomSalt() {
  return crypto.randomBytes(16).toString("hex");
}

module.exports = {
  encrypt,
  decrypt,
  generateEncryptionKey,
  generateRandomSalt,
};
