import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadShopServices } from '../actions/shops'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';


class ServicesList extends Component {

  componentWillMount() {
    this.props.loadShopServices();
  }

  onPressButton(){
    this.props.navigator.push({detail:true})
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(this.props.services)
    const { services, isFetchingServices } = this.props;
    return (
      <View style={styles.container}>
      { isFetchingServices && <ActivityIndicatorIOS/> }
      <ListView
        dataSource={dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => (
          <View style={styles.row}>
          <TouchableHighlight onPress={this.onPressButton.bind(this)}>
            <Text>{rowData.name}</Text>
          </TouchableHighlight>
          </View>

        )}
      >
      </ListView>

      </View>
    );
  }
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});


function mapStateToProps(state) {
  const shopId = state.shopId;
  const shopServicesRes = state.shopServices[shopId];

  let isFetchingServices = null;
  let services = [];

  if (shopServicesRes) {
    isFetchingServices = shopServicesRes.isFetching;
    services = shopServicesRes.ids.map(id => state.entities.services[id]);
  }

  return {
    isFetchingServices,
    services,
  };
}


export default connect(mapStateToProps, {
  loadShopServices,
})(ServicesList);
