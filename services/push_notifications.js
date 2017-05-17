import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import { SAVE_USER_EXPO_PUSH_ID } from '../apollo/mutations';
import { userId } from 'meteor-apollo-accounts';

export default async ({mutate}) => {


  if (await userId()) {  

  	let previousToken;

  	try {
  		previousToken = await AsyncStorage.getItem('pushtoken'); // check to see if the user already has a push notification token
  	}
  	catch(e) {

  	}
	 
	if (previousToken) { return console.log('previousToken'); } // if they already have a token, then return from this function

	let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

	if (status !== 'granted') { return; } // if already granted, do not save again

	let token = await Notifications.getExponentPushTokenAsync();
	  
	mutate({ variables: { expoPushId: token } }).then(res => AsyncStorage.setItem('pushtoken', token) );
	
  } 
};