import { CALL_API } from '../middleware/api';
import {
  SHOP_REQUEST,
  SHOP_SUCCESS,
  SHOP_FAILURE,
  SET_SHOP_DATA
} from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';

function fetchShop(shopId) {
  return {
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

function fetchShopByDomain(shopDomain) {
  return {
    [CALL_API]: {
      endpoint: `/shops-by-domain/${shopDomain}`,
      types: [
        SHOP_REQUEST,
        SHOP_SUCCESS,
        SHOP_FAILURE
      ]
    }
  };
};


export const setShopData = (data) => ({
  type: SET_SHOP_DATA,
  data
});

export function loadShop() {
  return (dispatch, getState) => {
    dispatch(fetchShop(getState().app.shopId))
      .then(response => {
        if (response.data) {
          AsyncStorage.setItem('shopData', JSON.stringify(response.data));
        }
      });
  };
};

export function loadShopByDomain() {
  return (dispatch, getState) => {
    dispatch(fetchShopByDomain(getState().app.shopDomain))
      .then(response => {
        if (response.data) {
          AsyncStorage.setItem('shopData', JSON.stringify(response.data));
        }
      });
  };
};
