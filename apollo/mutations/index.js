import gql from 'graphql-tag';


export const SAVE_USER_IMAGE = gql`
    mutation SaveUserImage ( $image: String! ) {
      saveUserImage ( image: $image ){
        _id
        profile {
          image
        }
      }
    }
`;

export const SAVE_USER_EXPO_PUSH_ID = gql`
    mutation SaveUserExpoPushId ( $expoPushId: String! ) {
      saveUserExpoPushId ( expoPushId: $expoPushId ){
        _id
      }
    }
`;



export const SAVE_USERPROFILE = gql`
  mutation SaveUserProfile (
    $email: String!
    $firstName: String!
    $lastName: String!
  ){
    saveUserProfile (
      email: $email
      firstName: $firstName
      lastName: $lastName
    ){
      _id
    }
  }
`;


export const DELETE_SHOP = gql`
  mutation DeleteShop ($shopId:ID!) {
    deleteShop(shopId:$shopId) {
      _id
    }
  }
`


export const CREATE_SHOP = gql`
  mutation CreateShop(
    $title: String!
    $description: String!
    $categories: [String!]
    $image: String
    $longitude:String
    $latitude: String
    $phone: String
    $website: String
    $email: String
    $mallId: String
  ){
    createShop(
      title: $title
      description: $description
      categories: $categories
      image: $image
      mallId: $mallId
      longitude: $longitude
      latitude: $latitude
      phone: $phone
      website: $website
      email: $email
    ){
      _id
    }
  }
`


export const SAVE_SHOP = gql`
  mutation SaveShop(
    $_id: ID!
      $title: String!
      $description: String!
      $categories: [String!]
      $image: String
      $longitude:String
      $latitude: String
      $mallId: String
      $location: LocationData
  ){
    saveShop(
      _id: $_id
      title: $title
      mallId: $mallId
      description: $description
      categories: $categories
      image: $image
      longitude: $longitude
      latitude: $latitude
      location: $location
    ){
      _id
      owner {
        _id
      }
    }
  }
`

