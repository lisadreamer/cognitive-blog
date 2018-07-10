import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class PostList extends Component {

    renderPosts() {
        return this.props.data.posts.map(post => {
            return (
                <li>
                    {post.title}
                </li>
            ) 
        })
    }
    render() {
        if (this.props.data.loading) { return <div>Loading</div>}
        return (
            <div>
                {this.renderPosts()} 
            </div>
        );
    }
}

const query = gql`
{
    posts {
        title
    }
}
`;

export default graphql(query)(PostList);