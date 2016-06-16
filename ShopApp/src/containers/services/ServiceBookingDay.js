import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadService } from '../../actions/services';
import { setBookingCalendarDate, setBookingService, 
  loadBookingRanges } from '../../actions/booking';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import {getBookingAvailblesCalendarDates} from  '../../selectors/calendar'


import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';


const customDayHeadings = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

class ServiceBookingDay extends Component {

  constructor(props){
    super(props);
  }

 

  componentWillMount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.row}>
          {this.props.bookingDate}
        </Text>
        
      </View>

    )
  }
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop:50,
  },
  row: {
    flex : 1
  }
  
});


function mapStateToProps(state, ownProps) {
  let service = state.entities.services[ownProps.serviceId];
  let calendarDate = state.booking.calendarDate;
  return {
    service,
    calendarDate
  };
}


export default connect(mapStateToProps, {
  //loadService,
  //setBookingCalendarDate,
  //setBookingService,
  //loadBookingRanges,

})(ServiceBookingDay);
