import { CALL_API } from '../middleware/api';
import { Schemas } from '../constants/Schemas';
import {
  SERVICES_REQUEST,
  SERVICES_SUCCESS,
  SERVICES_FAILURE,
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_FAILURE
} from '../constants/ActionTypes';

function fetchServices(shopId) {
  return {
    entitySchema: Schemas.SERVICE_ARRAY,
    [CALL_API]: {
      endpoint: `/shops/${shopId}/services`,
      types: [
        SERVICES_REQUEST,
        SERVICES_SUCCESS,
        SERVICES_FAILURE
      ]
    }
  }
}

export function loadServices() {
  return (dispatch, getState) => {
    dispatch(fetchServices(getState().app.shopId));
  };
};

function fetchService(shopId, serviceId) {
  return {
    entitySchema: Schemas.SERVICE,
    [CALL_API]: {
      endpoint: `/shops/${shopId}/services/${serviceId}`,
      types: [
        SERVICE_REQUEST,
        SERVICE_SUCCESS,
        SERVICE_FAILURE
      ]
    }
  }
}

export function loadService(serviceId, forceReload = false) {
  return (dispatch, getState) => {
    const service = getState().entities.services[serviceId];
    if (!service || forceReload) {
      dispatch(fetchService(getState().app.shopId, serviceId));
    }
  };
};
