import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILURE,
  CLEAR_REGISTRATION
} from '../constants/ActionTypes';

const initialState = {
  userInfo: null,
  error: null,
};

export default function registration(state=initialState, action) {
  const { type, data, error } = action;
  switch (type) {
    case USER_REGISTRATION_REQUEST:
      return state; // Saving state handled by redux-form

    case USER_REGISTRATION_FAILURE:
      // Store in state only non forms related errors...
      return error.status === 400 ? state : {
        ...state,
        error
      };

    case USER_REGISTRATION_SUCCESS:
      return { ...state, userInfo: data, error: null };

    case CLEAR_REGISTRATION:
      return { ...state, userInfo: null, error: null };

    default:
      return state;
  }
}
