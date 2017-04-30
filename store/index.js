import thunk from 'redux-thunk';
import reducers from '../reducers';
//import createLogger from 'redux-logger';
//import { persistStore, autoRehydrate } from 'redux-persist';
import { reducer as formReducer } from 'redux-form'
import { AsyncStorage } from 'react-native';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { loginWithPassword, userId, setTokenStore} from 'meteor-apollo-accounts'
import { 
  SUBMIT_LOGIN_FORM
} from '../actions/types';

// Then you'll have to define a TokenStore for your user data using setTokenStore 
// (for instance when your component is mounted):
setTokenStore({
  set: async function ({userId, token, tokenExpires}) {
    await AsyncStorage.setItem('Meteor.userId', userId)
    await AsyncStorage.setItem('Meteor.loginToken', token)
    // AsyncStorage doesn't support Date type so we'll store it as a String
    await AsyncStorage.setItem('Meteor.loginTokenExpires', tokenExpires.toString())
  },
  get: async function () {
    return {
      userId: await AsyncStorage.getItem('Meteor.userId'),
      token: await AsyncStorage.getItem('Meteor.loginToken'),
      tokenExpires: await AsyncStorage.getItem('Meteor.loginTokenExpires')
    }
  }
});



const networkOptions = { uri: 'http://spacebug.meteorapp.com/graphql' };
const networkInterface = createNetworkInterface(networkOptions);
const client = new ApolloClient({ networkInterface });





const myReducer = (state={}, action) => {
  
  switch(action.type){
    case SUBMIT_LOGIN_FORM:
      return { ...state };
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
      form: formReducer,
	    apollo: client.reducer(),
      myReducer: myReducer
  }),
  {}, // initial state
  composeWithDevTools(
    applyMiddleware(thunk, client.middleware()),
  ),
);

export { store, client };

