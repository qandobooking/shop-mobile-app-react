import { pick } from 'lodash';
import { replace } from 'react-router-redux';

// Shortcut for replace only the query string
export function replaceQuery(query) {
  return (dispatch, getState) => {
    // Pick only location descriptor keys except search...
    const location = pick(getState().routing.locationBeforeTransitions, [
      'pathname', 'hash', 'query', 'state']);

    dispatch(replace({ ...location, query }));
  };
};
