import React, { Component } from 'react';
import './App.scss';
import { Router, Switch, Route } from "react-router-dom";
import { Game } from "./features/game"
import { GameList, NewGame } from "./features/gameManagement"
import history from './history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact={true} path="/" component={Game} />
          <Route path="/games" component={GameList} />
          <Route path="/new-game" component={NewGame} />
        </Switch>
      </Router>
    );
  }
}

export default App;
