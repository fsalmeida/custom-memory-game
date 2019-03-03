import { combineReducers } from 'redux'
// import { reducer as oidcReducer } from 'redux-oidc'
import { connectRouter } from 'connected-react-router'
import history from './history'

// import { TesteReducer } from '../features/teste'

const rootReducer = combineReducers({
  // oidc: oidcReducer,
  router: connectRouter(history)
  // teste: TesteReducer,
})

export default rootReducer
