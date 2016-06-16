import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
} from 'react-native';


class ShopHome extends Component {
  render() {
    if(!this.props.shop){
      return <View style={styles.container}><ActivityIndicatorIOS/></View>
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to {this.props.shop.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});

function mapStateToProps(state, ownProps) {
  
  let shop = state.entities.shops[state.shopId];
  
  return {
    shop,
  };
}


export default connect(mapStateToProps)(ShopHome);