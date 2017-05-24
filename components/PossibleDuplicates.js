import React from 'react';
import { List,  } from 'antd-mobile';
import { View, Text } from 'react-native';
// APOLLO
import { graphql, withApollo } from 'react-apollo';
import { FETCH_EXISTING_SHOPS, SEARCH_SHOPS_BY_OWNER, FETCH_MALLS } from '../apollo/queries'
import { CREATE_SHOP, ADD_ATTACHMENTS } from '../apollo/mutations'
import client from '../ApolloClient';

class PossibleDuplicates extends React.Component {
  constructor(props){
    super(props)
  }
  render(){

    const { loading, shopExists } = this.props.data;

    if (loading || shopExists.length === 0) {
      return null
    }

    return (
      <List renderHeader={() => 'Possible duplicate?'}>
        {shopExists.map( item => {
          return (
            <Text key={item._id} style={{fontSize: 15, color: 'red'}}>
              {item.title}
            </Text>
          )
        })}
      </List>
    );
  }
}



// EXPORT
// ====================================
export default graphql(FETCH_EXISTING_SHOPS, {
  options: (props) => {
    let variables = {
      string: props.title && props.title.length > 4 ? props.title : null, //if user has not typed in at least 4 characters yet, then do not search for duplicates
    };
    return { variables } 
  }
})(PossibleDuplicates)



