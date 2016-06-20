import { CALL_API } from '../middleware/api';
import { jsonPostConfig, authTokenConfig } from './utils';
import { AsyncStorage } from 'react-native';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  USER_LOGOUT,
  SET_USER_TOKEN,
  SHOW_MODAL_LOGIN,
  HIDE_MODAL_LOGIN
} from '../constants/ActionTypes';

function loginRequest({email, password}) {
  return {
    [CALL_API]: {
      endpoint: `/auth/`,
      config : jsonPostConfig({email, password}),
      types: [
        USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAILURE
      ]
    }
  };
}

function meRequest() {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/me/`,
        config : authTokenConfig(getState()),
        types: [
          ME_REQUEST,
          ME_SUCCESS,
          ME_FAILURE
        ]
      }
    })
  };
}

export function login({email, password}) {
  return (dispatch, getState) => {
    return dispatch(loginRequest({email, password}))
    .then(response => {
      if (response.error) {
        return response;
      }
      return dispatch(meRequest())
      .then(response => {
        if (response.error) {
          return response;
        }
        const token = getState().auth.token;
        AsyncStorage.setItem('userToken', token);
        return token;
      });
    });
  };
}

export function logout() {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT });
    AsyncStorage.removeItem('userToken');

    // TODO: Maybe Re-implement with push state
    //dispatch(replace('/'));
  };
}

export function loginWithToken(token) {
  return (dispatch, getState) => {
    dispatch({ type: SET_USER_TOKEN, token });
    dispatch(meRequest());
  };
}

// TODO: Maybe Re-implement with React native modal...
//export function showModalLogin(options = {}) {
  //const { name, email, redirect } = {
    //...{
      //name: null,
      //email: null,
      //redirect: null,
    //},
    //...options
  //};
  //return { type: SHOW_MODAL_LOGIN, name, email, redirect };
//}

//export function hideModalLogin() {
  //return { type: HIDE_MODAL_LOGIN };
//}
