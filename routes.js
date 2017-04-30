import Expo, { AppLoading, Font, Amplitude, Constants } from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
//CONFIG
import { colorConfig } from './modules/config';
import { userId } from 'meteor-apollo-accounts'
//SCREENS
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';

const LocationScreen = () => <View><Text>LocationScreen</Text></View>
const ResourcesScreen = () => <View><Text>ResourcesScreen</Text></View>
const FavoritesScreen = () => <View><Text>FavoritesScreen</Text></View>
const ResourceDetail = () => <View><Text>ResourceDetail</Text></View>
const OrganizationDetail = () => <View><Text>OrganizationDetail</Text></View>
const SettingsScreen = () => <View><Text>SettingsScreen</Text></View>
const TermsScreen = () => <View><Text>TermsScreen</Text></View>
const PrivacyPolicyScreen = () => <View><Text>PrivacyPolicyScreen</Text></View>
const HelpScreen = () => <View><Text>HelpScreen</Text></View>





// ResourcesNavigator
// =================================
const ResourcesNavigator = StackNavigator({
  resources: {  screen: ResourcesScreen },
  resourcesDetail: { screen: ResourceDetail },
  orgDetail: { screen: OrganizationDetail },
},{
  //mode: 'modal',
  tabBarLabel: 'Resources',
});


// FavoritesNavigator
// =================================

const FAVORITES_NAVIGATOR_ROUTES = {
  favorites: { screen: FavoritesScreen },
  resourcesDetail: { 
    screen: ResourceDetail, 
    path: 'resources/:resourceId' 
  },
  orgDetail: { screen: OrganizationDetail },
};

const FavoritesNavigator = StackNavigator(FAVORITES_NAVIGATOR_ROUTES);


// FavoritesNavigator
// =================================
const SettingsNavigator = StackNavigator({
  settings: { screen: SettingsScreen },
  terms: { screen: TermsScreen },
  privacy: { screen: PrivacyPolicyScreen },
  help: { screen: HelpScreen }
});


// AppNavigator
// =================================
const APP_NAVIGATOR_OPTIONS = {
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: colorConfig.business,
    style: {
      backgroundColor: '#fff',
      height: 60
    },
    labelStyle: {
      fontSize: 13,
    }
  }
};

const APP_NAVIGATOR_ROUTES = {
  resources: { screen: ResourcesNavigator },
  favorites: { screen: FavoritesNavigator },
  settings: { screen: SettingsNavigator },
};

const AppNavigator = TabNavigator(APP_NAVIGATOR_ROUTES, APP_NAVIGATOR_OPTIONS);


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
  login: { screen: LoginScreen },
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
      /*Amplitude.initialize(AMPLITUDE_API_KEY);
      
      await Font.loadAsync({
        'proximanovasoft-regular': require('./assets/fonts/proximanovasoft-regular.ttf'),
        'proximanovasoft-bold': require('./assets/fonts/proximanovasoft-bold.ttf'),
        'proximanovasoft-semibold': require('./assets/fonts/proximanovasoft-semibold.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({loadingFont: false});*/
  }
  componentDidMount(){
    
    
    //analyticsHelpers.registerUser()
    // register a user

  }
  render() {

    //once connected, show normal app wrapped in REDUX <Provider />
    return (
      <MainNavigator />
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

export default AppRoutes;