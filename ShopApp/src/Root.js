import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import App from './components/App'

const store = configureStore({
    shopId : 1
})

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