import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Shell } from './features/layout'

// const App = ({ store, history, persistor }) => (
const App = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Shell />
    </ConnectedRouter>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default App
