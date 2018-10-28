const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
    usePushEach: true
}

const PostSchema = new Schema({
  title  : { type: String },
  content: { type: String },
  img    : { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
}, options);

PostSchema.statics.addComment = function(id, content) {
  const Comment = mongoose.model('comment');

  return this.findById(id)
    .then(post => {
      const comment = new Comment({ content, post })
      post.comments.push(comment)
      return Promise.all([comment.save(), post.save()])
        .then(([comment, post]) => post);
    });
}

PostSchema.statics.getComments = function(id) {
  return this.findById(id)
    .populate('comments')
    .then(post => post.comments);
}

mongoose.model('post', PostSchema);
