import { combineReducers } from 'redux'
import { reducer as oidcReducer } from 'redux-oidc'
import { connectRouter } from 'connected-react-router'
import history from './history'

import GamesReducer from '../gamesReducer'

const rootReducer = combineReducers({
  oidc: oidcReducer,
  router: connectRouter(history),
  games: GamesReducer
})

export default rootReducer
