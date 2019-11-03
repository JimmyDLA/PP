// Actions
export const REMOVE_MODAL = 'pp/game/REMOVE_MODAL';
export const START_GAME = 'pp/game/START_GAME';
export const GAME_PAUSE = 'pp/game/GAME_PAUSE';
export const GAME_RESUME = 'pp/game/GAME_RESUME';
export const GAME_OVER = 'pp/game/GAME_OVER';
export const GAME_WIN = 'pp/game/GAME_WIN';

// Initial State
export const initialState = {
  gameStarted: false,
  gameEnded: false,
  gamePaused: false,
  won: false,
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
    case GAME_PAUSE:
      debugger
      return { ...state, gamePaused: data };
    case GAME_WIN:
      debugger
      return { ...state, ...data };
    case GAME_RESUME:
      debugger
      return { ...state, gamePaused: data };
    default:
      return state;
  }
};

// Action creators
export const removeModal = () => ({ type: REMOVE_MODAL });
export const startGame = data => ({ type: START_GAME, data });
export const pauseGame = data => ({ type: GAME_PAUSE, data });
export const resumeGame = data => ({ type: GAME_RESUME, data });
export const gameOver = data => ({ type: GAME_OVER, data });
export const gameWon = data => ({ type: GAME_WIN, data });
