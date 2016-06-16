import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './containers/App'

const store = configureStore({
  // Generale stuff app configuration...
  app: {
    shopId: 1 // Customer App Shop ID
  }
});

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
