import Expo, { AppLoading, Font, Amplitude, Constants } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Platform, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
//CONFIG
import { colorConfig } from './modules/config';
//
import { graphql } from 'react-apollo';
//SCREENS
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsScreen from './screens/TermsScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import ReportsScreen from './screens/ReportsScreen';
import AddReport from './screens/AddReport';
import ReportDetail from './screens/ReportDetail';
import AccountScreen from './screens/AccountScreen';
import WatchgroupsScreen from './screens/WatchgroupsScreen';
import HouseholdsScreen from './screens/HouseholdsScreen';
import AddHousehold from './screens/AddHousehold';
import WatchgroupDetail from './screens/WatchgroupDetail';
import NeighborsScreen from './screens/Neighbors';
import NeighborDetail from './screens/NeighborDetail';

//
import { GET_USER_DATA } from './apollo/queries'





// NeighborsNavigator
// =================================
const NeighborsNavigator = StackNavigator({
  neighbors: {  screen: NeighborsScreen },
  neighborDetail: { screen: NeighborDetail }
},{
  tabBarLabel: 'Neighbors',
});


// HomeNavigator
// =================================
const ReportsNavigator = StackNavigator({
  home: {  screen: ReportsScreen },
  addReport: {  screen: AddReport },
  reportDetail: {  screen: ReportDetail },
  neighborDetail: { screen: NeighborDetail },
  watchgroupDetail: {  screen: WatchgroupDetail },
},{
  tabBarLabel: 'Home',
});


// HouseholdsNavigator
// =================================
const HouseholdsNavigator = StackNavigator({
  households: {  screen: HouseholdsScreen },
  addHousehold: {  screen: AddHousehold },
},{
  tabBarLabel: 'Households',
});

// WatchgroupsNavigator
// =================================
const WatchgroupsNavigator = StackNavigator({
  watchgroups: {  screen: WatchgroupsScreen },
  watchgroupDetail: {  screen: WatchgroupDetail },
  reportDetail: {  screen: ReportDetail },
  neighborDetail: { screen: NeighborDetail },
},{
  tabBarLabel: 'Home',
});

const AccountNavigator = StackNavigator({
  account: {  screen: AccountScreen },
  settings: { screen: SettingsScreen },
  terms: { screen: TermsScreen },
  privacy: { screen: PrivacyPolicyScreen },
  help: { screen: HelpScreen }
});




// AppNavigator
// =================================
const APP_NAVIGATOR_OPTIONS = {
  swipeEnabled: false,
  lazyLoad: true,
  tabBarOptions: {
    activeTintColor: colorConfig.business,
    inactiveTintColor: colorConfig.lightGrey,
    style: {
      backgroundColor: '#fff',
      height: 60,
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
    labelStyle: {
      fontSize: 13,
    }
  }
};

const APP_NAVIGATOR_ROUTES = {
  home: { screen: ReportsNavigator },
  groups: { screen: WatchgroupsNavigator },
  households: { screen: HouseholdsNavigator },
  neighbors: { screen: NeighborsNavigator },
  account: { screen: AccountNavigator }
};



const AppNavigator = TabNavigator(APP_NAVIGATOR_ROUTES, APP_NAVIGATOR_OPTIONS);


// AutScreen
// =================================

const AUTH_NAVIGATOR_OPTIONS = {
  lazyLoad: true,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: colorConfig.business,
    inactiveTintColor: colorConfig.lightGrey,
    style: {
      backgroundColor: '#fff',
      height: 60,
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
    labelStyle: {
      fontSize: 13,
    }
  }
};

const AUTH_NAVIGATOR_ROUTES = {
  login: { screen: LoginScreen },
  signup: { screen: SignupScreen },
};

const AuthScreen = TabNavigator(AUTH_NAVIGATOR_ROUTES, APP_NAVIGATOR_OPTIONS);

// MainNavigator
// =================================

const MAIN_NAVIGATOR_OPTIONS = {
  lazyLoad: true,
  swipeEnabled: false,
  navigationOptions: {
    tabBarVisible: false,
    headerStyle: {
      marginTop: 24,
    }
  },
};



const MAIN_NAVIGATOR_ROUTES = {
  auth: { screen: AuthScreen },
  welcome: { screen: WelcomeScreen },
  main: { screen: AppNavigator },
};

const MainNavigator = TabNavigator(MAIN_NAVIGATOR_ROUTES, MAIN_NAVIGATOR_OPTIONS);




// EXPORTED COMPONENT
// =================================
class AppRoutes extends React.Component {
  state = { loadingFont: true }
  async componentWillMount(){
      //initialize Amplitude analytics
      //Amplitude.initialize(AMPLITUDE_API_KEY);
      
      await Font.loadAsync({
        'proximanovasoft-regular': require('./assets/fonts/proximanovasoft-regular.ttf'),
        'proximanovasoft-bold': require('./assets/fonts/proximanovasoft-bold.ttf'),
        'proximanovasoft-semibold': require('./assets/fonts/proximanovasoft-semibold.ttf')
      });


      this.setState({loadingFont: false})
  }
  render() {
    //if not connected to DPP, wait for connection
    if (this.state.loadingFont || this.props.data.loading) {
      return (
        <View style={styles.container}>
          <AppLoading />
        </View>
      );
    }

    return (
      <MainNavigator screenProps={this.props} />
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default graphql(GET_USER_DATA)(AppRoutes);