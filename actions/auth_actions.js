import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { logout, userId, loginWithPassword } from 'meteor-apollo-accounts'
import {
	MARK_ONBOARDING_COMPLETE,
	HANDLE_LOGIN,
	HANDLE_LOGOUT
} from './types';
import client from '../ApolloClient';

export const markOnboardingComplete = () => async dispatch => {
	let item = await AsyncStorage.setItem('onboardingComplete', 'true');
	dispatch({ type: MARK_ONBOARDING_COMPLETE });
};


export const handleLogout = (callback) => async dispatch => {
	logout(client).then( res => {
		dispatch({ type: HANDLE_LOGOUT });
		client.resetStore();
		callback()
	});
	
};



export const handleLogin = ({email, password }, callback) => async dispatch => {
	loginWithPassword({ email, password }, client).then( res => {
			client.resetStore()
			callback(null, true);
		}).catch( err => {
			const errors = err.graphQLErrors.map( err => err.message );
			callback(errors);
			return dispatch({ type: HANDLE_LOGIN });
		});
	/*loginWithPassword({ email, password }, client)
		.then( res => {
			client.resetStore(
			callback(null, true);
		}).catch( err => {
			const errors = err.graphQLErrors.map( err => err.message );
			return callback(errors);
		});*/
};

