import { combineReducers } from 'redux';
import actions from './actions';
import incoming from './incoming';
import history from './history';

export default combineReducers({
  incoming,
  history,
  actions,
});
