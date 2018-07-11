import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchPosts from '../queries/fetchPosts';

class PostList extends Component {
    onPostDelete(id) {
        this.props.mutate({
            variables: {
                id
            }
        }).then(() => this.props.data.refetch());
    }

    renderPosts() {
        return this.props.data.posts.map(post => {
            return (
                <li key={post.id} className="collection-item">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    <i className="material-icons" onClick={() => this.onPostDelete(post.id)}>delete</i>
                </li>
            ) 
        })
    }

    render() {
        if (this.props.data.loading) { return <div>Loading</div>}
        return (
            <div>
                <ul className="collection">
                    {this.renderPosts()} 
                </ul>
                <Link 
                    to="/posts/create"
                    className="btn-floating btn-large red right"
                >
                <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation delPost($id: ID) {
        deletePost(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(fetchPosts)(PostList)
);