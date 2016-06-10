import { CALL_API } from '../middleware/api';
import { jsonPostConfig } from './utils';
import { BOOKING_FRONTED_URL } from '../constants/Urls';
import {
  CLEAR_REGISTRATION,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE
} from '../constants/ActionTypes';

export function register({name, email, password}) {
  return (dispatch, getState) => {
    // TODO: Handle the custom redirect...
    const redirect = `${BOOKING_FRONTED_URL}?loginOpenModal=1&loginEmail=${email}&loginName=${name}`;

    return dispatch({
      [CALL_API]: {
        endpoint: `/registration-request/`,
        config : jsonPostConfig({name, email, password, redirect}),
        types: [
          USER_REGISTRATION_REQUEST,
          USER_REGISTRATION_SUCCESS,
          USER_REGISTRATION_FAILURE
        ]
      }
    });
  };
}

export const clearRegistration = () => ({
  type: CLEAR_REGISTRATION
});
