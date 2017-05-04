//TOP-LEVEL IMPORTS
import React from 'react';
import { View, Text, AsyncStorage, Image } from 'react-native';
import { AppLoading, Amplitude } from 'expo';
import _ from 'lodash';
//COMPONENTS
import Slides from '../../components/Slides'
//MODULES
import { colorConfig, stylesConfig } from '../../modules/config';
//REDUX
import { connect } from 'react-redux';
import * as actions from '../../actions';




const SLIDE_DATA = [
	{
		text: 'Welcome to the App!',
		color: colorConfig.business
	},
	{
		text: 'This is what our app does.',
		color: colorConfig.ecosystem,
	},
	{
		text: 'This is a quick sentence about getting started.',
		color: '#34495e',
	},
	{
		text: 'Ready to move on?',
		color: '#8e44ad',
	},
];




class WelcomeScreen extends React.Component {

	state = { onboardingComplete: null }

	onSlidesComplete = () => {
		this.props.markOnboardingComplete();
		this.props.navigation.navigate('main');
	}

	componentDidMount(){
		//analyticsHelpers.logPageView('user hit welcome page');
	  }
	render(){

		//if (_.isNull(this.state.onboardingComplete)) { return <AppLoading /> }

		/*return (
			<View style={{backgroundColor: 'blue', flex: 1}}>
			</View>
		);*/

		return (
			<Slides data={SLIDE_DATA} onSlidesComplete={this.onSlidesComplete} />
		);
	}
}

let mapStateToProps = (state) => {
	return { onboardingComplete: state.auth.onboardingComplete }
}

//export default WelcomeScreen

export default connect(mapStateToProps, actions)(WelcomeScreen);