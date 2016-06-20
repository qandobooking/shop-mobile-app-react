import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadServices } from '../../actions/services';
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
    this.props.loadServices();
  }

  onPressButton(serviceId){
    this.props.servicesNavigator.push({detail:true, serviceId:serviceId, title:'Test' })
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(this.props.services)
    const { services, isFetching } = this.props;
    return (
      <View style={styles.container}>
      { isFetching && <ActivityIndicatorIOS/> }
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
    backgroundColor: '#000',
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
  const isFetching = state.services.isFetching;
  const services = state.services.ids.map(id => state.entities.services[id]);

  return {
    isFetching,
    services,
  };
}


export default connect(mapStateToProps, {
  loadServices,
})(ServicesList);
