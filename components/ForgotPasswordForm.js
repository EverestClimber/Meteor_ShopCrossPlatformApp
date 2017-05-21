import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements'
//COMPONENTS
import LoadingScreen from './LoadingScreen';
import AuthLink from './AuthLink';
//MODULES
import { colorConfig, stylesConfig } from '../modules/config';
import apollo from '../ApolloClient.js';
import { forgotPassword, userId } from 'meteor-apollo-accounts'


// CONSTANTS & DESTRUCTURING
// ====================================
const { basicHeaderStyle, titleStyle } = stylesConfig;


// EXPORTED COMPONENT
// ====================================
class ForgotPasswordForm extends React.Component {
  state = { 
    loading: false, 
    errors: [],
    submitted: false
  }
 
  onSubmit = async () => {
    const { email }  = this.state;

    this.setState({loading: true, errors: []});

    if (!email) {
      let errors = this.state.errors;
      errors.push('please enter an email')
      return this.setState({errors: errors, loading: false});
    }

    forgotPassword({ email: email.trim().toLowerCase() }, apollo)
      .then(res => {
        apollo.resetStore();
        return this.setState({loading: false, submitted: true});
      })
      .catch(err => {
        return this.setState({loading: false});
      });

  }
  render(){
    const { handleSubmit, navigation, toggleForm } = this.props;

    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Logging in...'} />
      );
    }

    if(this.state.submitted) {
       return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 15, textAlign: 'center'}}>Successfully Recieved! Check your email</Text>
          </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{width: 250}}>
          <TextInput
            style={styles.input} 
            onChangeText={ (val) => this.setState({email: val}) }
            placeholder={'Email'}
          />
          <Button 
            title='RECOVER PASSWORD'
            backgroundColor={colorConfig.business} 
            onPress={this.onSubmit} 
            style={{marginTop: 10}} 
          />
          <View style={{marginTop: 8, marginBottom: 8, alignItems: 'center',  justifyContent: 'center',}}>
            {this.state.errors.length > 0 && this.state.errors.map(item => {
              return <Text key={item} style={{color: '#e74c3c'}}>{item}</Text>
            })}
          </View>
          <AuthLink  
            label='Or login' 
            toggleForm={() => toggleForm('login')} 
          />
        </View>
      </View>
    )
  }
}

// STYLES
// ====================================
const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: 'proximanovasoft-regular',
    color: '#666',
    textAlign: 'left',
    fontSize: 15,
  },
  buttonText: {
    fontFamily: 'proximanovasoft-bold',
    color: '#fff', 
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'transparent',
    backgroundColor: '#fff',
    opacity: 0.3,
    borderRadius: 3,
    marginBottom: 8,
    borderWidth: 1,
    padding: 3,
    height: 45,
    fontSize: 15,
    fontFamily: 'proximanovasoft-regular',
  }
})


// EXPORT
// ====================================
export default ForgotPasswordForm