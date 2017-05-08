import React from 'react';
import { View, Text} from 'react-native';
import { Checkbox } from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;



class WatchgroupInput extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const mappedGroups = this.props.watchgroups.map(item => { return { value: item._id, label: item.title } })
    return (
        <View>
        {mappedGroups.map(i => (
          <CheckboxItem 
            key={i.value}
            checked={this.props.selectedWatchgroupIds.includes(i.value)}
            onChange={() => this.props.onGroupChange(i.value)}
          >
            {i.label}
          </CheckboxItem>
        ))}
      </View>
    )
  }
}


export default WatchgroupInput