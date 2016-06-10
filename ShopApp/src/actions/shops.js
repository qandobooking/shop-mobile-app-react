import { CALL_API } from '../middleware/api';
import { Schemas } from '../constants/Schemas';
import { isPageError, setPageError } from './page-error';
import {
  SHOPS_REQUEST,
  SHOPS_SUCCESS,
  SHOPS_FAILURE,
  SHOP_REQUEST,
  SHOP_SUCCESS,
  SHOP_FAILURE,
  SHOP_SERVICES_REQUEST,
  SHOP_SERVICES_SUCCESS,
  SHOP_SERVICES_FAILURE,
  SHOP_SERVICE_REQUEST,
  SHOP_SERVICE_SUCCESS,
  SHOP_SERVICE_FAILURE
} from '../constants/ActionTypes';

function fetchShops() {
  return {
    entitySchema: Schemas.SHOP_ARRAY,
    ...isPageError(),
    [CALL_API]: {
      endpoint: '/shops',
      types: [
        SHOPS_REQUEST,
        SHOPS_SUCCESS,
        SHOPS_FAILURE
      ]
    }
  };
};

export function loadShops() {
  return (dispatch, getState) => {
    if (!getState().homeShops.isFetching) {
      dispatch(fetchShops());
    }
  };
};

function fetchShop(shopId) {
  return {
    entitySchema: Schemas.SHOP,
    ...isPageError(),
    [CALL_API]: {
      endpoint: `/shops/${shopId}`,
      types: [
        SHOP_REQUEST,
        SHOP_SUCCESS,
        SHOP_FAILURE
      ]
    }
  };
};

export function loadShop() {
  return (dispatch, getState) => {
    
    dispatch(fetchShop(getState().shopId));
    
  };
};

function fetchShopServices(shopId) {
  return {
    shopId,
    //...isPageError(),
    entitySchema: Schemas.SERVICE_ARRAY,
    [CALL_API]: {
      endpoint: `/shops/${shopId}/services`,
      types: [
        SHOP_SERVICES_REQUEST,
        SHOP_SERVICES_SUCCESS,
        SHOP_SERVICES_FAILURE
      ]
    }
  }
}

export function loadShopServices() {
  return (dispatch, getState) => {
    dispatch(fetchShopServices(getState().shopId));
  };
};

function fetchShopService(shopId, serviceId) {
  return {
    entitySchema: Schemas.SERVICE,
    ...isPageError(),
    [CALL_API]: {
      endpoint: `/shops/${shopId}/services/${serviceId}`,
      types: [
        SHOP_SERVICE_REQUEST,
        SHOP_SERVICE_SUCCESS,
        SHOP_SERVICE_FAILURE
      ]
    }
  }
}

export function loadShopService(shopId, serviceId) {
  return (dispatch, getState) => {
    const service = getState().entities.services[serviceId];
    if (! service) {
      dispatch(fetchShopService(shopId, serviceId));
    } else if (Number(service.shop) !== Number(shopId)) {
      // Force 404...
      dispatch(setPageError({
        status: 404,
        statusText: 'Not Found'
      }));
    }
  };
};
