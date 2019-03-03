import history from './history'
// import createOidcMiddleware from 'redux-oidc'
import rootReducer from './rootReducer'
import ReduxThunk from 'redux-thunk'

import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
// import clients from './clients'
// import { userManager } from '../features/Auth'
// import { multiClientMiddleware } from 'redux-axios-middleware'

// const oidcMiddleware = createOidcMiddleware(userManager)

const createStoreWithMiddlewares = compose(
  applyMiddleware(
    routerMiddleware(history),
    ReduxThunk
    // oidcMiddleware,
    // multiClientMiddleware(clients)
  )
)(createStore)

const store = createStoreWithMiddlewares(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
