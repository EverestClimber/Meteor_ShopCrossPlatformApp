import React from 'react';
import { ScrollView, Text, Platform, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { stylesConfig } from '../../modules/config';


const { basicHeaderStyle, titleStyle } = stylesConfig;


const DocumentCard = ({item, navigation}) => {
	return (
			<Card title={item.title}>
			
				<TouchableOpacity onPress={()=>navigation.navigate('document', { _id: item._id})}>
                	<Text style={{color: '#888', fontSize: 10}}>{item.title}</Text>
                </TouchableOpacity>
			</Card>
		);
}

class DocumentsList extends React.Component {
	render(){
		const { documents, navigation } = this.props;
		return (
			<ScrollView>
				{documents.length > 0 && documents.map(doc => <DocumentCard key={doc._id} navigation={navigation} item={doc} />)}
			</ScrollView>
		);
	}
}



/*const ADD_DOCUMENT = gql`
  mutation getDocument ($title: String!, $content: String!){
      createDocument(title: $title, content: $content) {
        title,
      }
  }
`;*/


export default DocumentsList;

