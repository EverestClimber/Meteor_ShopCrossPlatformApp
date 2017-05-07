import React from 'react';
import { View, ScrollView, Text, Platform} from 'react-native';
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

const TabPane = Tabs.TabPane;
//
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;



const ReportList = ({messages, navigation}) => {
	if (!messages || messages.length === 0) {
		return null
	}
	return <View>{messages.map(item => <ReportCard key={item._id} item={item} navigation={navigation} />)}</View>;
}
   
const MembersList = ({members, navigation}) => {
	if (!members || members.length === 0) {
		return null
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
			return <LoadingScreen loadingMessage='loading reports...' />
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
			      </TabPane>
			      <TabPane tab="Members" key="2">
			      	<MembersList members={this.props.data.watchgroupById.members} navigation={this.props.navigation} />
			      </TabPane>
			      <TabPane tab="Reports" key="3">
			      	<ReportList messages={this.props.data.watchgroupById.messages} navigation={this.props.navigation} />
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