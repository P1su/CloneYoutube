const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

const { auth } = require('../middleware/auth');

//=================================
//             User
//=================================

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post('/register', (req, res) => {
  const user = new User(req.body);

  // save() 메서드를 Promise 기반으로 사용
  user
    .save()
    .then((doc) => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

router.post('/login', async (req, res) => {
  try {
    // 이메일로 사용자 찾기
    const user = await User.findOne({ email: req.body.email });

    // 사용자가 없다면 로그인 실패
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });

    // 비밀번호 확인
    const isMatch = await user.comparePassword(req.body.password);

    // 비밀번호가 맞지 않으면 로그인 실패
    if (!isMatch)
      return res.json({ loginSuccess: false, message: 'Wrong password' });

    // 토큰 생성
    const token = await user.generateToken();

    // 토큰과 만료 시간을 쿠키에 저장
    res.cookie('w_authExp', user.tokenExp);
    res.cookie('w_auth', token).status(200).json({
      loginSuccess: true,
      userId: user._id,
      token: token,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
