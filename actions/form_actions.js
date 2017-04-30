import { AsyncStorage } from 'react-native';
import { SUBMIT_CONTACT_US_FORM } from './types';
import { loginWithPassword, userId, setTokenStore } from 'meteor-apollo-accounts'
import { client } from '../store';



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



export const submitLoginForm = ({email, password }, callback) => async dispatch => {

	/*try {
		let response = loginWithPassword({"admin@admin.com", "password" }, client);
		console.log(response)
		return callback();
	}
	catch(err) {
		return alertErrors(err))
	}*/
	loginWithPassword({email: "admin@admin.com", password: "password" }, client)
		.then( res => {
			console.log(res);
			callback();
		}).catch( err => alertErrors(err));
	/*Meteor.call('Messages.addNewMessage', values, 'messageToAdmin', function(error, response){
		if (error) { return console.log(error) }
		dispatch({ type: SUBMIT_CONTACT_US_FORM, payload: values });
		callback();
	});*/
};


