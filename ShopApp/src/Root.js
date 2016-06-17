import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import bootstrapStore from './store/bootstrapStore';
import App from './containers/App'

const store = configureStore({
  // Generale stuff app configuration...
  app: {
    shopId: 1 // Customer App Shop ID
  }
});

bootstrapStore(store);

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Root
