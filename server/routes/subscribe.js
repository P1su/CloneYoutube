const express = require('express');
const router = express.Router();

const { Subscriber } = require('../models/Subscriber');

const { auth } = require('../middleware/auth');

//=================================
//             Subscribe
//=================================

// 구독자 수 가져오기
router.post('/subscribeNumber', async (req, res) => {
  try {
    const subscribe = await Subscriber.find({ userTo: req.body.userTo });
    res.status(200).json({ success: true, subscribeNumber: subscribe.length });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 구독 상태 확인
router.post('/subscribed', async (req, res) => {
  try {
    const subscribe = await Subscriber.find({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    });

    const result = subscribe.length !== 0;

    res.status(200).json({ success: true, subcribed: result });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 구독하기
router.post('/subscribe', async (req, res) => {
  try {
    const subscribe = new Subscriber(req.body);
    await subscribe.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

// 구독 취소하기
router.post('/unSubscribe', async (req, res) => {
  try {
    const doc = await Subscriber.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    });

    res.status(200).json({ success: true, doc });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

module.exports = router;
