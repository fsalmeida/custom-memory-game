export default (state = { games: [] }, action) => {
    switch (action.type) {
        case 'GAMES_LOADED':
            return { ...state, games: action.payload.games }
        case 'GAME_ADDED':
            let games = [...state.games];
            games.push(action.payload.game);

            return { ...state, games: games }
        default:
            return { ...state, games: state.games }
    }
}