import React, { Component } from 'react';
import './congratsPopUp.scss';

class CongratsPopUp extends Component {

    render() {
        return (
            <div id="congrats-popup" className="overlay show">
                <div className="popup">
                    <h2>Parabéns! Você ganhou!</h2>
                    <div className="summary">
                        <p><span id="total-moves">{this.props.movements}</span> Movimentos</p>
                        <p>Tempo: <span id="total-time"></span></p>
                        <p>Avaliação: <span id="star-rating" className="stars"></span></p>
                    </div>
                    <button id="play-again" onClick={this.props.handlePlayAgain}>Jogar novamente</button>
                </div>
            </div>
        );
    }
}

export default CongratsPopUp;