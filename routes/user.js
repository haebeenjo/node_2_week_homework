const express = require('express');
const router = express.Router();
const { User } = require('../models');
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookieParser());

// 회원가입
router.post('/signup', async (req, res) => {
    try{
        const { nickname, password, confirm } = req.body;

        if (password !== confirm) {
            res.status(400).json({
            errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
            });
            return;
        }
        const nicknameRegex = /^[a-zA-Z0-9]{3,}$/g;
        if (!nicknameRegex.test(nickname)) {
            return res.status(400).json({ errorMessage: '닉네임 형식이 올바르지 않습니다.' });
        }

        const passwordRegex = /^.{4,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ errorMessage: '패스워드 형식이 올바르지 않습니다.' });
        }

        if (password.match(nickname) !== null ) {
            return res.status(400).json({errorMessage:"Password에 Email이 포함되어 있습니다"})
        }

        const existsUsers = await User.findOne({where: { nickname }});
        if (existsUsers) {
            res.status(400).json({
            errorMessage: '이미 사용중인 닉네임 입니다.',
            });
            return;
        }

        const users = await User.create({ nickname, password });
        res.status(200).json({ users });
    } catch(err) {
        console.log(err)
        res.status(400).json({errorMessage:"회원가입에 실패하였습니다."})
    }
  
});



// 로그인
router.post('/auth', async (req, res) => {
    try{
        const { nickname, password } = req.body;

        const users = await User.findOne({ where: { nickname } });

        if (!users) {
            res.status(400).json({ errorMessage: '닉네임 또는 패스워드를 확인해주세요.' });
            return;
        }

        const accessToken = jwt.sign({ id: users.id }, 
                        "mysecretkey",
                        { expiresIn: "1d" } );

        res.cookie('accessToken', accessToken);

        res.json({ token: accessToken });
    } catch(err) {
        console.log(err)
        res.status(400).json({errorMessage:"로그인에 실패하였습니다."})
    }
  
});

module.exports = router;