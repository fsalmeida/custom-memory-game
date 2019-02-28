import React, { Component } from 'react';
import './game.scss';
import Card from './card'
import CongratsPopUp from './congratsPopUp'
import gamesService from '../../services/gamesService'

let games = null;
let game = null;

class Game extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate = () => {
        if (this.state.endOfGame)
            this.stopTimer();
    }

    componentWillMount = () => {
        return this.loadGames().then(() => {
            this.startNewGame();
        });
    }

    loadGames = () => {
        return new Promise((resolve, reject) => {
            gamesService.fetchGames().then(gamesResult => {
                games = gamesResult;
                game = games[0].game;
                resolve();
            })
        });
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
        game = games[parseInt(event.target.value)].game;
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
            missingMatches: 8
        });
    }

    getShuffledCards = () => {
        let cards = this.shuffle(game)
            .slice(0, 8)
            .reduce(function (gameCards, gameItem) {
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
            this.state != null ? (
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
                            {games.map((g, index) => (<option key={index} value={index}>{g.title}</option>))}
                        </select>
                    </div>
                    {this.state.endOfGame ? (<CongratsPopUp movements={this.state.movementCounter} stars={this.getNumberOfStars()} ellapsedTime={this.printEllapsedTime()} handlePlayAgain={this.startNewGame} />) : null}
                </div>
            )
                : null
        );
    }
}

export default Game;