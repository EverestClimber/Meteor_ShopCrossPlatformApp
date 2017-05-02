import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { colorConfig } from '../modules/config';

const ICON_CONFIG = { name: 'chevron-left', color: colorConfig.business, size: 30 }

const BackButton = ({ goBack, label }) => {
	return (
		<Button 
			onPress={() => goBack()}
			buttonStyle={{padding: 0}}
			backgroundColor={'#fff'} 
			icon={ICON_CONFIG}
			iconRight
		/>
	);
};


export default BackButton;