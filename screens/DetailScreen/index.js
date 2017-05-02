import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesConfig } from '../../modules/config';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const { basicHeaderStyle, titleStyle } = stylesConfig;

class DetailScreen extends React.Component {
	static navigationOptions = {
		title: 'Documents',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Documents',
	  	headerStyle: basicHeaderStyle
	}
	render(){
		if (this.props.data.loading) {
			return (
				<View style={{flex: 1, padding: 10, backgroundColor: '#f5f5f5',}}>
					<Text>Loading...</Text>
				</View>
			);
		}
		return (
			<View style={{flex: 1, padding: 10, backgroundColor: '#f5f5f5',}}>
				<Text>{this.props.data.documentById.title}</Text>
			</View>
		);
	}
}


const FETCH_DOCUMENT = gql`
  query getDocumentById ($_id: ID!){
    documentById(_id: $_id) {
        title,
        _id
      }
  }
`;

export default graphql(FETCH_DOCUMENT, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(DetailScreen);