import {
  ACTION_ON_USER_BOOKING_REQUEST,
  ACTION_ON_USER_BOOKING_SUCCESS,
  ACTION_ON_USER_BOOKING_FAILURE,
  CLEAR_ACTION_ERROR_ON_USER_BOOKING
} from '../../constants/ActionTypes';

const initialUserBookingActionState = {
  isSaving: false,
  actionName: null,
  error: null,
};
function userBookingAction(state = initialUserBookingActionState, action) {
  if (action.type === ACTION_ON_USER_BOOKING_REQUEST) {
    return { ...state, isSaving: true, actionName: action.actionName, error: null };
  }

  if (action.type === ACTION_ON_USER_BOOKING_SUCCESS) {
    return { ...state, isSaving: false };
  }

  if (action.type === ACTION_ON_USER_BOOKING_FAILURE) {
    return { ...state, isSaving: false, error: action.error };
  }

  if (action.type === CLEAR_ACTION_ERROR_ON_USER_BOOKING) {
    return { ...state, error: null };
  }

  return state;
}

export default function userBookingsActions(state = {}, action) {
  switch (action.type) {

    case ACTION_ON_USER_BOOKING_REQUEST:
    case ACTION_ON_USER_BOOKING_SUCCESS:
    case ACTION_ON_USER_BOOKING_FAILURE:
    case CLEAR_ACTION_ERROR_ON_USER_BOOKING:
      return {
        ...state,
        [action.bookingId]: userBookingAction(state[action.bookingId], action)
      };

    default:
      return state;
  }
}
