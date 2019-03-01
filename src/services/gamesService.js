const uuidv1 = require('uuid/v1');
const defaultGames = [
    {
        id: 'c6vb903n8umq9enq3b3276b97',
        title: '1 - Easy',
        category: 'English',
        subcategories: [],
        game: [
            { id: 'a', text: 'clima', textTranslation: 'weather' },
            { id: 'b', text: 'ensolarado', textTranslation: 'sunny' },
            { id: 'c', text: 'chuvoso', textTranslation: 'rainy' },
            { id: 'd', text: 'nublado', textTranslation: 'cloudy' },
            { id: 'e', text: 'nebuloso', textTranslation: 'foggy' },
            { id: 'f', text: 'tempestuoso', textTranslation: 'stormy' },
            { id: 'g', text: 'quente', textTranslation: 'hot' },
            { id: 'h', text: 'frio', textTranslation: 'cold' }
        ]
    },
    {
        id: '727cb32jzk9k9x8nbc68t37xn23m',
        title: '2 - Easy',
        category: 'English',
        subcategories: [],
        game: [
            { id: 'a', text: 'livro', textTranslation: 'book' },
            { id: 'b', text: 'relogio', textTranslation: 'clock' },
            { id: 'c', text: 'parede', textTranslation: 'wall' },
            { id: 'd', text: 'filme', textTranslation: 'movie' },
            { id: 'e', text: 'copo', textTranslation: 'glass' },
            { id: 'f', text: 'agua', textTranslation: 'water' },
            { id: 'g', text: 'cerveja', textTranslation: 'beer' },
            { id: 'h', text: 'alface', textTranslation: 'lettuce' }
        ]
    },
    {
        id: 'h6sj7k8z9k4jcr8x6v83b79h8zj98k',
        title: '3 - Hard',
        category: 'English',
        subcategories: [],
        game: [
            { id: 'a', text: 'afobado', textTranslation: 'flustered' },
            { id: 'b', text: 'peruca', textTranslation: 'wig' },
            { id: 'c', text: 'horrível', textTranslation: 'awful' },
            { id: 'd', text: 'piscar', textTranslation: 'blink' },
            { id: 'e', text: 'grupo', textTranslation: 'cluster' },
            { id: 'f', text: 'terrível', textTranslation: 'dreadful' },
            { id: 'g', text: 'dedilhar', textTranslation: 'fiddle' },
            { id: 'h', text: 'risadinha', textTranslation: 'giggle' }
        ]
    }];

let gamesService = {
    fetchGames: () => {
        let games = localStorage.getItem("games");
        if (games == undefined || games == null) {
            localStorage.setItem("games", JSON.stringify(defaultGames));
            games = defaultGames;
        }
        else
            games = JSON.parse(games);

        return new Promise((resolve, reject) => {
            resolve(games);
        });
    },
    addGame: (game) => {
        game.id = uuidv1();
        let games = JSON.parse(localStorage.getItem("games"));
        games.push(game);
        localStorage.setItem("games", JSON.stringify(games));
        return new Promise((resolve, reject) => {
            resolve(game);
        });
    }
}

export default gamesService;