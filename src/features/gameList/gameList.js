import React, { Component } from 'react';
import './gameList.scss';
import gamesService from '../../services/gamesService'

class GameList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        return this.loadGames().then(() => {

        });
    }

    loadGames = () => {
        return new Promise((resolve, reject) => {
            gamesService.fetchGames().then(gamesResult => {
                this.setState({ games: gamesResult });
                resolve();
            })
        });
    }

    render() {
        return (
            this.state != null ? (
                <div className="container">
                    <header>
                        <h1>Jogos disponíveis</h1>
                    </header>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nome</td>
                                <td>x,y</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
                : null
        );
    }
}

export default GameList;