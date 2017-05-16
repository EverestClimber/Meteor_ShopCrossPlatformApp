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
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';
import AddShop from './screens/AddShop';
import SearchScreen from './screens/SearchScreen';
import ShopDetail from './screens/ShopDetail';
import MapScreen from './screens/MapScreen';
import MyListingsScreen from './screens/MyListingsScreen';
import DetailMap from './screens/DetailMap';

//
import registerForNotifications from './services/push_notifications';
//
import { GET_USER_DATA } from './apollo/queries';
import { SAVE_USER_EXPO_PUSH_ID } from './apollo/mutations'


// HomeNavigator
// =================================
const HomeNavigator = StackNavigator({
  home: {  screen: HomeScreen },
  addShop: {  screen: AddShop },
  search: {  screen: SearchScreen },
  shopDetail: {  screen: ShopDetail },
  detailMap: {  screen: DetailMap },
},{
  tabBarLabel: 'Home',
});


// MapNavigator
// =================================
const MapNavigator = StackNavigator({
  map: {  screen: MapScreen },
},{
  tabBarLabel: 'Location',
});

// ListingsNavigator
// =================================
const ListingsNavigator = StackNavigator({
  listings: { screen: MyListingsScreen },
},{
  tabBarLabel: 'Location',
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
  lazy: true,
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
  home: { screen: HomeNavigator },
  map: { screen: MapNavigator },
  listings: { screen: ListingsNavigator },
  account: { screen: AccountNavigator }
};



const AppNavigator = TabNavigator(APP_NAVIGATOR_ROUTES, APP_NAVIGATOR_OPTIONS);


// AutScreen
// =================================

const AUTH_NAVIGATOR_OPTIONS = {
  lazy: true,
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
  lazy: true,
  swipeEnabled: false,
  navigationOptions: {
    tabBarVisible: false,
    headerStyle: {
      marginTop: 24,
    }
  },
};



const MAIN_NAVIGATOR_ROUTES = {
  auth: { screen: LoginScreen },
  signup: { screen: SignupScreen },
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
  componentDidMount() {
    registerForNotifications(this.props);

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

export default graphql(SAVE_USER_EXPO_PUSH_ID)(
  graphql(GET_USER_DATA)(AppRoutes)
);