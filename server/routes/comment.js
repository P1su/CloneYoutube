const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

const { auth } = require('../middleware/auth');

router.post('/saveComment', async (req, res) => {
  try {
    const comment = new Comment(req.body);

    const savedComment = await comment.save();

    const result = await Comment.find({ _id: savedComment._id })
      .populate('writer')
      .exec();

    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

router.get(`/getComments/:videoId`, async (req, res) => {
  try {
    const videoId = req.params.videoId;

    const comments = await Comment.find({ postId: videoId })
      .populate('writer')
      .exec();

    return res.status(200).json({ success: true, comments });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
