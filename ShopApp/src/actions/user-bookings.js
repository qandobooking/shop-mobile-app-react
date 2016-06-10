import { merge } from 'lodash';
import { replaceQuery } from './routing';
import moment from 'moment';
import { CALL_API } from '../middleware/api';
import { jsonPostConfig, authTokenConfig } from './utils';
import { isPageError } from './page-error';
import { Schemas } from '../constants/Schemas';
import {
  INCOMING_USER_BOOKINGS_REQUEST,
  INCOMING_USER_BOOKINGS_SUCCESS,
  INCOMING_USER_BOOKINGS_FAILURE,
  SET_INCOMING_USER_BOOKINGS_VIEW,
  SET_INCOMING_USER_BOOKINGS_STATUS_FILTER,
  SET_INCOMING_USER_BOOKINGS_SEARCH_FILTER,
  HISTORY_USER_BOOKINGS_REQUEST,
  HISTORY_USER_BOOKINGS_SUCCESS,
  HISTORY_USER_BOOKINGS_FAILURE,
  SET_HISTORY_USER_BOOKINGS_PAGE,
  RESET_HISTORY_USER_BOOKINGS_PAGINATION,
  SET_HISTORY_USER_BOOKINGS_SEARCH_FILTER,
  USER_BOOKING_REQUEST,
  USER_BOOKING_SUCCESS,
  USER_BOOKING_FAILURE,
  ACTION_ON_USER_BOOKING_REQUEST,
  ACTION_ON_USER_BOOKING_SUCCESS,
  ACTION_ON_USER_BOOKING_FAILURE,
  CLEAR_ACTION_ERROR_ON_USER_BOOKING
} from '../constants/ActionTypes';
import {
  MAX_PAGE_SIZE
} from '../constants/Api';

function fetchIncomingUserBookings() {
  return (dispatch, getState) => {
    // Circa time for incoming bookings
    const start = moment().subtract(1, 'hours').format('YYYY-MM-DDTHH:00:00');
    return dispatch({
      entitySchema: Schemas.BOOKING_ARRAY,
      ...isPageError(),
      [CALL_API]: {
        endpoint: `/bookings/?start__gte=${start}&page_size=${MAX_PAGE_SIZE}&ordering=+start`,
        config: authTokenConfig(getState()),
        types: [
          INCOMING_USER_BOOKINGS_REQUEST,
          INCOMING_USER_BOOKINGS_SUCCESS,
          INCOMING_USER_BOOKINGS_FAILURE
        ]
      }
    });
  };
};

export function loadIncomingUserBookings() {
  return (dispatch, getState) => {
    if (!getState().userData.bookings.incoming.list.isFetching) {
      dispatch(fetchIncomingUserBookings());
    }
  };
};

export const setIncomingUserBookingsView = (view) => ({
  view,
  type: SET_INCOMING_USER_BOOKINGS_VIEW,
});

export function setIncomingUserBookingsSearchFilter(search, updateLocation = false) {
  return (dispatch, getState) => {
    dispatch({
      search,
      type: SET_INCOMING_USER_BOOKINGS_SEARCH_FILTER,
    });
    if (updateLocation) {
      const query = getState().routing.locationBeforeTransitions.query;
      dispatch(replaceQuery({ ...query, search }));
    }
  };
};

export function setIncomingUserBookingsStatusFilter(status, updateLocation = false) {
  return (dispatch, getState) => {
    dispatch({
      status,
      type: SET_INCOMING_USER_BOOKINGS_STATUS_FILTER,
    });
    if (updateLocation) {
      const query = getState().routing.locationBeforeTransitions.query;
      dispatch(replaceQuery({ ...query, status }));
    }
  };
};

export function loadHistoryUserBookings() {
  return (dispatch, getState) => {
    const {
      list: { pagination },
      filters
    } = getState().userData.bookings.history;
    const { pageSize, currentPage } = pagination;
    const { search } = filters;

    return dispatch({
      filters,
      pageSize,
      page: currentPage,
      entitySchema: Schemas.BOOKING_ARRAY,
      // TODO: Consider to take isPageError as argument
      ...isPageError(),
      [CALL_API]: {
        endpoint: `/bookings/?search=${search}&page_size=${pageSize}&page=${currentPage}&ordering=-start`,
        config: authTokenConfig(getState()),
        types: [
          HISTORY_USER_BOOKINGS_REQUEST,
          HISTORY_USER_BOOKINGS_SUCCESS,
          HISTORY_USER_BOOKINGS_FAILURE
        ]
      }
    });
  };
};

export function setHistoryUserBookingsPage(page, updateLocation = false) {
  return (dispatch, getState) => {
    dispatch({ type: SET_HISTORY_USER_BOOKINGS_PAGE, page });
    if (updateLocation) {
      const query = getState().routing.locationBeforeTransitions.query;
      dispatch(replaceQuery({ ...query, page }));
    }
  };
};

function resetHistoryUserBookingsPagination() {
  return (dispatch, getState) => {
    dispatch({
      type: RESET_HISTORY_USER_BOOKINGS_PAGINATION
    });
  };
}

export function setHistoryUserBookingsSearchFilter(search, updateLocation = false) {
  return (dispatch, getState) => {
    dispatch({
      search,
      type: SET_HISTORY_USER_BOOKINGS_SEARCH_FILTER,
    });
    if (updateLocation) {
      const query = getState().routing.locationBeforeTransitions.query;
      dispatch(replaceQuery({ ...query, search, page: 1 }));
    }
    dispatch(resetHistoryUserBookingsPagination());
  };
};

function fetchUserBooking(bookingId) {
  return (dispatch, getState) => {
    return dispatch({
      entitySchema: Schemas.BOOKING,
      ...isPageError(),
      [CALL_API]: {
        endpoint: `/bookings/${bookingId}/`,
        config: authTokenConfig(getState()),
        types: [
          USER_BOOKING_REQUEST,
          USER_BOOKING_SUCCESS,
          USER_BOOKING_FAILURE
        ]
      }
    });
  };
};

export function loadUserBooking(bookingId) {
  return (dispatch, getState) => {
    // Always fetch the booking
    dispatch(fetchUserBooking(bookingId));
  };
};

export function actionOnUserBooking(bookingId, actionName) {
  return (dispatch, getState) => {
    const performedAction = getState().userData.bookings.actions[bookingId];

    // Another action performing, do nothing
    if (performedAction && performedAction.isSaving) {
      return;
    }

    return dispatch({
      bookingId,
      actionName,
      entitySchema: Schemas.BOOKING,
      [CALL_API]: {
        endpoint: `/bookings/${bookingId}/${actionName}/`,
        config: merge(authTokenConfig(getState()), jsonPostConfig()),
        types: [
          ACTION_ON_USER_BOOKING_REQUEST,
          ACTION_ON_USER_BOOKING_SUCCESS,
          ACTION_ON_USER_BOOKING_FAILURE
        ]
      }
    });
  };
};

export const clearActionErrorOnUserBooking = (bookingId) => ({
  bookingId,
  type: CLEAR_ACTION_ERROR_ON_USER_BOOKING
});
