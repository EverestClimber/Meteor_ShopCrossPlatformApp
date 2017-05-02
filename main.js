import Expo from 'expo';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import AppRoutes from './routes'
import { store } from './store'
import client from './ApolloClient';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <AppRoutes />
      </ApolloProvider>
    );
  }
}

Expo.registerRootComponent(App);
