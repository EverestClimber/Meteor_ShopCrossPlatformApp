import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { stylesConfig, colorConfig } from '../modules/config';


const styles = StyleSheet.create({
	container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorConfig.screenBackground },
	text: {
		fontFamily: stylesConfig.boldFont,
		color: colorConfig.darkGrey,
		fontSize: 16
	}
});

const EmptyState = ({pageText, imageComponent}) => {
	return (
		<View style={styles.container}>
			{imageComponent && imageComponent}
			<Text style={styles.text}>
				{ pageText }
			</Text>
		</View>
	);
}

export default EmptyState;