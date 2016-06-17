import { AsyncStorage } from 'react-native';
import { loginWithToken } from '../actions/auth';

function loginUserWithAsyncStorageToken(store) {
  AsyncStorage.getItem('user_token', (err, existingUserToken) => {
    if (!err && existingUserToken) {
      store.dispatch(loginWithToken(existingUserToken));
    }
  });
}

// Bootstrapping the store
export default function bootstrapStore(store) {
  loginUserWithAsyncStorageToken(store);
}
