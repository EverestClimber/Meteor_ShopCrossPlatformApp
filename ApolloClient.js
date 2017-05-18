import { AsyncStorage } from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { loginWithPassword, userId, setTokenStore, getLoginToken, logout } from 'meteor-apollo-accounts'

// SETUP METEOR-APOLLO-ACCOUNTS
// =============================================
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



// we hit different URLs when working locally vs hitting the online/remote staging server
const LIVE_URL = 'https://truelife.meteorapp.com/graphql';
const DEV_URL = 'http://localhost:3000/graphql';


// create networkInterface
// see: http://dev.apollodata.com/core/network.html
const networkInterface = createNetworkInterface({ uri: LIVE_URL });


// This middleware setup attaches the user's current auth token 
// along with any graphql request to the server
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


// middleware for responses
// this will catch any 400 errors if the server is down 
// or when graphql tries to hit the graphql endpoint
networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (!response.ok) {
      response.clone().text().then((bodyText) => {
        console.log(`Network Error: ${response.status} (${response.statusText}) - ${bodyText}`);
        next();
      });
    } else {
      response.clone().json().then(({ errors }) => {
        if (errors) {
          errors.map((e) => {
            return console.log('GraphQL Error:', e.message);
          });
        }
        next();
      });
    }
  },
}]);



// tell apollo about the _ids on the objects we are sending down from server
// see: http://dev.apollodata.com/react/cache-updates.html
const dataIdFromObject = (result) => {
    if (result._id && result.__typename) {
      const dataId = result.__typename + result._id;
      return dataId;
    }
    return null;
  }

// create new apollo client instance
// see: http://dev.apollodata.com/react/api.html#ApolloClient
const client = new ApolloClient({ 
  networkInterface,
  dataIdFromObject
});


// EXPORT APOLLO CLIENT
// ===================================
export default client;

