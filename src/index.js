import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { store, history } from './redux-cfg'
import gamesService from './services/gamesService'

gamesService.fetchGames().then(gamesResult => {
    
    store.dispatch({ type: 'GAMES_LOADED', payload: { games: gamesResult } });
})

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));

serviceWorker.unregister();
