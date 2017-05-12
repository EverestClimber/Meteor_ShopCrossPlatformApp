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
    $cell: String!
    $image: String
    $gender: String
    $cellVisibility: String
    $watchgroupIds: [String]
  ){
    saveUserProfile (
      email: $email
      watchgroupIds: $watchgroupIds
      cell: $cell
      image: $image
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      cellVisibility: $cellVisibility
    ){
      _id
    }
  }
`;

export const CREATE_REPORT = gql`
  mutation CreateReport (
    $messageValue: String
    $modelType: String
    $alertLevel: Int
    $priorityLevel: Int
    $reportType: String
    $watchgroupId: String
    $longitude: String,
    $latitude: String
    $image: String
  ){
    createReport (
      messageValue: $messageValue
      modelType: $modelType
      image: $image
      alertLevel: $alertLevel
      priorityLevel: $priorityLevel
      reportType: $reportType
      watchgroupId: $watchgroupId
      longitude: $longitude,
      latitude: $latitude
    ){
      _id
    }
  }
`;
