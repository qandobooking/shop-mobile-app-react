import { replace, push } from 'react-router-redux';
import { CALL_API } from '../middleware/api';
import { jsonPostConfig, authTokenConfig } from './utils';
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
    const giveMeToken = () => Promise.resolve(getState().auth.token);
    dispatch(loginRequest({email, password}))
    .then(giveMeToken)
    .then((token) => {
      if (token) {
        dispatch(meRequest())
        .then(giveMeToken)
        // if login is ok but me failed in some part of application
        // a logout will be dispatched and token will be erased from the state
        // then this implementation will have (more) sense
        .then((token) => {
          if (token) {
            localStorage.setItem('user_token', token);
            // Redirect after login if set
            const redirect = getState().auth.redirect;
            redirect && dispatch(push(redirect));
            // Also hide the login modal
            dispatch(hideModalLogin());
          }
        });
      }
    });
  };
}

export function logout() {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('user_token');
    dispatch(replace('/'));
  };
}

export function loginWithToken(token) {
  return (dispatch, getState) => {
    dispatch({ type: SET_USER_TOKEN, token });
    dispatch(meRequest());
  };
}

export function showModalLogin(options = {}) {
  const { name, email, redirect } = {
    ...{
      name: null,
      email: null,
      redirect: null,
    },
    ...options
  };
  return { type: SHOW_MODAL_LOGIN, name, email, redirect };
}

export function hideModalLogin() {
  return { type: HIDE_MODAL_LOGIN };
}
