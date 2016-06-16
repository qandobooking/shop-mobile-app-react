import { combineReducers } from 'redux';
import app from './app';
import tabs from './tabs';
import entities from './entities';
import shop from './shop';
import services from './services';
import booking from './booking';

const rootReducer = combineReducers({
  app,
  tabs,
  entities,
  shop,
  services,
  booking,
});

export default rootReducer;
