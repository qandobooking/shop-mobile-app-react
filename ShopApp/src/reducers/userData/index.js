import { combineReducers } from 'redux';
import bookings from './bookings';
import {
  USER_LOGOUT
} from '../../constants/ActionTypes';

function resetOnLogout(reducer) {
  return (state, action) => {
    if (action.type === USER_LOGOUT) {
      return reducer(undefined, action);
    }

    return reducer(state, action);
  };
};

export default resetOnLogout(combineReducers({
  bookings,
}));
