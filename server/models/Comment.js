const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: String,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
