// project/backend/models/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs"); // 비밀번호 암호화 라이브러리

// 데이터테이블 컬럼 설계
const userSchema = new Schema({
    name: { type: String, required: true }, // 이름
    nickname: { type: String, required: true }, // 닉네임
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    }, // 이메일
    password: { 
        type: String, 
        required: true 
    } // 비밀번호
}, { timestamps: true });

// 비밀번호 해싱 미들웨어
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// 비밀번호 확인 메소드
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;