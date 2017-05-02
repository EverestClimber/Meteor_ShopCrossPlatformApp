import React from 'react';
import { Text, View, AsyncStorage, Platform } from 'react-native';
import LoginForm from '../../components/LoginForm'
import LoadingScreen from '../../components/LoadingScreen'
import { withApollo } from 'react-apollo';
import { userId } from 'meteor-apollo-accounts'
import { Button, Icon } from 'react-native-elements'
import { colorConfig, stylesConfig } from '../../modules/config';

const { basicHeaderStyle, titleStyle } = stylesConfig;

class LoginScreen extends React.Component {
	 static navigationOptions = {
	    title: 'Login',
	    tabBarIcon: ({ tintColor }) => <Icon name="person" size={30} color={tintColor} />,
	      headerTitleStyle: titleStyle, 
	      tabBarLabel: 'Login',
	      headerVisible: Platform.OS !== 'android',
	      headerStyle: basicHeaderStyle
	  };

	state = { stillLoading: true }

	 async componentWillMount(){
		if (this.props.screenProps.data && this.props.screenProps.data.user) {
			let onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
			if (onboardingComplete === 'true') {
				this.setState({ stillLoading: false  });
				return this.props.navigation.navigate('main');
			} else {
				this.setState({ stillLoading: false  });
				return this.props.navigation.navigate('welcome')
			}
		}

		this.setState({ stillLoading: false  });
	}
	render(){
		if (this.state.stillLoading) {
			return <LoadingScreen loadingMessage={''} />;
		}
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<LoginForm {...this.props} />
			</View>
		);
	}
}

export default LoginScreen;