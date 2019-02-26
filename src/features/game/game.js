import React, { Component } from 'react';
import './game.scss';
import Card from './card'
import CongratsPopUp from './congratsPopUp'

const games = [
[
    { id: 'a', text: 'clima', textTranslation: 'weather' },
    { id: 'b', text: 'ensolarado', textTranslation: 'sunny' },
    { id: 'c', text: 'chuvoso', textTranslation: 'rainy' },
    { id: 'd', text: 'nublado', textTranslation: 'cloudy' },
    { id: 'e', text: 'nebuloso', textTranslation: 'foggy' },
    { id: 'f', text: 'tempestuoso', textTranslation: 'stormy' },
    { id: 'g', text: 'quente', textTranslation: 'hot' },
    { id: 'h', text: 'frio', textTranslation: 'cold' }
],
[
    { id: 'a', text: 'livro', textTranslation: 'book' },
    { id: 'b', text: 'relogio', textTranslation: 'clock' },
    { id: 'c', text: 'parede', textTranslation: 'wall' },
    { id: 'd', text: 'filme', textTranslation: 'movie' },
    { id: 'e', text: 'copo', textTranslation: 'glass' },
    { id: 'f', text: 'agua', textTranslation: 'water' },
    { id: 'g', text: 'cerveja', textTranslation: 'beer' },
    { id: 'h', text: 'alface', textTranslation: 'lettuce' }
],
[
    { id: 'a', text: 'afobado', textTranslation: 'flustered' },
    { id: 'b', text: 'peruca', textTranslation: 'wig' },
    { id: 'c', text: 'horrível', textTranslation: 'awful' },
    { id: 'd', text: 'piscar', textTranslation: 'blink' },
    { id: 'e', text: 'grupo', textTranslation: 'cluster' },
    { id: 'f', text: 'terrível', textTranslation: 'dreadful' },
    { id: 'g', text: 'dedilhar', textTranslation: 'fiddle' },
    { id: 'h', text: 'risadinha', textTranslation: 'giggle' }
]];

let game = games[0];

class Game extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate = () => {
        if (this.state.endOfGame)
            this.stopTimer();
    }

    componentWillMount = () => {
        this.startNewGame();
    }

    startTimer = () => {
        if (this.state.gameStartTime == null) {
            this.state.gameStartTime = new Date();
            this.timerInterval = setInterval(() => this.setState({ ellapsedTime: new Date() - this.state.gameStartTime }), 1000);
        }
    }

    stopTimer = () => {
        if (this.timerInterval != undefined && this.timerInterval != null)
            clearInterval(this.timerInterval);
    }

    changeGame = (event) => {
		game = games[parseInt(event.target.value)];
        this.startNewGame();
    }

    startNewGame = () => {
        this.stopTimer();

        this.setState({
            gameStartTime: null,
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
            this.startTimer();

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

    printEllapsedTime = () => {
        function pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        }

        let time = this.state.ellapsedTime;

        var ms = time % 1000;
        time = (time - ms) / 1000;
        var secs = time % 60;
        time = (time - secs) / 60;
        var mins = time % 60;

        return pad(mins) + ':' + pad(secs);
    }

    getNumberOfStars = () => {
        if (this.state.movementCounter > 18)
            return 1;
        else if (this.state.movementCounter > 12)
            return 2
        else
            return 3;

    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Jogo da Memória</h1>
                </header>
                <section className="score-panel">
                    <ul className="stars">
                        <li><i className="fa fa-star shine"></i></li>
                        <li><i className={"fa fa-star" + (this.getNumberOfStars() >= 2 ? " shine" : "")}></i></li>
                        <li><i className={"fa fa-star" + (this.getNumberOfStars() >= 3 ? " shine" : "")}></i></li>
                    </ul>
                    <div className="moves">{this.state.movementCounter}<span className="counter"></span> Movimentos</div>
                    <div className="timer">{this.printEllapsedTime()}</div>
                    <div className="restart" onClick={this.startNewGame}>
                        <i className="fa fa-repeat"></i>
                    </div>
                </section>
                <ul className="deck" id="card-deck">
                    {this.state.cards.map((card, index) => <Card key={index} text={card.text} toggle={this.handleCardClick} {...card} />)}
                </ul>
                <div className="game-selector">
                    <span>Game: </span>
                    <select onChange={this.changeGame}>
						<option value="0">1 - Easy</option>
						<option value="1">2 - Easy</option>
						<option value="2">3 - Hard</option>
					</select>
                </div>
                {this.state.endOfGame ? (<CongratsPopUp movements={this.state.movementCounter} stars={this.getNumberOfStars()} ellapsedTime={this.printEllapsedTime()} handlePlayAgain={this.startNewGame} />) : null}
            </div>
        );
    }
}

export default Game;