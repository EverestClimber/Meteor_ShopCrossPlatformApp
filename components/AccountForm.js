import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
//REDUX
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form'
import { graphql } from 'react-apollo'
//COMPONENTS
import LoadingScreen from './LoadingScreen'
//MODULES
import { colorConfig, stylesConfig } from '../modules/config';
import { SAVE_USERPROFILE } from '../apollo/mutations';
import { GET_USER_DATA } from '../apollo/queries';
import client from '../ApolloClient';
import { Icon, Button, Card } from 'react-native-elements';
import { List, Picker, Checkbox, Radio, InputItem, SegmentedControl, TextareaItem, WhiteSpace } from 'antd-mobile';


const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

const CELL_VISIBILITY_OPTIONS = [
  { value: 'show', label: 'show'},
  { value: 'hide', label: 'hide'}
];

const GENDER_OPTIONS = [
  { value: 'male', label: 'male'},
  { value: 'female', label: 'female'},
  { value: 'other', label: 'other'},
]

class AccountForm extends React.Component {
  constructor(props){
    super(props);
    const { user } = this.props.screenProps.data;
    this.state = { 
      loading: false,
      firstName: user.profile && user.profile.firstName || null,
      lastName: user.profile && user.profile.lastName || null,
      email: user.emails && user.emails[0].address || null,
    }
  }
  
  onSubmit = () => {
    this.setState({loading: true});
    const { firstName, lastName, email, gender, cell, cellVisibility, watchgroupIds } = this.state;
    const variables = { firstName, lastName, email, gender, cell, cellVisibility, watchgroupIds };

    //refetchQueries: [{ query: GET_USER_DATA }]
    this.props.mutate({ variables })
        .then(() => {
          this.setState({ loading: false });
        })
        .catch( e => console.log(e)  );
  }
  render(){
    const { handleSubmit, screenProps } = this.props;
    const { user } = screenProps.data;

    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Saving...'} />
      );
    }

    /*if(this.props.data.loading) {
       return (
          <LoadingScreen loadingMessage={'Loading Profile...'} />
      );
    }*/

    
    return (
      <View style={{width: 300}}>
      <List renderHeader={() => 'Account Information'}>
        <InputItem
            clear
            placeholder="First Name..."
            onChange={(val)=>this.setState({firstName: val})}
            defaultValue={user.profile && user.profile.firstName && user.profile.firstName || ''}
        />
        <InputItem
            clear
            placeholder="Last Name..."
            onChange={(val)=>this.setState({lastName: val})}
            defaultValue={user.profile && user.profile.lastName && user.profile.lastName || ''}
        />
        <InputItem
            clear
            placeholder="Email..."
            onChange={(val)=>this.setState({email: val})}
            defaultValue={user.emails && user.emails[0].address}
        />
        </List>    
        <Button 
          title='SAVE PROFILE'
          backgroundColor={colorConfig.business} 
          onPress={this.onSubmit}
          style={{marginTop: 10}} 
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: 'proximanovasoft-regular',
    color: '#666',
    textAlign: 'left',
    fontSize: 15,
  },
  linkText: {
    color: colorConfig.business,
  fontSize: 15,
  fontFamily: stylesConfig.boldFont,
  },
  buttonText: {
    fontFamily: 'proximanovasoft-bold',
    color: '#fff', 
    fontSize: 18,
  },
  textArea: {
    borderColor: colorConfig.lightGrey,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 4,
    borderWidth: 1,
    height: 100,
    width: 250,
    fontSize: 15,
    padding: 3,
    fontFamily: 'proximanovasoft-regular',
  },
  input: {
    borderColor: colorConfig.lightGrey,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 4,
    borderWidth: 1,
    padding: 3,
    height: 37,
    width: 250,
    fontSize: 15,
    fontFamily: 'proximanovasoft-regular',
  }
})


/*{ 
  options: { refetchQueries: [ GET_USER_DATA ] }
}*/
export default graphql(SAVE_USERPROFILE)(AccountForm)

/*const renderTextInput = ({ input, ...inputProps }) => {
  return (
    <TextInput
      style={styles.input} 
      onChangeText={input.onChange}
      {...inputProps}
    />
  );
}



const renderSelectInput = ({ input, ...inputProps }) => {
  return (
    <SegmentedControl
        values={['Show', 'Hide']}
        tintColor={colorConfig.business}
        onValueChange={input.onChange}
        {...inputProps}
      />
  );
}

const renderTextArea = ({ input, ...inputProps }) => {
  return (
    <TextInput
      multiline={true}
      numberOfLines={4}
      style={styles.textArea} 
      onChangeText={input.onChange}
      {...inputProps}
    />
  );
}

class AccountForm extends React.Component {
  state = { loading: false }
  onSubmit = (values) => {
    this.setState({loading: true});
    this.props.submitContactUsForm(values, () => {
      this.setState({loading: false});
    });
  }
  render(){
    const { handleSubmit } = this.props;

    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Submitting your message...'} />
      );
    }

    return (
      <View>
        
        <Text style={styles.labelStyle}>
          First Name:
        </Text>
        <Field name="firstName"  component={renderTextInput} />
        
        <Text style={styles.labelStyle}>
          Last Name:
        </Text>
        <Field name="lastName" component={renderTextInput} />
        
        <Text style={styles.labelStyle}>
          Cell:
        </Text>
        <Field name="cell" component={renderTextInput} />

        <Text style={styles.labelStyle}>
          Cell Visibility:
        </Text>
        <Field name="cellVisibility" component={renderSelectInput} />
        
        <Text style={styles.labelStyle}>
          Email:
        </Text>
        <Field name="email" component={renderTextInput} />

        <Button 
          title='SAVE PROFILE'
          backgroundColor={colorConfig.business} 
          onPress={handleSubmit(this.onSubmit)}
          style={{marginTop: 10}} 
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: 'proximanovasoft-regular',
    color: '#666',
    textAlign: 'left',
    fontSize: 15,
  },
  linkText: {
    color: colorConfig.business,
  fontSize: 15,
  fontFamily: stylesConfig.boldFont,
  },
  buttonText: {
    fontFamily: 'proximanovasoft-bold',
    color: '#fff', 
    fontSize: 18,
  },
  textArea: {
    borderColor: colorConfig.lightGrey,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 4,
    borderWidth: 1,
    height: 100,
    width: 250,
    fontSize: 15,
    padding: 3,
    fontFamily: 'proximanovasoft-regular',
  },
  input: {
    borderColor: colorConfig.lightGrey,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 4,
    borderWidth: 1,
    padding: 3,
    height: 37,
    width: 250,
    fontSize: 15,
    fontFamily: 'proximanovasoft-regular',
  }
})



AccountForm = reduxForm({
    form: 'AccountForm',
    enableReinitialize : true 
  })(AccountForm)

AccountForm = connect((state, ownProps) => {
      console.log(ownProps.screenProps.data.user.profile.firstName)
      return {
        initialValues: {
          firstName: ownProps.screenProps.data.user.profile.firstName
        }
      }
    }, actions)(AccountForm);

export default AccountForm*/

