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



export const REMOVE_ATTACHMENT = gql`
  mutation RemoveAttachmentById($attachmentId: ID!){
    removeAttachment(attachmentId: $attachmentId){
      _id
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

export const ADD_ATTACHMENTS = gql`
  mutation AddAttachments(
      $images: [ImageObject], 
      $shopId: ID, 
      $userId: ID,
  ){
    addAttachments(
      images: $images, 
      shopId: $shopId, 
      userId: $userId,
    ){
      _id
    }
  }
`

export const CREATE_SHOP = gql`
  mutation CreateShop( $params: ShopParams ){
    createShop( params: $params ){
      _id
      owner {
        _id
      }
    }
  }
`
export const SAVE_SHOP = gql`
  mutation SaveShop( 
    $_id: ID!, 
    $params: ShopParams 
  ){
    saveShop( 
      _id: $_id, 
      params: $params 
   ){
      _id
      owner {
        _id
      }
    }
  }
`


