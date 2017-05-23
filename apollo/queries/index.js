import gql from 'graphql-tag';



// FRAGMENTS
// ====================================

const shopFragment = gql`
  fragment shopFragment on Shop {
        _id
        title
        description
        categories
        image
        mallId
        attachments {
          _id
          url
        }
        owner {
          _id
          profile {
            firstName
            lastName
            image
          }
        }
        location {
          lat
          lng
        }
    }
`;

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

// FETCH_MALLS
// ============================
export const FETCH_MALLS = gql`
  query FetchMalls {
    malls {
      _id
      title
      description
      location {
        lat
        lng
      }
    } 
  }
`;

// FETCH_SHOPS
// ============================
export const FETCH_SHOPS = gql`
  query FetchShops(
    $offset: Int, 
    $string: String
    $categories: [String]
    $nearMe: Boolean
    $longitude: String
    $latitude: String
  ) {
    shops(
      offset: $offset
      string: $string
      categories: $categories
      nearMe: $nearMe
      longitude: $longitude
      latitude: $latitude
    ) {
      ...shopFragment
    } 
  }
  ${shopFragment}
`;


// FETCH_EXISTING_SHOPS is the query used to check for duplicates 
// while a user is filling out the AddShop form
export const FETCH_EXISTING_SHOPS = gql`
  query ShopExists(
    $offset: Int, 
    $string: String
    $categories: [String]
    $nearMe: Boolean
    $longitude: String
    $latitude: String
  ) {
    shopExists(
      offset: $offset
      string: $string
      categories: $categories
      nearMe: $nearMe
      longitude: $longitude
      latitude: $latitude
    ) {
      _id
      title
      categories
    } 
  }
`;


// SEARCH_SHOPS_BY_OWNER is the query used to let users search the shops THEY CREATED
// currently used on the My Listings screen
export const SEARCH_SHOPS_BY_OWNER = gql`
  query searchShopsByOwner($string: String) {
    shopsByOwner (string: $string) {
      ...shopFragment
    } 
  }
  ${shopFragment}
`;

// FETCH_SHOPS_BY_OWNER is the query to show a user the shops THEY CREATED
// currently used on the My Listings screen
export const FETCH_SHOPS_BY_OWNER = gql`
  {
    shopsByOwner {
      ...shopFragment
    } 
  }
  ${shopFragment}
`;


export const SEARCH_SHOPS = gql`
  query searchShops($string: String) {
    shops (string: $string) {
      ...shopFragment
    }
  }
  ${shopFragment}
`;


export const FETCH_SHOP = gql`
  query FetchShop($_id: ID!) {
    shopById(_id: $_id) {
     ...shopFragment
    } 
  }
  ${shopFragment}
`;




// USER QUERIES
// ============================
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


// USER QUERIES
// ============================
export const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails { address, verified },
      roles,
      _id,
      profile {
        firstName
        lastName
      }
    }
  }
`;