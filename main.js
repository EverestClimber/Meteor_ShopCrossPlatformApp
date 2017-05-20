// TOP LEVEL IMPORTS
import Expo from 'expo';
import React from 'react';
import AppRoutes from './routes';
// APOLLO
import { ApolloProvider } from 'react-apollo';
import client from './ApolloClient';
// REDUX
import { store } from './store'
// ANTD
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd-mobile';
// OTHER
import Sentry from 'sentry-expo';
import { SENTRY_DSN } from './modules/config'



// INITIALIZE SENTRY ERROR LOGGING: https://sentry.io/
// ===================================================
Sentry.config(SENTRY_DSN).install();



  // code

  
// ROOT COMPONENT TO ENTIRE RN APP
// ===================================================
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


// REGISTER ROOT COMPONENT WITH EXPO HELPER
// ===================================================
Expo.registerRootComponent(App);
