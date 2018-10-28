import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchPosts from '../queries/fetchPosts';

import headerImg from '../style/img/brain2.jpg';
import neuronImg1 from '../style/img/neurons1.jpg';

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
            const imgSrc = post.img || neuronImg1;
            return (
                <li key={post.id} className="collection-item">
                    <Link to={`/posts/${post.id}`}><img src={imgSrc} /><p>{post.title}</p></Link>
                    <i className="material-icons" onClick={() => this.onPostDelete(post.id)}>delete</i>
                </li>
            )
        })
    }

    render() {
        if (this.props.data.loading) { return <div>Loading</div>}
        return (
            <div>
                <div className="header">
                    <div className="logo-box">
                        <div className="logo"></div>
                    </div>
                    <img src={headerImg} className="bg-img"/>
                    <div className="text-box">
                        <h1 className="heading-primary">
                            <span className="heading-primary-main">Exploring Mind</span>
                            <span className="heading-primary-sub">popular science</span>
                        </h1>
                    </div>
                </div>
                <div className="container">
                    <h4>This week articles</h4>
                    <ul className="collection post-list">
                        {this.renderPosts()}
                    </ul>
                    <Link
                        to="/posts/create"
                        className="btn-floating btn-large red right"
                    >
                    <i className="material-icons">add</i>
                    </Link>
                </div>
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
