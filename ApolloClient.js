import { AsyncStorage } from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { loginWithPassword, userId, setTokenStore, getLoginToken, logout } from 'meteor-apollo-accounts'

// SETUP METEOR-APOLLO-ACCOUNTS
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



const LIVE_URL = 'https://spacebug.meteorapp.com/graphql';
const DEV_URL = 'http://localhost:3000/graphql';
//set network options
//create networkInterface
const networkInterface = createNetworkInterface({ uri: LIVE_URL });

networkInterface.use([{
  async applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    
    let token = await getLoginToken()
    //req.options.headers['authorization'] = token || null;
    req.options.headers['meteor-login-token'] = token || null;
    next();
  }
}]);


const dataIdFromObject = (result) => {
    if (result._id && result.__typename) {
      const dataId = result.__typename + result._id;
      return dataId;
    }
    return null;
  }

//create new apollo client instance
const client = new ApolloClient({ 
  networkInterface,
  dataIdFromObject
});

//logout(client).then(res => console.log('logged out'))

export default client;