import { AsyncStorage } from 'react-native';
import { loginWithToken } from '../actions/auth';
import { setShopData } from '../actions/shop';

function loginUserWithAsyncStorageToken(store) {
  AsyncStorage.getItem('userToken', (err, existingUserToken) => {
    if (!err && existingUserToken) {
      store.dispatch(loginWithToken(existingUserToken));
    }
  });
}

function fillCachedShopData(store) {
  AsyncStorage.getItem('shopData', (err, shopData) => {
    if (!err && shopData) {
      store.dispatch(setShopData(JSON.parse(shopData)));
    }
  });
}

// Bootstrapping the store
export default function bootstrapStore(store) {
  loginUserWithAsyncStorageToken(store);
  fillCachedShopData(store);
}
