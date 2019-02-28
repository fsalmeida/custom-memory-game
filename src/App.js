import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Game } from "./features/game"
import { GameList } from "./features/gameList"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Game} />
          <Route path="/games" component={GameList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
