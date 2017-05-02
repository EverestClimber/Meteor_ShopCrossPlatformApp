import Expo, { AppLoading, Font, Amplitude, Constants } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
//CONFIG
import { colorConfig } from './modules/config';
//
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//SCREENS
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsScreen from './screens/TermsScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import HomeScreen from './screens/HomeScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import DetailScreen from './screens/DetailScreen';
import AddDocument from './screens/AddDocument';







// FavoritesNavigator
// =================================
const SettingsNavigator = StackNavigator({
  settings: { screen: SettingsScreen },
  terms: { screen: TermsScreen },
  privacy: { screen: PrivacyPolicyScreen },
  help: { screen: HelpScreen }
});


// HomeNavigator
// =================================
const HomeNavigator = StackNavigator({
  home: {  screen: HomeScreen },
},{
  tabBarLabel: 'Home',
});

// DocumentsNavigator
// =================================
const DocumentsNavigator = StackNavigator({
  documents: {  screen: DocumentsScreen },
  document: {  screen: DetailScreen },
  addDoc: {  screen: AddDocument },
},{
  tabBarLabel: 'Home',
});


// AppNavigator
// =================================
const APP_NAVIGATOR_OPTIONS = {
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

const APP_NAVIGATOR_ROUTES = {
  home: { screen: HomeNavigator },
  documents: { screen: DocumentsNavigator },
  settings: { screen: SettingsNavigator },
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
      this.setState({loadingFont: false});
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

const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails { address, verified },
      roles,
      _id
    }
  }
`;

export default graphql(GET_USER_DATA)(AppRoutes);