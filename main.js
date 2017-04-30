import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { meteorClientConfig } from './meteorApolloClient'
import { loginWithPassword, userId, setTokenStore} from 'meteor-apollo-accounts'
import AppRoutes from './routes'

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



const networkOptions = { uri: 'http://spacebug.meteorapp.com//graphql' };
const networkInterface = createNetworkInterface(networkOptions);
const client = new ApolloClient({ networkInterface });

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {}, // initial state
  composeWithDevTools(
    applyMiddleware(client.middleware()),
  ),
);
//
class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <AppRoutes />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
