import { combineReducers } from 'redux';
import bookings from './user-bookings';
import resetOnLogout from './utils/reset-on-logout';

export default resetOnLogout(combineReducers({
  bookings,
}));
