import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchPosts from '../queries/fetchPosts';

class PostList extends Component {

    renderPosts() {
        return this.props.data.posts.map(post => {
            return (
                <li key={post.id} className="collection-item">
                    {post.title}
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

export default graphql(fetchPosts)(PostList);