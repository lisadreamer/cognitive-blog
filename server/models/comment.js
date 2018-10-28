const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
  usePushEach: true
}

const CommentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
}, options);

CommentSchema.statics.like = function(id) {
  const Comment = mongoose.model('comment');

  return Comment.findById(id)
    .then(comment => {
      ++comment.likes;
      return comment.save();
    })
}

mongoose.model('comment', CommentSchema);
