const defaultGames = [
    {
        title: '1 - Easy',
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
        title: '2 - Easy',
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
        title: '3 - Hard',
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
        })
    }
}

export default gamesService;