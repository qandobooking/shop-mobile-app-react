import { LOCATION_CHANGE } from 'react-router-redux'
import { includes } from 'lodash';
import {
  SET_PAGE_ERROR,
  RESET_PAGE_ERROR
} from '../constants/ActionTypes';

const initialState = {
  error: null,
  asyncRequests: [],
};

const isPageErrorHandledHttpStatus = status => !includes([401], status);

export default function pageError(state = initialState, action) {
  const { type, error, isRequestAction, pageError } = action;

  // Async request action that should handled by page error
  if (pageError) {
    const { seqId } = pageError;

    if (isRequestAction) {
      // Request start

      // Push the seqId as an async request handled by page error
      return {
        ...state,
        asyncRequests: [...state.asyncRequests, seqId]
      };
    } else if (error) {
      // Request failed

      if (includes(state.asyncRequests, seqId)) {
        // The seqId is handled by page error

        if (isPageErrorHandledHttpStatus(error.status)) {
          // Finally can set the page error and remove seqId
          return {
            ...state,
            error,
            asyncRequests: state.asyncRequests.filter(id => id !== seqId)
          };
        } else {
          // The http status should not handled by page error
          // remove only the seqId and go on...
          return {
            ...state,
            asyncRequests: state.asyncRequests.filter(id => id !== seqId)
          };
        }

      } else {
        // The seqId is not handled any more by page-error, nothing to do...
        return state;
      }
    } else {
      // Request ok

      // Remove seqId from async request handled by page error
      return {
        ...state,
        asyncRequests: state.asyncRequests.filter(id => id !== seqId)
      };
    }
  }

  // Explicit page error
  if (type === SET_PAGE_ERROR) {
    return { ...state, error };
  }

  // Reset page error wen location change or exmplicit action
  if (type === LOCATION_CHANGE || type === RESET_PAGE_ERROR) {
    return initialState;
  }

  return state;
};
