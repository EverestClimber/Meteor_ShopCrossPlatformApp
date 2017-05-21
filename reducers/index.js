// REDUX
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux';
// APOLLO
import client from '../ApolloClient';
// REDUCERS
import auth from './auth_reducer'
import filter from './filter_reducer'
import mapScreen from './map_screen_reducer'
import addShopForm from './add_shop_reducer'

export default combineReducers({ 
  	auth, 
  	filter,
  	mapScreen,
  	addShopForm,
	form: formReducer, 
	apollo: client.reducer(), 
});
