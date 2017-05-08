import React from 'react';
import { View, ScrollView, Text, Platform, Image } from 'react-native';
//MODULES
import { FETCH_WATCHGROUP } from '../../apollo/queries';
import { stylesConfig, colorConfig } from '../../modules/config';
import LoadingScreen from '../../components/LoadingScreen';
import ReportCard from '../../components/ReportCard';
import NeighborCard from '../../components/NeighborCard';
import { Icon, Button, Card } from 'react-native-elements';
import { graphql } from 'react-apollo';
import BackButton from '../../components/BackButton';
import { Tabs, WhiteSpace,  } from 'antd-mobile';
import EmptyState from '../../components/EmptyState';

const TabPane = Tabs.TabPane;
//
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle, emptyStateIcon } = stylesConfig;



const ReportList = ({messages, navigation}) => {
	if (!messages || messages.length === 0) {
		return (
			<EmptyState 
				imageComponent={
					<Image source={require('../../assets/marketing.png')} style={emptyStateIcon}/>
				}
				pageText='NO MESSAGES YET...' 
			/>
		);
	}
	return <View>{messages.map(item => <ReportCard key={item._id} item={item} navigation={navigation} />)}</View>;
}
   
const MembersList = ({members, navigation}) => {
	if (!members || members.length === 0) {
		return (
			<EmptyState 
				imageComponent={
					<Image source={require('../../assets/audience.png')} style={emptyStateIcon}/>
				}
				pageText='NO MEMBERS YET...' 
			/>
		);
	}
	return <View>{members.map(item => <NeighborCard key={item._id} item={item} navigation={navigation} />)}</View>;
}
   

class WatchgroupDetail extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: `${navigation.state.params.group}`,
		tabBarIcon: ({ tintColor }) => <Icon name="group" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Groups',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	render(){
		if (this.props.data.loading) {
			return <LoadingScreen loadingMessage='Loading Watchgroup...' />
		}

		return (
			<ScrollView style={{padding: 10, backgroundColor: colorConfig.screenBackground}}>
				<Tabs defaultActiveKey="1"
					textColor={colorConfig.darkGrey}
					activeTextColor={colorConfig.business}
					activeUnderlineColor={colorConfig.business} 
					underlineColor={colorConfig.lightGrey}
				>
			      <TabPane tab="General" key="1">
			      	<View style={{minHeight: 300}}>
			      	</View>
			      </TabPane>
			      <TabPane tab="Members" key="2">
			      	<View style={{minHeight: 300}}>
				      	<MembersList 
				      		members={this.props.data.watchgroupById.members} 
				      		navigation={this.props.navigation} 
				      	/>
			      	</View>
			      </TabPane>
			      <TabPane tab="Reports" key="3">
			      	<View style={{minHeight: 300}}>
				      	<ReportList 
				      		messages={this.props.data.watchgroupById.messages} 
				      		navigation={this.props.navigation} 
				      	/>
			      	</View>
			      </TabPane>
			    </Tabs>
			</ScrollView>
		);
	}
	
}

export default graphql(FETCH_WATCHGROUP, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(WatchgroupDetail);