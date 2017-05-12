import gql from 'graphql-tag';



//FRAGMENTS
// ====================================

const userFragment = gql`
  fragment userFragment on User {
      _id
      emails {
        address
      }
      profile {
        firstName
        lastName
        image
      }
    }
`;

const messageFragment = gql`
  fragment messageFragment on Message {
        _id
        messageValue
        reportType
        priorityLevel
        image
        createdAt
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
`;



const householdFragment = gql`
  fragment householdFragment on Household {
      _id
      title
      description
      image
      owner {
        ...userFragment
      }
      location {
        street
      }
    }
    ${userFragment}
`;

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
      ...householdFragment
    }
  }
  ${householdFragment}
`;


export const FETCH_HOUSEHOLD_BY_ID = gql`
  query GetHouseholdById ($_id:ID!){
    getHouseholdById(_id:$_id) {
      ...householdFragment
    }
  }
  ${householdFragment}
`;



// MESSAGE QUERIES
// ============================

export const SEARCH_MESSAGES = gql`
  query searchMessages($string: String) {
    messages (string: $string) {
      ...messageFragment
    }
  }
  ${messageFragment}
`;


export const FETCH_MESSAGES = gql`
  query fetchMessages($offset: Int) {
    messages(offset: $offset) {
      ...messageFragment
    }
  }
  ${messageFragment}
`;


export const FETCH_WATCHGROUP = gql`
  query fetchWatchgroup($_id: ID!) {
    watchgroupById(_id:$_id) {
      _id
      title
      color_id
      
      members {
        ...userFragment
      }
      messages {
        ...messageFragment
      }
    }
  }
  ${messageFragment}
  ${userFragment}
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
      ...messageFragment
      location {
        lat
        lng
      }
    }
  }
  ${messageFragment}
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