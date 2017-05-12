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


class App extends React.Component {
	async componentDidMount() {

	    Notifications.addListener((notification) => {
	      const { data: { text }, origin } = notification;

	      switch(origin){
	      	case 'received':
	      		return Alert.alert('New Push Notification when app is open', text, [{ text: 'Ok.' }]);
	      	case 'received':
	      		return Alert.alert('New Push Notification when app is closed', text, [{ text: 'Ok.' }]);
	      	default:
	      		return;
	      }

	    });
	}
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
