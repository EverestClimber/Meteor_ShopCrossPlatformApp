import gql from 'graphql-tag';

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
