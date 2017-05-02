import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form'
//COMPONENTS
import LoadingScreen from './LoadingScreen'
//MODULES
import { colorConfig } from '../modules/config';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag'

const renderTextInput = ({ input, ...inputProps }) => {
  return (
    <TextInput
      style={styles.input} 
      onChangeText={input.onChange}
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

class AddDocument extends React.Component {
  state = { loading: false }
  onSubmitSuccess = () => {
    
  }
  onSubmit = ({ title, content }) => {
    this.setState({loading: true});
    this.props.mutate({ variables: { title, content } })
        .then(() => this.setState({ loading: false }))
        .catch( e => console.log('catch ran')  );

  }
  render(){
    const { handleSubmit } = this.props;

    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Adding your document...'} />
      );
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.labelStyle}>Title:</Text>
        <Field name="title" component={renderTextInput} />
        <Text style={styles.labelStyle}>Content:</Text>
        <Field name="content" component={renderTextArea} />
        <Button 
          title='ADD DOCUMENT' 
          onPress={handleSubmit(this.onSubmit.bind(this))} 
          style={{backgroundColor: colorConfig.business, marginTop: 10,}} 
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
  buttonText: {
    fontFamily: 'proximanovasoft-bold',
    color: '#fff', 
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
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
    margin: 'auto',
    fontFamily: 'proximanovasoft-regular',
  }
})


const ADD_DOCUMENT = gql`
  mutation CreateDocument ($title: String!, $content: String!){
      createDocument(title: $title, content: $content) {
        title,
      }
  }
`;

export default graphql(ADD_DOCUMENT)(
  reduxForm({form: 'AddDocumentForm'})(AddDocument)
);
