import Expo, { Notifications } from 'expo';
import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import AppRoutes from './routes'
import { store } from './store'
import client from './ApolloClient';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import {LocaleProvider} from 'antd-mobile';
import registerForNotifications from './services/push_notifications';
import Sentry from 'sentry-expo';
import { SENTRY_DSN } from './modules/config'

Sentry.config(SENTRY_DSN).install();

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
