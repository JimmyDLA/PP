// Actions
export const START_GAME = 'pp/game/START_GAME';
export const GAME_OVER = 'pp/game/GAME_OVER';

// Initial State
export const initialState = {
  gameStarted: false,
  gameEnded: false,
};

// Reducer
export const game = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case START_GAME:
      return { ...state, gameStarted: data };
    case GAME_OVER:
      debugger
      return { ...state, gameEnded: data };
    default:
      return state;
  }
};

// Action creators
export const startGame = data => ({ type: START_GAME, data });
export const gameOver = data => ({ type: GAME_OVER, data });
