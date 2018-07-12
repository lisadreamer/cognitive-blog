import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CommentCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                postId: this.props.postId,
                content: this.state.content
            }
        }).then(() => {});
        this.setState({content: ''});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add comment:</label>
                <input value={this.state.content}
                onChange={event => this.setState({content: event.target.value})} />
            </form>
        );
    }
}

const mutation = gql`
    mutation addcomment($postId: ID, $content: String){
        addCommentToPost(postId: $postId, content: $content) {
            id
            comments {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(CommentCreate);