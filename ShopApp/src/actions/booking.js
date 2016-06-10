import { CALL_API } from '../middleware/api';
import moment from 'moment';
import { replaceQuery } from './routing';
import { jsonPostConfig, authTokenConfig } from './utils';
import { merge } from 'lodash';
import { Schemas } from '../constants/Schemas';
import {
  AVAILABLES_BOOKING_RANGES_REQUEST,
  AVAILABLES_BOOKING_RANGES_SUCCESS,
  AVAILABLES_BOOKING_RANGES_FAILURE,
  SET_BOOKING_CALENDAR_DATE,
  SET_BOOKING_SERVICE,
  SET_BOOKING_RANGE,
  BOOK_REQUEST,
  BOOK_SUCCESS,
  BOOK_FAILURE
} from '../constants/ActionTypes';

// TODO: Find a better way to calculate the period
function calculateStartAndEndForCalendar(date) {
  const m = moment(date, 'YYYY-MM-DD');
  return {
    start: moment(m).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
    end: moment(m).add(1, 'month').endOf('month').format('YYYY-MM-DD')
  };
}

function calculateStartAndEndForSingleDay(date) {
  const m = moment(date, 'YYYY-MM-DD');
  return {
    start: date,
    end: moment(m).add(1, 'day').format('YYYY-MM-DD')
  };
}

export function loadBookingRanges(options = { loadSingleDay: false }) {
  return (dispatch, getState) => {
    const bookingState = getState().booking;

    // No enought info for a booking request
    if (!bookingState.service || !bookingState.calendarDate) {
      return;
    }

    const { service, calendarDate } = bookingState;
    const { loadSingleDay } = options;
    const { start, end } = loadSingleDay
      ? calculateStartAndEndForSingleDay(calendarDate)
      : calculateStartAndEndForCalendar(calendarDate);
    const endpoint = `/calculate-ranges?start=${start}&end=${end}&service=${service}`;

    dispatch({
      service,
      loadSingleDay,
      start,
      end,
      requestedAt: Date.now(),
      [CALL_API]: {
        endpoint,
        types: [
          AVAILABLES_BOOKING_RANGES_REQUEST,
          AVAILABLES_BOOKING_RANGES_SUCCESS,
          AVAILABLES_BOOKING_RANGES_FAILURE
        ]
      }
    });
  };
};

export function setBookingService(service) {
  return {
    service,
    type: SET_BOOKING_SERVICE
  };
};

export function setBookingCalendarDate(date, updateLocation = false) {
  return (dispatch, getState) => {
    dispatch({
      date,
      type: SET_BOOKING_CALENDAR_DATE
    });
    if (updateLocation) {
      dispatch(replaceQuery({ date }));
    }
  };
};

export function setBookingRange(range) {
  return {
    range,
    type: SET_BOOKING_RANGE
  };
};

export function book() {
  return (dispatch, getState) => {
    const {service, book: { range } } = getState().booking;

    // No enought info for booking
    if (!service || !range) {
      return;
    }

    const { start, end } = range;
    const config = merge(authTokenConfig(getState()), jsonPostConfig({
      service,
      start,
      end
    }));
    const endpoint = `/book-service/?start=${start}&end=${end}&service=${service}`;

    dispatch({
      entitySchema: Schemas.BOOKING,
      [CALL_API]: {
        endpoint,
        config,
        types: [
          BOOK_REQUEST,
          BOOK_SUCCESS,
          BOOK_FAILURE
        ]
      }
    });
  };
};
