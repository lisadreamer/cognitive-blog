import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CommentList extends Component {
    onLike(id, likes) {
        this.props.mutate({
            variables: {id},
            optimisticResponse: {
                __typename: 'Mutation',
                likeComment: {
                    __typename: 'CommentType',
                    id: id,
                    likes: likes + 1
                }
            }
        })
    }

    renderComments() {
        return this.props.comments.map(({id, content, likes}) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="comment-likes">
                        <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
                        <span>{likes}</span>
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="collection">
                {this.renderComments()}
            </ul>
        );
    }
}

const mutation = gql`
    mutation like($id: ID) {
        likeComment(id: $id) {
            id 
            likes
        }
    }
`;

export default graphql(mutation)(CommentList);