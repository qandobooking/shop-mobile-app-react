import {
  USER_LOGOUT
} from '../../constants/ActionTypes';

// Reset store on user logout
export default function resetOnLogout(reducer) {
  return (state, action) => {
    if (action.type === USER_LOGOUT) {
      return reducer(undefined, action);
    }

    return reducer(state, action);
  };
};
