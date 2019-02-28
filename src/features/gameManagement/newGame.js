import React, { Component } from 'react';
import './newGame.scss';
import { Form, Button, Col } from 'react-bootstrap'
import gamesService from '../../services/gamesService'
const uuidv1 = require('uuid/v1');

class NewGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            game: [{
                id: uuidv1(),
                text: "",
                textTranslation: ""
            }]
        };
    }

    titleChanged = (event) => {
        this.setState({ title: event.target.value });
    }

    addItemToGame = () => {
        this.state.game.push({ id: uuidv1(), text: "", textTranslation: "" })
        this.setState({ game: this.state.game });
    }

    gameItemChanged = (event, gameItemId, propertyName) => {
        let gameItem = this.state.game.find(g => g.id == gameItemId);
        gameItem[propertyName] = event.target.value;
        this.setState({ game: this.state.game });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        let validNumberOfGameItems = this.state.game.length >= 8;
        let isValid = form.checkValidity() && validNumberOfGameItems;
        if (!isValid) {
            if (!validNumberOfGameItems)
                alert('Ao menos 8 itens devem ser adicionados');

            this.setState({ validated: true });
        }
        else {
            this.addGame().then(() => this.props.history.push('/games'));
        }
    }

    addGame = () => {
        return gamesService.addGame({ title: this.state.title, game: this.state.game });
    }

    render() {
        const { validated } = this.state;

        return (
            <div className="container">
                <header>
                    <h1>Novo jogo</h1>
                </header>

                <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control required type="text" placeholder="Título do jogo" value={this.state.title} onChange={this.titleChanged} />
                        <Form.Text className="text-muted">
                            Este título ficará visível para os usuários escolherem os jogos
                        </Form.Text>
                    </Form.Group>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Valor</th>
                                <th>Equivalência</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.game.map((g, index) => (<tr key={index}>
                                <td><Form.Control required type="text" placeholder="Valor" value={g.text} onChange={(event) => this.gameItemChanged(event, g.id, "text")} /></td>
                                <td><Form.Control required type="text" placeholder="Equivalência" value={g.textTranslation} onChange={(event) => this.gameItemChanged(event, g.id, "textTranslation")} /></td>
                            </tr>))}
                        </tbody>
                    </table>

                    <Button variant="success" type="button" onClick={this.addItemToGame}>
                        + Novo item no jogo
                    </Button>
                    <br />
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default NewGame;