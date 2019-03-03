import React, { Component } from 'react';
import './shell.scss';
import { Router, Switch, Route } from "react-router-dom";
import { Game } from "../game"
import { GameList, NewGame } from "../gameManagement"
import Sidebar from '../../components/sidebar/sidebar'
import history from '../../history';
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import gamesService from '../../services/gamesService'

class Shell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gamesLoaded: false,
            games: [],
            filteredGames: [],
            isMenuOpen: false,
            filter: {
                title: "",
                category: "",
                subcategory: ""
            }
        };
    }

    componentWillMount = () => {
        this.loadGames();
    }

    loadGames = () => {
        gamesService.fetchGames().then(gamesResult => {
            this.setState({ games: gamesResult, filteredGames: this.findFilteredGames(gamesResult), gamesLoaded: true });
        })
    }

    findFilteredGames = (games) => {
        let filteredGames = games.filter(g => {
            let isMatch = true;

            if (this.state.filter.title != "")
                isMatch = isMatch && g.title.toLowerCase().indexOf(this.state.filter.title.toLowerCase()) >= 0;

            if (this.state.filter.category != "")
                isMatch = isMatch && g.category.toLowerCase().indexOf(this.state.filter.category.toLowerCase()) >= 0;

            if (this.state.filter.subcategory != "")
                isMatch = isMatch && g.subcategories.find(c => c.toLowerCase().indexOf(this.state.filter.subcategory.toLowerCase()) >= 0);

            return isMatch;
        });

        let result = filteredGames.reduce((groups, game) => {
            let group = groups.filter(gp => gp.category == game.category.toLowerCase());
            let gameItem = { id: game.id, title: game.title };

            if (group.length == 0)
                groups.push({ category: game.category.toLowerCase(), games: [gameItem] });
            else
                group[0].games.push(gameItem);

            return groups;
        }, []);

        return result;
    }

    toggle = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    filterChanged = (event, property) => {
        this.state.filter[property] = event.target.value;
        this.setState({ filter: this.state.filter });

        this.setState({ filteredGames: this.findFilteredGames(this.state.games) });
    }

    render() {
        return (
            <div className={"page-wrapper chiller-theme" + (this.state.isMenuOpen ? ' toggled' : '')}>
                <a id="show-sidebar" className="btn btn-sm btn-dark" href="#" onClick={this.toggle}>
                    <i className="fas fa-bars"></i>
                </a>

                <Sidebar isOpen={this.state.isMenuOpen} toggle={this.toggle} title="Jogo da memória" >
                    <Sidebar.Menu>
                        <Sidebar.MenuItem>
                            <Link to='/'><i className="fa fa-gamepad"></i>Jogar</Link>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Link to='/new-game'><i className="fa fa-plus-square"></i>Criar novo jogo</Link>
                        </Sidebar.MenuItem>
                    </Sidebar.Menu>
                    <Sidebar.CustomContent>
                        <div>
                            <span className="title">Encontrar jogo</span>
                            <div>
                                <Form.Group controlId="nameFilter">
                                    <Form.Control type="text" placeholder="Nome" value={this.state.filter.title} onChange={(event) => this.filterChanged(event, 'title')} />
                                </Form.Group>
                                <Form.Group controlId="categoryFilter">
                                    <Form.Control type="text" placeholder="Categoria" value={this.state.filter.category} onChange={(event) => this.filterChanged(event, 'category')} />
                                </Form.Group>
                                <Form.Group controlId="subcategoryFilter">
                                    <Form.Control type="text" placeholder="Subcategoria" value={this.state.filter.subcategory} onChange={(event) => this.filterChanged(event, 'subcategory')} />
                                </Form.Group>
                            </div>
                        </div>
                    </Sidebar.CustomContent>
                    {this.state.gamesLoaded ? (
                        <Sidebar.Menu>
                            <li className="header-menu">
                                <span>Categorias</span>
                            </li>
                            {this.state.filteredGames.map((gameGroup, index) => (
                                <Sidebar.MenuItem key={index}>
                                    <span>
                                        <i className="fa fa-plus-square"></i>
                                        <span>{gameGroup.category}</span>
                                    </span>
                                    <Sidebar.Submenu>
                                        {gameGroup.games.map((gameItem, gameIndex) => (
                                            <Link key={gameIndex} to={"/game/" + gameItem.id} props={{ gameId: gameItem.id }} >{gameItem.title}</Link>
                                        ))}
                                    </Sidebar.Submenu>
                                </Sidebar.MenuItem>
                            ))}
                        </Sidebar.Menu>
                    ) : null}
                    {/* <Sidebar.Footer /> */}
                </Sidebar>

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

export default Shell;