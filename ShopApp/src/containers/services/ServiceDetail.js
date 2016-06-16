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

class ServiceDetail extends Component {

  constructor(props){
    super(props);
    this.updateDate = this.updateDate.bind(this);
    this.viewBookingDate = this.viewBookingDate.bind(this);
  }

  viewBookingDate(bookingDate) {
    let title = moment(bookingDate).format('YYYY-MM-DD')
    this.props.servicesNavigator.push({
      bookingDay:true, bookingDate:bookingDate, title:title})
  }

  updateDate(newDate) {
    const newMoment = moment(newDate);
    this.props.setBookingCalendarDate(newMoment.format('YYYY-MM-DD'));
    this.props.loadBookingRanges();
  }

  componentWillMount() {
    this.props.setBookingService(this.props.serviceId);
    this.props.loadService(this.props.serviceId, true);
    this.props.loadBookingRanges();
    
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
          startDate={this.props.calendarDate}
          dayHeadings={customDayHeadings}
          onTouchNext={this.updateDate}
          onSwipeNext={this.updateDate}
          onTouchPrev={this.updateDate}
          onSwipePrev={this.updateDate}
          today={null}
          onDateSelect={(date)=>this.viewBookingDate(date)}
          customStyle={
            { eventIndicator: {
                backgroundColor: 'skyblue',
              }
            }
          }
          eventDates={this.props.availableDates}   >
        </Calendar>
        { this.props.isFetchingRanges && <ActivityIndicatorIOS/> }
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
  let calendarDate = state.booking.calendarDate;
  let isFetchingRanges = state.booking.ranges.isFetching;
  return {
    service,
    calendarDate,
    availableDates : getBookingAvailblesCalendarDates(state),
    isFetchingRanges : isFetchingRanges
  };
}


export default connect(mapStateToProps, {
  loadService,
  setBookingCalendarDate,
  setBookingService,
  loadBookingRanges,

})(ServiceDetail);
