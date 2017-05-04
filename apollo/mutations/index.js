import gql from 'graphql-tag';

export const ADD_REPORT = gql`
  mutation CreateReport (
    $messageValue: String
    $modelType: String
    $alertLevel: Int
    $priorityLevel: Int
    $reportType: String
    $watchgroupId: String
  ){
    createReport (
      messageValue: $messageValue
      modelType: $modelType
      alertLevel: $alertLevel
      priorityLevel: $priorityLevel
      reportType: $reportType
      watchgroupId: $watchgroupId
    ){
      _id
    }
  }
`;