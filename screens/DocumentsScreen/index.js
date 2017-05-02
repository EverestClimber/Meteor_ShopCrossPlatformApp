import React from 'react';
import { View, Text, Platform, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

import DocumentsList from './DocumentsList'

const { basicHeaderStyle, titleStyle } = stylesConfig;

class DocumentsScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Documents',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Documents',
	  	headerStyle: basicHeaderStyle,
	  	headerRight: <Button title={'+ Create'} color={colorConfig.business} onPress={()=>navigation.navigate('addDoc')} />,
	});
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
				<DocumentsList documents={this.props.data.documents} {...this.props} />
			</View>
		);
	}
}

const GET_DOCUMENTS_DATA = gql`
query getDocuments {
    documents {
      title,
      _id,
      owner { _id, emails {
        address
      } }
    }
  }
`;


export default graphql(GET_DOCUMENTS_DATA)(DocumentsScreen);