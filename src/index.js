import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { store, history } from './redux-cfg'

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));

serviceWorker.unregister();
