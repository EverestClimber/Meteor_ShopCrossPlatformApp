import React from 'react';
import { Text, View } from 'react-native';
import LoginForm from '../../components/LoginForm'
import LoadingScreen from '../../components/LoadingScreen'
import { withApollo } from 'react-apollo';
import { userId } from 'meteor-apollo-accounts'

class LoginScreen extends React.Component {

	state = { stillLoading: true }

	async componentWillMount() {
		if (await userId()) {
			this.setState({ stillLoading: false  });
			return this.props.navigation.navigate('main')
		}
		this.setState({ stillLoading: false  });
	}
	render(){
		if (this.state.stillLoading) {
			return <LoadingScreen loadingMessage={''} />;
		}
		return (
			<View style={{flex: 1}}>
				<LoginForm />
			</View>
		);
	}
}

export default LoginScreen;