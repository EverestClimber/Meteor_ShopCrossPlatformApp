import { AsyncStorage } from 'react-native';
import { SUBMIT_CONTACT_US_FORM } from './types';
import { loginWithPassword, userId, setTokenStore } from 'meteor-apollo-accounts'
import client from '../ApolloClient';



const alertErrors = (res) => {
  const errors = res.graphQLErrors.map( err => err.message );
  errors.forEach(messageText => {
    console.log(messageText);
  });
}

export const submitContactUsForm = (values, callback) => dispatch => {
	console.log('Messages.addNewMessage');
	//send meteor method for message to admin console
	/*Meteor.call('Messages.addNewMessage', values, 'messageToAdmin', function(error, response){
		if (error) { return console.log(error) }
		dispatch({ type: SUBMIT_CONTACT_US_FORM, payload: values });
		callback();
	});*/
};




