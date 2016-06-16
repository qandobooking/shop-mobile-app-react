import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadShop } from '../actions/shop';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
} from 'react-native';

class ShopHome extends Component {
  componentWillMount() {
    this.props.loadShop();
  }

  render() {
    const { shop, isFetching, error } = this.props;

    if (isFetching) {
      return <View style={styles.container}><ActivityIndicatorIOS/></View>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to {shop.name}!
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
  return {
    shop: state.shop.data || {},
    isFetching: state.shop.isFetching,
    error: state.shop.error,
  };
}

export default connect(mapStateToProps, {
  loadShop,
})(ShopHome);
