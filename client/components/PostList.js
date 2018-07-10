import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class PostList extends Component {
    render() {
        
        return (
            <div>
                Posts 
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