const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const CommentType = require('./comment_type');
const Post = mongoose.model('post');

const PostType = new GraphQLObjectType({
  name:  'PostType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Post.getComments(parentValue.id);
      }
    }
  })
});

module.exports = PostType;
