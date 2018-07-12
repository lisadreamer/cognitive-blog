import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CommentList extends Component {
    renderComments() {
        return this.props.comments.map(({id, content}) => {
            return (
                <li key={id} className="collection-item">{content}</li>
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

export default CommentList;