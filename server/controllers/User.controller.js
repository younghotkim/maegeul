// LEADME/backend/controllers/userController.js
// 이 파일에서는 회원 생성과 로그인 로직을 구현 
// 각각의 요청을 처리하고, 적절한 응답을 클라이언트에게 반환하는 함수
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// 회원 생성
exports.createUser = async (req, res) => {
    console.log("회원생성")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, nickname, email, password } = req.body;

    try {
        // 이메일 중복 확인
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "이미 등록된 이메일입니다." });
        }

        // 새 사용자 생성
        user = new User({
            name,
            nickname,
            email,
            password
        });

        // 사용자 저장
        await user.save();
        res.status(201).json({ msg: "회원가입 성공!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("서버 오류");
    }
};

// 로그인
exports.loginUser = async (req, res) => {
    console.log("test1");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("test2");

    const { email, password } = req.body;
    console.log("test3",email, password);
    try {
        // 사용자 확인
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "잘못된 이메일 또는 비밀번호" });
        }
        console.log("test4", user);
        // 비밀번호 확인
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: "잘못된 이메일 또는 비밀번호" });
        }

        // JWT 토큰 생성
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("test5", payload, token);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("서버 오류");
    }
};