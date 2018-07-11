import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory} from 'react-router';
import fetchPosts from '../queries/fetchPosts';

class PostCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', content: ''};
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title,
                content: this.state.content
            },refetchQueries: [{query: fetchPosts}]
        }).then(() => hashHistory.push('/'))
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create new post</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Post title:</label>
                    <input 
                    onChange={event => this.setState({title: event.target.value})}
                    value={this.state.title}
                    />
                    <label>Content:</label>
                    <input 
                    onChange={event => this.setState({content: event.target.value})}
                    value={this.state.content}
                    />
                    <input type="submit" value="Post" className="waves-effect waves-light btn"/>
                </form>
            </div>
        );
    }
};

const mutation = gql`
mutation addPost($title: String, $content: String) {
    addPost(title: $title, content: $content) {
        title
        content
    }
  }
`;

export default graphql(mutation)(PostCreate);