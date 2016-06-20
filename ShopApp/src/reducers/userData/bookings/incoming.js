import { combineReducers } from 'redux';
import {
  INCOMING_USER_BOOKINGS_REQUEST,
  INCOMING_USER_BOOKINGS_SUCCESS,
  INCOMING_USER_BOOKINGS_FAILURE,
  SET_INCOMING_USER_BOOKINGS_VIEW,
  SET_INCOMING_USER_BOOKINGS_STATUS_FILTER,
  SET_INCOMING_USER_BOOKINGS_SEARCH_FILTER
} from '../../../constants/ActionTypes';
import {
  INCOMING_USER_BOOKINGS_LIST
} from '../../../constants/ViewTypes';

function incomingUserBookingsList(state = { ids: [], isFetching: false, error: null }, action) {
  const { type, data, error } = action;

  switch (type) {
    case INCOMING_USER_BOOKINGS_REQUEST:
      return { ...state, isFetching: true };

    case INCOMING_USER_BOOKINGS_FAILURE:
      return { ...state, isFetching: false, error };

    case INCOMING_USER_BOOKINGS_SUCCESS:
      return { ...state, isFetching: false, ids: pluck(data, 'id'), error: null };

    default:
      return state;
  }
}

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
