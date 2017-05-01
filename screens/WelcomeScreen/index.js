//TOP-LEVEL IMPORTS
import React from 'react';
import { View, Text, AsyncStorage, Image } from 'react-native';
import { AppLoading, Amplitude } from 'expo';
//COMPONENTS
import Slides from '../components/Slides'
//MODULES
import { colorConfig, stylesConfig } from '../modules/config';
//
import _ from 'lodash';
import { connect } from 'react-redux';

import * as actions from '../actions';




const SLIDE_DATA = [
	{
		text: 'Welcome to GrowLab!',
		color: colorConfig.business
	},
	{
		text: 'Use GrowLab to find local resources and opportunities for your business.',
		color: colorConfig.ecosystem,
	},
	{
		text: 'Support resources like mentoring and free advising are marked yellow.',
		color: colorConfig.support
	},
	{
		text: 'Finance resources like loans and grants are marked green.',
		color: colorConfig.finance
	},
	{
		text: 'Set your location, then swipe right to favorite a resource. Swipe left to view the next resource.',
		color: '#34495e',
	},
	{
		text: 'Ready to start?',
		color: '#8e44ad',
	},
];

class WelcomeScreen extends React.Component {

	state = { onboardingComplete: null }

	onSlidesComplete = () => {
		this.props.markOnboardingComplete();
		this.props.navigation.navigate('main');
	}

	async componentWillMount(){
		//AsyncStorage.removeItem('onboardingComplete');
		let onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
		if (onboardingComplete === 'true') {
			this.props.navigation.navigate('main');
			this.setState({ onboardingComplete: true });
		} else {
			this.setState({ onboardingComplete: false });
		}
		
	}
	componentDidMount(){
		//analyticsHelpers.logPageView('user hit welcome page');
	  }
	render(){

		if (_.isNull(this.state.onboardingComplete)) return <AppLoading />

		return (
			<Slides 
				data={SLIDE_DATA}
				onSlidesComplete={this.onSlidesComplete}
			/>
		);
	}
}

let mapStateToProps = (state) => {
	return { onboardingComplete: state.auth.onboardingComplete }
}

export default connect(mapStateToProps, actions)(WelcomeScreen);