import { CALL_API } from '../middleware/api';
import {
  SHOP_REQUEST,
  SHOP_SUCCESS,
  SHOP_FAILURE
} from '../constants/ActionTypes';

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

export function loadShop() {
  return (dispatch, getState) => {
    dispatch(fetchShop(getState().app.shopId));
  };
};
