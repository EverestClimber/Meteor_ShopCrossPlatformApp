


export const PRIORITY_LEVEL = [
	{ key: 1, value: '1', intValue: 1, label: 'General'},
	{ key: 2, value: '2', intValue: 2, label: 'Suspicious but not Urgent'},
	{ key: 3, value: '3', intValue: 3, label: 'Urgent'}
];


export const REPORT_TYPE = [
	{ key: 1, value: '1', intValue: 1, label: 'General'},
	{ key: 2, value: '2', intValue: 2, label: 'Suspicious Vehicle'},
	{ key: 3, value: '3', intValue: 3, label: 'Suspicious Person'},
	{ key: 4, value: '4', intValue: 4, label: 'Checking In'},
	{ key: 5, value: '5', intValue: 5, label: 'Checking Out'}
];


export const getPriorityLevel = (priorityLevel) => {
  switch(priorityLevel){
    case 1:
      return PRIORITY_LEVEL[0].label;
    case 2:
      return PRIORITY_LEVEL[1].label;
    case 3:
      return PRIORITY_LEVEL[2].label;
    default:
      return ''
  }
}



export const getAlertLevel = (reportType) => {
   switch(reportType) {
          case 'General':
              return 1
              break;
          case 'Checking In':
              return 1
              break;
          case 'Checking Out':
              return 1
              break;
          case 'Suspicious Vehicle':
              return 3
              break;
          case 'Suspicious Person':
              return 5
              break;
          default:
             return 0
      }
}
