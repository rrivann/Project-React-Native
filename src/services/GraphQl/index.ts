import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation MyMutation($email: String!, $name: String!) {
    insert_users(objects: {email: $email, name: $name}) {
      returning {
        email
        id
        name
      }
    }
  }
`;

export const READ_USER = gql`
  query MyQuery {
    users {
      email
      id
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation MyMutation($id: Int!, $email: String!, $name: String!) {
    update_users(_set: {email: $email, name: $name}, where: {id: {_eq: $id}}) {
      returning {
        email
        id
        name
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation MyMutation($id: Int!) {
    delete_users(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export const CREATE_POST = gql`
  mutation MyMutation($body: String!, $title: String!, $uid: Int!) {
    insert_posts(objects: {title: $title, uid: $uid, body: $body}) {
      affected_rows
    }
  }
`;

export const READ_POST = gql`
  query MyQuery {
    posts {
      body
      title
      uid
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation MyMutation($uid: Int!, $id: Int!, $body: String!, $title: String!) {
    update_posts(
      where: {uid: {_eq: $uid}, id: {_eq: $id}}
      _set: {body: $body, title: $title}
    ) {
      affected_rows
    }
  }
`;

export const DELETE_POST = gql`
  mutation MyMutation($id: Int!) {
    delete_posts(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;
