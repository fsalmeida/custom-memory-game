import React, { Component } from 'react';
import './shell.scss';
import { Switch, Route } from "react-router-dom";
import { Game } from "../game"
import { GameList, NewGame } from "../gameManagement"
import { Sidebar } from '../sidebar'

class Shell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false
        };
    }

    toggle = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    render() {
        return (
            <div className={"page-wrapper chiller-theme" + (this.state.isMenuOpen ? ' toggled' : '')}>
                <a id="show-sidebar" className="btn btn-sm btn-dark" href="#" onClick={this.toggle}>
                    <i className="fas fa-bars"></i>
                </a>

                <Sidebar isOpen={this.state.isMenuOpen} toggle={this.toggle} />

                <main className="page-content">
                    <Switch>
                        <Route exact={true} path="/" component={Game} />
                        <Route path="/game/:gameId" component={Game} />
                        <Route path="/games" component={GameList} />
                        <Route path="/new-game" component={NewGame} />
                    </Switch>
                </main>

            </div>
        );
    }
}

export default Shell