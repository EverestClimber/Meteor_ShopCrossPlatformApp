import Expo from 'expo';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import AppRoutes from './routes'
import { store } from './store'
import client from './ApolloClient';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import {LocaleProvider} from 'antd-mobile';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <LocaleProvider locale={enUS}>
        	<AppRoutes />
        </LocaleProvider>
      </ApolloProvider>
    );
  }
}

Expo.registerRootComponent(App);
