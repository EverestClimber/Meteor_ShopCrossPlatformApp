// TOP LEVEL IMPORTS
import React from 'react';
import Expo, { AppLoading, Font, Amplitude, Constants, Permissions, Location } from 'expo';
import { StyleSheet, Text, View, Platform, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
//CONFIG
import { colorConfig } from './modules/config';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_USER_DATA } from './apollo/queries';
import { SAVE_USER_EXPO_PUSH_ID } from './apollo/mutations'
//SCREENS
import AccountScreen from './screens/AccountScreen';
import AddShop from './screens/AddShop';
import FiltersScreen from './screens/FiltersScreen';
import ExploreScreen from './screens/ExploreScreen';
import EditShop from './screens/EditShop';
import HelpScreen from './screens/HelpScreen';
import LoginScreen from './screens/LoginScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import MapScreen from './screens/MapScreen';
import MyListingsScreen from './screens/MyListingsScreen';
import SignupScreen from './screens/SignupScreen';
import SettingsScreen from './screens/SettingsScreen';
import ShopDetail from './screens/ShopDetail';
import TermsScreen from './screens/TermsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
// SERVICES
import registerForNotifications from './services/push_notifications';



// ListingsNavigator
// =================================
const ListingsNavigator = StackNavigator({
  listings:   {  screen: MyListingsScreen },
  addShop:    {  screen: AddShop },
  shopDetail: {  screen: ShopDetail },
  editShop:   {  screen: EditShop },
},{
  tabBarLabel: 'Location',
});


// HomeNavigator
// =================================
const HomeNavigator = StackNavigator({
  home: {  screen: ExploreScreen },
  map: { screen: MapScreen },
  filters: { screen: FiltersScreen },
  shopDetail: {  screen: ShopDetail },
},{
  tabBarLabel: 'Home',
  mode: 'modal'
});


// AccountNavigator
// =================================
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
  state = { loadingFont: true, currentLocation: null }
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
  async componentDidMount() {

    registerForNotifications(this.props);

    const locationResponse = await Permissions.askAsync(Permissions.LOCATION);
    if (locationResponse.status === 'granted') {
      let locationOptions = { 
        enableHighAccuracy: true,
        timeInterval: 60000,
        distanceInterval: 10
      };
      Location.watchPositionAsync(locationOptions, (currentLocation) => {
        this.setState({ currentLocation });
      });
    } 
    else { throw new Error('Location permission not granted'); }

  }
  render() {

    if (this.state.loadingFont || this.props.data.loading) {
      return (
        <View style={styles.container}>
          <AppLoading />
        </View>
      );
    }

    return (
      <MainNavigator 
        screenProps={{
          currentLocation: this.state.currentLocation, 
          ...this.props
        }} 
      />
    );;

  }
}



// STYLES
// =================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// EXPORT
// =================================
export default graphql(SAVE_USER_EXPO_PUSH_ID)(
  graphql(GET_USER_DATA)(AppRoutes)
);