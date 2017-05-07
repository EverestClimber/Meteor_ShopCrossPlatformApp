import gql from 'graphql-tag';



export const FETCH_WATCHGROUPS = gql`
  query fetchWatchgroups {
    watchgroups {
      _id
      title
      color_id
    }
  }
`;


// FETCH_HOUSEHOLDS
// ============================
export const FETCH_HOUSEHOLDS = gql`
  query FetchHouseholds {
    households {
      _id
      title
      image
      location {
        street
      }
    }
  }
`;


export const FETCH_HOUSEHOLD = gql`
  query GetHouseholdById ($_id:ID!){
    getHouseholdById(_id:$_id) {
      _id
      title
    }
  }
`;

// MESSAGE QUERIES
// ============================
export const FETCH_MESSAGES = gql`
  query fetchMessages {
    messages {
      _id
      messageValue
      reportType
      priorityLevel
      image
      watchgroup {
        _id
        title
        color_id
      }
      owner {
        _id
        profile {
          firstName
          lastName
          image
        }
      }
    }
  }
`;

export const FETCH_WATCHGROUP = gql`
  query fetchWatchgroup($_id: ID!) {
    watchgroupById(_id:$_id) {
      _id
      title
      color_id
      members {
        _id
        profile {
          firstName
          lastName
          image
        }
      }
      messages {
        _id
        messageValue
        reportType
        priorityLevel
        image
        watchgroup {
          _id
          title
          color_id
        }
        owner {
          _id
          profile {
            firstName
            lastName
            image
          }
        }
      }
    }
  }
`;


export const FETCH_USER_BY_ID = gql`
  query FetchUserById ($_id:ID!){
      getUserById(_id:$_id) {
        _id
        profile {
          firstName
          lastName
          image
        }
      }
    }
`;


export const FETCH_MESSAGE = gql`
  query getMessageById ($_id: ID!){
    getMessageById(_id: $_id) {
      _id
      messageValue
      reportType
      priorityLevel
      image
      location {
        lat
        lng
      }
      watchgroup {
        _id
        title
        color_id
      }
      owner {
        _id
        profile {
          firstName
          lastName
          image
        }
      }
    }
  }
`;

export const FETCH_NEIGHBORS = gql`
  query FetchNeighbors {
    neighbors {
      _id
      profile {
        firstName
        lastName
        image
      }
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
        firstName
        lastName
        cell
        cellVisibility
        gender
        image
      }
    }
  }
`;