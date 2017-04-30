import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import AppRoutes from './routes'
import { store, client } from './store'

class App extends React.Component {
  componentDidMount(){
    console.log('componentDidMount')
  }
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
