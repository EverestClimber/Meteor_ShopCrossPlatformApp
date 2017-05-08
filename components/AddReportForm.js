import React from 'react';
import { ImagePicker } from 'expo';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
//REDUX
import _ from 'lodash';
//COMPONENTS
import LoadingScreen from './LoadingScreen'
import { Button } from 'react-native-elements'
//MODULES
import { colorConfig } from '../modules/config';
import { graphql, withApollo } from 'react-apollo';
import { CREATE_REPORT } from '../apollo/mutations'
import { FETCH_WATCHGROUPS } from '../apollo/queries'
import { List, Radio, InputItem, SegmentedControl, TextareaItem, WhiteSpace } from 'antd-mobile';
import WatchgroupInput from './WatchgroupInput'
import client from '../ApolloClient';
import { handleFileUpload } from '../modules/helpers';

const RadioItem = Radio.RadioItem;

const PRIORITY_LEVEL = [
  { key: 1, value: '1', intValue: 1, label: 'General'},
  { key: 2, value: '2', intValue: 2, label: 'Suspicious but not Urgent'},
  { key: 3, value: '3', intValue: 3, label: 'Urgent'}
];

const data = [
      { value: 0, label: 'General' },
      { value: 1, label: 'Suspicious Vehicle' },
      { value: 2, label: 'Suspicious Person' },
      { value: 3, label: 'Checking In' },
      { value: 4, label: 'Checking Out' },
    ];

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

class AddReportForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      loading: false,
      watchgroupIds: [],
      messageValue: null,
      image: null, 
      value: 0,
      priorityLevel: null,
      reportType: null,
      erorrs: []
  }
    this.onImageClick = this.onImageClick.bind(this);
  }
  
  onSubmit = () => {
    const { messageValue, watchgroupIds, priorityLevel, reportType, image } = this.state;
    this.setState({loading: true})
    /*if (!messageValue || !watchgroupIds || !priorityLevel || !reportType ) {
      return 
    }*/
    let variables = {
      messageValue: messageValue,
      image: image,
      longitude: this.props.location.coords.longitude,
      latitude: this.props.location.coords.latitude,
      watchgroupId: watchgroupIds && watchgroupIds[0],
      priorityLevel: priorityLevel,
      reportType: reportType
    }
    this.props.mutate({ variables })
      .then(() => {
        client.resetStore()
        this.props.navigation.goBack()
        return this.setState({ visible: false });
    }).catch(e => console.log(e));
  }
  onGroupChange(value){

    let oldState = this.state.watchgroupIds;
    let newState;
    if (!this.state.watchgroupIds.includes(value)) {
      newState = _.uniqBy([ value, ...oldState]);
    } else {
      newState = oldState.filter((item)=>item!=value);
    }
    this.setState({watchgroupIds: newState })
  }
  async onImageClick(){
    let result;
    let _this = this;
    _this.setState({ loading: true });

    try {
      result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] }); 
    }

    catch(e) {
      _this.setState({ loading: false }); 
      return console.log(e);
    }

    if (!result.cancelled) {
      handleFileUpload(result, (error, response) => {
        if (error) { return console.log(error); }
        _this.setState({ image: response, loading: false }); 
      });
    }
    
    _this.setState({ loading: false }); 

  }
  render(){
    let { image } = this.state;

    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Adding your report...'} />
      );
    }
    
    if(this.props.data.loading) {
       return (
          <LoadingScreen loadingMessage={'Loading Form...'} />
      );
    }

    return (
      <View style={{width: 300}}>
        <View style={{marginBottom: 15, marginTop: 15}}>
            {!image && <Button title='Upload Image' onPress={this.onImageClick} />}
            {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
        </View>
        <List renderHeader={() => 'Description'}>
          <TextareaItem
              clear
              placeholder="Type your message here..."
              rows={4}
              onChange={(val)=>this.setState({messageValue: val})}
          />
        </List>
        <List renderHeader={() => 'Priority Level'}>
          {PRIORITY_LEVEL.map(i => (
            <RadioItem 
              key={i.value} 
              checked={this.state.priorityLevel === i.value} 
              onChange={() => this.setState({priorityLevel: i.value})}
            >
              {i.label}
            </RadioItem>
          ))}
        </List>
        <List renderHeader={() => 'Report Type'}>
          {data.map(i => (
            <RadioItem 
              key={i.value} 
              checked={this.state.reportType === i.label} 
              onChange={() => this.setState({reportType: i.label})}
            >
              {i.label}
            </RadioItem>
          ))}
        </List>
        <List renderHeader={() => 'Groups to Alert'}>
            <WatchgroupInput 
              watchgroups={this.props.data.watchgroups}
              selectedWatchgroupIds={this.state.watchgroupIds}
              onGroupChange={(value) => this.onGroupChange(value)}
            />
        </List>
        <View style={{marginTop: 20}}>
          <Button 
            title='ADD REPORT'
            backgroundColor={colorConfig.business} 
            onPress={this.onSubmit}
          />
        </View>
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


export default 
graphql(FETCH_WATCHGROUPS)(
  graphql(CREATE_REPORT)(AddReportForm)
);