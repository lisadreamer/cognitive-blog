import gql from 'graphql-tag';

export default gql`
{
    posts {
        id
        title
        img
    }
}
`;
