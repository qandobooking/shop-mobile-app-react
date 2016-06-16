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

  onPressButton(serviceId){
    this.props.navigator.push({detail:true, serviceId:serviceId, title:'Test' })
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
            <TouchableHighlight style={styles.title} onPress={()=>this.onPressButton(rowData.id)}>
              <Text>{rowData.name} {rowData.id}</Text>
            </TouchableHighlight>
            <Text style={styles.description}>{rowData.description}</Text>
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
    paddingTop:50,
  },
  
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  title : {
    flex : 1
  },
  description : {
    flex:1,
    backgroundColor: '#F6F6F6'
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
