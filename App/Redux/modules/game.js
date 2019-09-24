// Actions
export const START_GAME = 'pp/game/START_GAME';

// Initial State
export const initialState = {
  gameStarted: false,
};

// Reducer
export const game = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case START_GAME:
      return { ...state, gameStarted: data };

    default:
      return state;
  }
};

// Action creators
export const startGame = data => ({ type: START_GAME, data });
