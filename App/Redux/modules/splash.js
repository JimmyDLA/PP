// Actions
export const STARTUP = 'pp/splash/STARTUP';

// Initial State
export const initialState = {
  onSplash: false,
};

// Reducer
export const splash = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case STARTUP:
      return { ...state, onSplash: data };

    default:
      return state;
  }
};

// Action creators
export const startup = data => ({ type: STARTUP, data });
