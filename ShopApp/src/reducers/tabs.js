import {
  SWITCH_TAB
} from '../constants/ActionTypes';

const initialState = {
  selected: 0,
};

export default function(state = initialState, action) {
  const { type, tab } = action;

  if (type === SWITCH_TAB) {
    return { ...state, selected: tab };
  }

  return state;
}
