const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    // console.log('password changed')
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err); // 오류가 발생하면 reject
      }
      resolve(isMatch); // 일치하면 resolve
    });
  });
};

userSchema.methods.generateToken = async function () {
  const user = this;
  console.log('user', user);
  console.log('userSchema', userSchema);

  // 토큰 생성
  const token = jwt.sign(user._id.toHexString(), 'secret');
  const oneHour = moment().add(1, 'hour').valueOf();

  // 토큰과 만료 시간 설정
  user.tokenExp = oneHour;
  user.token = token;

  // save() 메서드를 Promise 기반으로 사용
  try {
    const savedUser = await user.save(); // await 사용
    return savedUser; // 저장된 사용자 반환
  } catch (err) {
    throw err; // 오류 발생 시 예외 처리
  }
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, 'secret', function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
