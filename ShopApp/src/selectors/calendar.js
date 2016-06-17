import { createSelector } from 'reselect';
import { keys } from 'lodash';
import moment from 'moment';

function mapDatesToCalendarEvents(availableDates){
  return availableDates.map(date => moment(date, 'YYYY-MM-DD'));
}

const getAvailablesBookingRanges = (state) => state.booking.ranges.items;

// Map bookings range to fullcalendar valid events
export const getBookingAvailblesCalendarDates = createSelector(
  [ getAvailablesBookingRanges ],
  ranges => keys(ranges)
);
