import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadService } from '../../actions/services';
import Calendar from 'react-native-calendar';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';


class ServiceDetail extends Component {

  componentWillMount() {
    this.props.loadService(this.props.serviceId, true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.row}>
          {this.props.service.name}
        </Text>
        <Calendar 
          style={styles.calendar} 
          showControls={true} scrollEnabled={true}
          eventDates={['2016-06-20', '2016-06-21']}   >
        </Calendar>
      </View>

    )
  }
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingTop:50,
  },
  calendar: {
    flex: 1,
    backgroundColor: 'blue'
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


function mapStateToProps(state, ownProps) {
  let service = state.entities.services[ownProps.serviceId];
  return {
    service,
  };
}


export default connect(mapStateToProps, {
  loadService,
})(ServiceDetail);
