import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  SET_USER_TOKEN,
  USER_LOGOUT,
  SHOW_MODAL_LOGIN,
  HIDE_MODAL_LOGIN
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  showModal: false,
  error: null,
  token: null,
  user: null,
  // TODO: Check if this shape is needed...
  redirect: null,
  email: null,
  name: null,
};

export default function auth(state=initialState, action) {
  const { type, data, error, token, name, email, redirect } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
    case ME_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_FAILURE:
    case ME_FAILURE:
      return {
        ...state,
        error,
        loading: false,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: data.token,
        error: null,
      };

    case ME_SUCCESS:
      return {
        ...state,
        user: data,
        loading: false,
        error: null,
      };

    case SET_USER_TOKEN:
      return {
        ...state,
        token,
      };

    case USER_LOGOUT:
      return initialState;

    // TODO: Check if this actions are still useful...
    case SHOW_MODAL_LOGIN:
      return {
        ...state,
        name,
        email,
        redirect,
        showModal: true,
        error: null,
      };

    case HIDE_MODAL_LOGIN:
      return {
        ...state,
        redirect: null,
        email: null,
        name: null,
        showModal: false,
        error: null,
    };

    default:
      return state;
  }
}
