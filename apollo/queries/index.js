import gql from 'graphql-tag';


// MESSAGE QUERIES
// ============================
export const FETCH_MESSAGES = gql`
  query fetchWatchgroups {
    messages {
      _id
      messageValue
    }
  }
`;

export const FETCH_MESSAGE = gql`
  query getMessageById ($_id: ID!){
    getMessageById(_id: $_id) {
        messageValue,
        _id
      }
  }
`;

// USER QUERIES
// ============================
export const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails { address, verified },
      roles,
      _id,
      profile {
        watchgroupIds
      }
    }
  }
`;