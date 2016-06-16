import {
  SWITCH_TAB
} from '../constants/ActionTypes';

export const switchTab = (tab) => ({
  type: SWITCH_TAB,
  tab
});
