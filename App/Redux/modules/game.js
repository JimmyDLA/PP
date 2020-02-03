// Actions
export const REMOVE_MODAL = 'pp/game/REMOVE_MODAL';
export const START_GAME = 'pp/game/START_GAME';
export const GAME_PAUSE = 'pp/game/GAME_PAUSE';
export const GAME_QUIT = 'pp/game/GAME_QUIT';
export const GAME_RESUME = 'pp/game/GAME_RESUME';
export const GAME_OVER = 'pp/game/GAME_OVER';
export const GAME_WIN = 'pp/game/GAME_WIN';
export const GAME_TIME = 'pp/game/GAME_TIME';
export const SHAPES_INFO = 'pp/game/SHAPES_INFO';
export const SHAPES_OBJECT = 'pp/game/SHAPES_OBJECT';
export const SHAPES_FOUND = 'pp/game/SHAPES_FOUND';

// Initial State
export const initialState = {
  gameStarted: false,
  gameEnded: false,
  gamePaused: false,
  level: 1,
  won: false,
  time: 60,
  timeID: '',
  score: 0,
  timeLeft: 0,
  shapesInfo: [],
  shapesInMatrix: [],
  shapesInSelection: [],
  shapesFound: [],
};

// Reducer
export const game = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case START_GAME:
      return { ...state, gameStarted: data };
    case GAME_OVER:
      return { ...state, gameEnded: data };
    case GAME_PAUSE:
      return { ...state, gamePaused: data };
    case GAME_WIN:
      return { ...state, ...data };
    case GAME_TIME:
      return { ...state, ...data  };
    case GAME_QUIT:
      return { ...state, ...data  };
    case GAME_RESUME:
      return { ...state, gamePaused: data };
    case SHAPES_INFO:
      return { ...state, shapesInfo: data };
    case SHAPES_OBJECT:
      return { ...state, shapesInSelection: data.shapesInSelection, shapesInMatrix: data.shapesInMatrix };
    case SHAPES_FOUND:
      return { ...state, shapesFound: data };  
      default:
      return state;
  }
};

// Action creators
export const removeModal = () => ({ type: REMOVE_MODAL });
export const quitGame = data => ({ type: GAME_QUIT, data });
export const startGame = data => ({ type: START_GAME, data });
export const pauseGame = data => ({ type: GAME_PAUSE, data });
export const resumeGame = data => ({ type: GAME_RESUME, data });
export const gameOver = data => ({ type: GAME_OVER, data });
export const gameWon = data => ({ type: GAME_WIN, data });
export const gameTime = data => ({ type: GAME_TIME, data });
export const updateShapesInfo = data => ({ type: SHAPES_INFO, data });
export const updateShapesObject = data => ({ type: SHAPES_OBJECT, data });
export const updateShapesFound = data => ({ type: SHAPES_FOUND, data });
