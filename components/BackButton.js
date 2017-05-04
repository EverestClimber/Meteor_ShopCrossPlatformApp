import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { colorConfig } from '../modules/config';

const ICON_CONFIG = { name: 'chevron-left', color: '#fff', size: 30 }

const BackButton = ({ goBack, label }) => {
	return (
		<Button 
			onPress={() => goBack()}
			buttonStyle={{padding: 0}}
			backgroundColor={colorConfig.business} 
			icon={ICON_CONFIG}
			iconRight
		/>
	);
};


export default BackButton;