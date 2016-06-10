import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadShopServices } from '../actions/shops'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS
} from 'react-native';


class ServicesList extends Component {

  componentWillMount() {
    this.props.loadShopServices();
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(this.props.services)
    const { services, isFetchingServices } = this.props;
    return (
      <View>
      { isFetchingServices && <ActivityIndicatorIOS/> }
      <ListView
        dataSource={dataSource}
        renderRow={(rowData) => (
          <View style={styles.row}>
            <Text>{rowData.name}</Text>
          </View>

        )}
      >
      </ListView>

      </View>
    );
  }
}

var styles = StyleSheet.create({
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
