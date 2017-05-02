import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux';
import client from '../ApolloClient';
import auth from './auth_reducer'
import { SUBMIT_LOGIN_FORM } from '../actions/types';

const myReducer = (state={}, action) => {
  
  switch(action.type){
    case SUBMIT_LOGIN_FORM:
      return { ...state };
    default:
      return state;
  }
}


export default combineReducers({ 
	auth: auth, 
	form: formReducer, 
	apollo: client.reducer(), 
	myReducer 
});
