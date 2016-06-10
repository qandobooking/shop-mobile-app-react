import { chain, isArray } from 'lodash';

// Map API errors for redux-form
export function mapErrorsForForm(errors) {
  return chain(errors)
    .mapValues((v,k) => isArray(v) ? v.join(', ') : v)
    .mapKeys((v, k) => k === 'nonFieldErrors' ? '_error' : k)
    .value();
}

// Check if response contains form related errors and reject them
export function rejectFormErrorsFromResponse(response) {
  if (typeof response.error === 'object' &&
      response.error.status === 400 && // 400 means some input data is wrong
      typeof response.error.data === 'object') {
    return Promise.reject(mapErrorsForForm(response.error.data));
  }
}
