import React from 'react';
import { View, Text, Platform, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import BackButton from '../../components/BackButton';
import LoadingScreen from '../../components/LoadingScreen';
import ReportCard from '../../components/ReportCard';
import { FETCH_MESSAGE } from '../../apollo/queries';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { MapView } from 'expo';

const { basicHeaderStyle, titleStyle, boldFont, regularFont } = stylesConfig;


const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  },
  cardHeader: {
		margin: 0, 
		color: '#4b5658', 
		fontSize: 19,
		fontFamily: boldFont
	},
	cardSubHeader: {
		margin: 0, 
		color: '#888', 
		fontSize: 16,
		fontFamily: regularFont
	},
	messageValue: {
		color: '#7b8b8e', 
		fontSize: 13
	}
});



const CalloutContent = ({message}) => {
	return (
		<View style={{minWidth: 150}}>
			<Image 
				source={{ uri: message.owner.profile.image }} 
				style={{height: 65, width: 60}}
			/>
			<Text style={styles.cardHeader}>{message.reportType} </Text>
			<Text style={styles.cardSubHeader}>{message.reportType} </Text>
			<Text style={styles.messageValue}>{message.messageValue}</Text>
		</View>
);
}


class MapScreen extends React.Component {

  constructor(props){
  	super(props);
  	this.state = {
  		mapLoaded: false,
  		originalReport: {
	    	longitude: parseFloat(this.props.data.getMessageById.location.lng),//longitude: -122,
      		latitude: parseFloat(this.props.data.getMessageById.location.lat),//latitude: -122,
  		},
	    region: {
	    	longitude: parseFloat(this.props.data.getMessageById.location.lng),//longitude: -122,
      		latitude: parseFloat(this.props.data.getMessageById.location.lat),//latitude: -122,
	      //latitude: 37,
	      longitudeDelta: 0.04,
	      latitudeDelta: 0.09
	    }
  	}
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {

    if (!this.state.mapLoaded) {
      return <LoadingScreen />;
    }



    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
        	<MapView.Marker
	        	coordinate={{
	        		longitude: this.state.originalReport.longitude,//longitude: -122,
	      			latitude: this.state.originalReport.latitude,
	        	}}
        	>
	        	<MapView.Callout tooltip>
	        		<ReportCard item={this.props.data.getMessageById} navigation={this.props.navigation} />
	        	</MapView.Callout>
        	</MapView.Marker>
        </MapView>
        {/*<View style={styles.buttonContainer}>
          <Button
            large
            title="Search This Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>*/}
      </View>
    );
  }
}






class ReportDetail extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Report',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Report',
	  	tabBarVisible: false,
	  	headerStyle: basicHeaderStyle,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	render(){
		if (this.props.data.loading) {
			return (
				<LoadingScreen loadingMessage='Loading Map...' />
			);
		}

		return <MapScreen {...this.props} />

		return (
			<View style={{flex: 1, padding: 10, backgroundColor: colorConfig.screenBackground}}>
				<Card>
					<Text>{this.props.data.getMessageById.messageValue}</Text>
				</Card>
			</View>
		);
	}
}



export default graphql(FETCH_MESSAGE, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(ReportDetail);