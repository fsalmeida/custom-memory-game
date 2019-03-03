import React, { Component } from 'react';
import './sidebar.scss';
import SidebarComponent from '../../components/sidebar/sidebar'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gamesLoaded: false,
            filteredGames: [],
            filter: {
                title: "",
                category: "",
                subcategory: ""
            }
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.games !== this.props.games) {
            this.setState({ gamesLoaded: true, filteredGames: this.findFilteredGames(this.props.games) });
        }
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

    filterChanged = (event, property) => {
        this.state.filter[property] = event.target.value;
        this.setState({ filter: this.state.filter });

        this.setState({ filteredGames: this.findFilteredGames(this.props.games) });
    }

    render() {
        return (
            <SidebarComponent isOpen={this.props.isMenuOpen} toggle={this.props.toggle} title="Jogo da memória" >
                <SidebarComponent.Menu>
                    <SidebarComponent.MenuItem>
                        <Link to='/'><i className="fa fa-gamepad"></i>Jogar</Link>
                    </SidebarComponent.MenuItem>
                    <SidebarComponent.MenuItem>
                        <Link to='/new-game'><i className="fa fa-plus-square"></i>Criar novo jogo</Link>
                    </SidebarComponent.MenuItem>
                </SidebarComponent.Menu>
                <SidebarComponent.CustomContent>
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
                </SidebarComponent.CustomContent>
                {this.state.gamesLoaded ? (
                    <SidebarComponent.Menu>
                        <li className="header-menu">
                            <span>Categorias</span>
                        </li>
                        {this.state.filteredGames.map((gameGroup, index) => (
                            <SidebarComponent.MenuItem key={index}>
                                <span>
                                    <i className="fa fa-plus-square"></i>
                                    <span>{gameGroup.category}</span>
                                </span>
                                <SidebarComponent.Submenu>
                                    {gameGroup.games.map((gameItem, gameIndex) => (
                                        <Link key={gameIndex} to={"/game/" + gameItem.id} props={{ gameId: gameItem.id }} >{gameItem.title}</Link>
                                    ))}
                                </SidebarComponent.Submenu>
                            </SidebarComponent.MenuItem>
                        ))}
                    </SidebarComponent.Menu>
                ) : null}
            </SidebarComponent>
        );
    }
}

const mapStateToProps = ({ games }) => ({
    games: games.games
})

export default connect(mapStateToProps)(Sidebar)