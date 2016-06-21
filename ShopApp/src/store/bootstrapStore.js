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
  //AsyncStorage.clear();
  AsyncStorage.getItem('shopData', (err, shopData) => {
    if (!shopData) {
      // No shop use the bunlded shop data instead!
      console.info('Use bundled shop data.', require('../data/shop.json'));
      store.dispatch(setShopData(require('../data/shop.json')));
    } else {
      // We have cached shop data, use cache!
      console.info('Use cached shop data.');
      store.dispatch(setShopData(JSON.parse(shopData)));
    }
  });
}

// Bootstrapping the store
export default function bootstrapStore(store) {
  loginUserWithAsyncStorageToken(store);
  fillCachedShopData(store);
}
