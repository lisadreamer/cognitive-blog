import gql from 'graphql-tag';

export default gql`
    query getPost($id: ID!) {
        post(id: $id) {
            id
            title
            content
            comments {
                id
                content
                likes
            }
        }
    }
`;