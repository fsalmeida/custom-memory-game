export default (state = { games: [] }, action) => {
    switch (action.type) {
        case 'GAMES_LOADED':
            return { ...state, games: action.payload.games }
        default:
            return { ...state, games: state.games }
    }
}