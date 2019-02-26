import React, { Component } from 'react';
import './game.scss';
import Card from './card'
import CongratsPopUp from './congratsPopUp'

const game = [
    { id: 'a', text: 'livro', textTranslation: 'book' },
    { id: 'b', text: 'relogio', textTranslation: 'clock' },
    { id: 'c', text: 'parede', textTranslation: 'wall' },
    { id: 'd', text: 'filme', textTranslation: 'movie' },
    { id: 'e', text: 'copo', textTranslation: 'glass' },
    { id: 'f', text: 'agua', textTranslation: 'water' },
    { id: 'g', text: 'cerveja', textTranslation: 'beer' },
    { id: 'h', text: 'alface', textTranslation: 'lettuce' }
];

class Game extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        this.startNewGame();
        setInterval(() => {
            console.log(this.timerInstance)
            this.setState({ ellapsedTime: this.timerInstance.ellapsed });
        }, 1000);
    }

    startNewGame = () => {
        this.setState({
            ellapsedTime: 0,
            endOfGame: false,
            allowGameInteration: true,
            movementCounter: 0,
            cards: this.getShuffledCards(),
            openCards: [],
            missingMatches: game.length
        });
    }

    getShuffledCards = () => {
        let cards = game.reduce(function (gameCards, gameItem) {
            gameCards.push(
                { uid: gameItem.id + '_1', id: gameItem.id, text: gameItem.text, isOpen: false, isMatch: false, isUnmatch: false },
                { uid: gameItem.id + '_2', id: gameItem.id, text: gameItem.textTranslation, isOpen: false, isMatch: false, isUnmatch: false }
            );

            return gameCards;
        }, []);

        return this.shuffle(cards);
    }

    shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    handleCardClick = (uid) => {
        let toggledCard = this.state.cards.find(card => card.uid == uid);
        this.openCard(toggledCard);
    }

    openCard = card => {
        if (this.state.allowGameInteration) {
            card.isOpen = true;
            this.state.openCards.push(card);

            if (this.state.openCards.length == 2)
                this.checkOpenCardsMatch();
            else
                this.setState({ cards: this.state.cards, openCards: this.state.openCards });
        }
    }

    checkOpenCardsMatch = () => {
        let firstOpenCard = this.state.cards.find(c => c.uid == this.state.openCards[0].uid);
        let secondOpenCard = this.state.cards.find(c => c.uid == this.state.openCards[1].uid);

        firstOpenCard.isOpen = false;
        secondOpenCard.isOpen = false;

        let isMatch = firstOpenCard.id == secondOpenCard.id;
        if (isMatch) {
            firstOpenCard.isMatch = true;
            secondOpenCard.isMatch = true;
            this.state.openCards = [];
        } else {
            firstOpenCard.isUnmatch = true;
            secondOpenCard.isUnmatch = true;

            setTimeout(this.resetUnmatched, 1000);
        }

        let missingMatches = isMatch ? this.state.missingMatches - 1 : this.state.missingMatches;
        this.setState({
            cards: this.state.cards,
            openCards: this.state.openCards,
            allowGameInteration: isMatch,
            missingMatches: missingMatches,
            movementCounter: this.state.movementCounter + 1,
            endOfGame: missingMatches == 0
        });
    }

    resetUnmatched = () => {
        let firstOpenCard = this.state.cards.find(c => c.uid == this.state.openCards[0].uid);
        let secondOpenCard = this.state.cards.find(c => c.uid == this.state.openCards[1].uid);

        firstOpenCard.isUnmatch = false;
        secondOpenCard.isUnmatch = false;

        this.setState({ cards: this.state.cards, openCards: [], allowGameInteration: true });
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Jogo da Memória - {this.state.ellapsedTime}</h1>
                </header>
                <section className="score-panel">
                    <ul className="stars">
                        <li><i className="fa fa-star shine"></i></li>
                        <li><i className="fa fa-star shine"></i></li>
                        <li><i className="fa fa-star shine"></i></li>
                    </ul>
                    <div className="moves"><span className="counter"></span> Movimentos</div>
                    <div className="timer"></div>
                    <div className="restart">
                        <i className="fa fa-repeat"></i>
                    </div>
                </section>
                <ul className="deck" id="card-deck">
                    {this.state.cards.map((card, index) => <Card key={index} text={card.text} toggle={this.handleCardClick} {...card} />)}
                </ul>
                {this.state.endOfGame ? (<CongratsPopUp movements={this.state.movementCounter} handlePlayAgain={this.startNewGame} />) : null}
            </div>
        );
    }
}

export default Game;