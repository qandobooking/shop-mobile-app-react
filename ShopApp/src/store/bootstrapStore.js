import { omit } from 'lodash';
import { replaceQuery } from '../actions/routing';
import { loginWithToken, showModalLogin } from '../actions/auth';

// Login user with persistent local storage jwt token
function loginUserWithLocalStorageToken(store) {
  const existingUserToken = localStorage.getItem('user_token');
  if (existingUserToken) {
    store.dispatch(loginWithToken(existingUserToken));
  }
}

function showModalLoginFromQueryString(store) {
  // Authenticated user can't logged anymore
  if (!store.getState().auth.token) {
    const query = store.getState().routing.locationBeforeTransitions.query;
    const { loginOpenModal, loginEmail, loginName } = query;

    if (loginOpenModal) {
      // Remove shit from url
      store.dispatch(replaceQuery(omit(query, [
        'loginOpenModal', 'loginEmail', 'loginName'])));
      // Open modal
      store.dispatch(showModalLogin({
        email: loginEmail,
        name: loginName,
      }));
    }
  }
}

// Bootstrapping the store
export default function bootstrapStore(store) {
  loginUserWithLocalStorageToken(store);
  showModalLoginFromQueryString(store);
}
