import { uniqueId } from 'lodash';
import {
  RESET_PAGE_ERROR,
  SET_PAGE_ERROR
} from '../constants/ActionTypes';

export const resetPageError = () => ({
  type: RESET_PAGE_ERROR
});

export const setPageError = (error) => ({
  error,
  type: SET_PAGE_ERROR
});

// Generate the payload for a "page error swag action"
export const isPageError = () => ({
  pageError: {
    seqId: uniqueId(),
  }
});
