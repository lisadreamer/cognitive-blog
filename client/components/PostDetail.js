import React, {Component} from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import fetchPost from '../queries/fetchPost';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

class PostDetail extends Component {
    render() {
        const { post } = this.props.data;

        if (!post) {
            return <div>Loading</div>
        } else {
            return (
                <div className="container">
                    <Link to="/">Back</Link>
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={this.props.params.id} />
                </div>
            );
        }
    }
}

export default graphql(fetchPost, {
    options: (props) => {return {variables: {id: props.params.id} } }
})(PostDetail);