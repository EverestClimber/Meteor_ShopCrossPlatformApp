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
    $category: String!
    $image: String
    $longitude:String
    $latitude: String
    $phone: String
    $website: String
    $email: String
  ){
    createShop(
      title: $title
      description: $description
      category: $category
      image: $image
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


