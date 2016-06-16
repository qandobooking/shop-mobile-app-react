import { map as pluck } from 'lodash';
import {
  SERVICES_REQUEST,
  SERVICES_SUCCESS,
  SERVICES_FAILURE
} from '../constants/ActionTypes';

const initialState = {
  ids: [],
  isFetching: false,
  error: null,
};

export default function(state = initialState, action) {
  const { type, data, error } = action;

  switch (type) {
    case SERVICES_REQUEST:
      return { ...state, isFetching: true };

    case SERVICES_FAILURE:
      return { ...state, isFetching: false, error };

    case SERVICES_SUCCESS:
      return { ...state, isFetching: false, ids: pluck(data, 'id') };

    default:
      return state;
  }

  return state;
}
