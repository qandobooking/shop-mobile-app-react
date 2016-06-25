import { combineReducers } from 'redux';
import app from './app';
import drawer from './drawer';
import tabs from './tabs';
import entities from './entities';
import shop from './shop';
import services from './services';
import booking from './booking';
import auth from './auth';
import userData from './userData';

const rootReducer = combineReducers({
  app,
  auth,
  drawer,
  tabs,
  entities,
  shop,
  services,
  booking,
  userData,
});

export default rootReducer;
