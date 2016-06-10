import { combineReducers } from 'redux';
//import {reducer as formReducer} from 'redux-form';
import entities from './entities';
import simpleResList from './utils/simple-res-list';
//import booking from './booking';
//import userData from './user-data';
//import auth from './auth';
//import registration from './registration';
//import pageError from './page-error';
import {
  SHOPS_REQUEST,
  SHOPS_SUCCESS,
  SHOPS_FAILURE,
  SHOP_SERVICES_REQUEST,
  SHOP_SERVICES_SUCCESS,
  SHOP_SERVICES_FAILURE
} from '../constants/ActionTypes';

const homeShops = simpleResList([
  SHOPS_REQUEST,
  SHOPS_SUCCESS,
  SHOPS_FAILURE
]);

const service = simpleResList([
  SHOP_SERVICES_REQUEST,
  SHOP_SERVICES_SUCCESS,
  SHOP_SERVICES_FAILURE
]);

function shopServices(state = {}, action){
  switch(action.type) {

    case SHOP_SERVICES_REQUEST:
    case SHOP_SERVICES_FAILURE:
    case SHOP_SERVICES_SUCCESS:
      return {
        ...state,
        [action.shopId] : service(state[action.shopId], action)
      };

    default:
      return state;
  }
}

function shopId(state=null, action){
  return state;
}

const rootReducer = combineReducers({
  entities,
  homeShops,
  shopServices,
  shopId,
  //booking,
  //auth,
  //registration,
  //userData,
  //pageError,
  //form: formReducer,
});

export default rootReducer;
