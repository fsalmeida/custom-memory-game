import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Game } from "./features/game"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Game} />
        </Switch>
      </Router>
    );
  }
}

export default App;
