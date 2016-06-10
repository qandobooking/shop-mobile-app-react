import { combineReducers } from 'redux';
import simpleResList from '../utils/simple-res-list';
import {
  INCOMING_USER_BOOKINGS_REQUEST,
  INCOMING_USER_BOOKINGS_SUCCESS,
  INCOMING_USER_BOOKINGS_FAILURE,
  SET_INCOMING_USER_BOOKINGS_VIEW,
  SET_INCOMING_USER_BOOKINGS_STATUS_FILTER,
  SET_INCOMING_USER_BOOKINGS_SEARCH_FILTER
} from '../../constants/ActionTypes';
import {
  INCOMING_USER_BOOKINGS_LIST
} from '../../constants/ViewTypes';

const incomingUserBookingsList = simpleResList([
  INCOMING_USER_BOOKINGS_REQUEST,
  INCOMING_USER_BOOKINGS_SUCCESS,
  INCOMING_USER_BOOKINGS_FAILURE
]);

function incomingUserBookingsView(state = INCOMING_USER_BOOKINGS_LIST, action) {
  const { view, type } = action;

  if (type === SET_INCOMING_USER_BOOKINGS_VIEW) {
    return view;
  }

  return state;
}

function incomingUserBookingsSearchFilter(state = '', action) {
  const { search, type } = action;

  if (type === SET_INCOMING_USER_BOOKINGS_SEARCH_FILTER) {
    return search;
  }

  return state;
}

function incomingUserBookingsStatusFilter(state = null, action) {
  const { status, type } = action;

  if (type === SET_INCOMING_USER_BOOKINGS_STATUS_FILTER) {
    return status;
  }

  return state;
}

export default combineReducers({
  list: incomingUserBookingsList,
  filters: combineReducers({
    search: incomingUserBookingsSearchFilter,
    status: incomingUserBookingsStatusFilter,
  }),
  view: incomingUserBookingsView,
});
