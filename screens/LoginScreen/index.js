// TOP LEVEL IMPORTS
import React from 'react';
import { Text, View, AsyncStorage, Image, Platform, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { BlurView } from 'expo';
// APOLLO
import { withApollo } from 'react-apollo';
import { userId } from 'meteor-apollo-accounts'
// MODULES
import { colorConfig, stylesConfig } from '../../modules/config';
// COMPONENTS
import LoginForm from '../../components/LoginForm'
import LoadingScreen from '../../components/LoadingScreen'



// CONSTANTS & DESCTRUCTURING
// ==============================
const { basicHeaderStyle, titleStyle } = stylesConfig;


// STYLES
// ==============================
const s = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      alignItems: 'center',
      justifyContent: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'red',
    opacity: 0.3
  }
});


// EXPORTED COMPONENT
// ==============================
class LoginScreen extends React.Component {
	 static navigationOptions = {
	 	
	    title: 'Login',
	    tabBarIcon: ({ tintColor }) => <Icon name="person" size={30} color={tintColor} />,
	      headerTitleStyle: titleStyle, 
	      tabBarLabel: 'Login',
	      tabBarVisible: false,
	      headerVisible: false,
	      headerStyle: basicHeaderStyle
	  };

	state = { stillLoading: true }

	 async componentDidMount(){
	 	//await AsyncStorage.removeItem('onboardingComplete');
	 	if (await userId()){
	 		setTimeout(() => this.props.navigation.navigate('main')) 
	 	}
		if (this.props.screenProps.data && this.props.screenProps.data.user) {
			let onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
			if (onboardingComplete === 'true') {
				this.setState({ stillLoading: false  });
				setTimeout(() => this.props.navigation.navigate('main')) 
			} else {
				this.setState({ stillLoading: false  });
				setTimeout(() => this.props.navigation.navigate('welcome')) 
			}
		}

		this.setState({ stillLoading: false  });
	}
	render(){
		
		if (this.state.stillLoading) {
			return <LoadingScreen loadingMessage={''} />;
		}
		

		return (
			<View style={{ flex: 1}}>
				<Image style={{ width: null, height: null, flex: 1, }} source={require('../../assets/background.jpg')} />
				<BlurView tint="default" intensity={95} style={StyleSheet.absoluteFill}>
		          	<LoginForm {...this.props} />
		        </BlurView>
	        </View>
		);

	}
}


// EXPORT
// ==============================
export default LoginScreen;