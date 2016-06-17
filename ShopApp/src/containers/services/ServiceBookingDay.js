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
    this.props.setBookingCalendarDate(this.props.bookingDate);
    this.props.loadBookingRanges({loadSingleDay:true});
  }

  render() {

    if(!this.props.loading){
      if(this.props.bookingRanges.length) { 
        return this.renderList() } 
      else {
        return this.renderInvalidDate()
      }
    }
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS/>
      </View>

    )
  }

  renderInvalidDate() {
    return (
      <View style={styles.container}>
      <TouchableHighlight style={styles.title} onPress={()=>this.props.servicesNavigator.pop()}>
          <Text>Scegli un altra data</Text>
      </TouchableHighlight>
      </View>

    )
  }

  renderList() {

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(this.props.bookingRanges)

    return (
        <View style={styles.container}>
        <ListView
        dataSource={dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => (
          <View style={styles.row}>
            <TouchableHighlight style={styles.title}>
              <Text>{rowData.start} - {rowData.end}</Text>
            </TouchableHighlight>
            <Text style={styles.description}>{rowData.description}</Text>
          </View>

        )}
      >
      </ListView>
      </View>
      )
  }



}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop:70,
  },
  row: {
    flex : 1
  }
  
});


function mapStateToProps(state, ownProps) {
  let service = state.entities.services[ownProps.serviceId];
  let calendarDate = state.booking.calendarDate;
  const bookingRanges = state.booking.ranges.items[state.booking.calendarDate] || [];
  const loading = state.booking.ranges.isFetching;

  return {
    service,
    calendarDate,
    bookingRanges,
    loading,
  };
}


export default connect(mapStateToProps, {
  //loadService,
  setBookingCalendarDate,
  //setBookingService,
  loadBookingRanges,

})(ServiceBookingDay);
