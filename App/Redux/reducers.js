import { combineReducers } from 'redux';

//import all Reducers
import { splash } from './modules/splash';
import { home } from './modules/home';
import { game } from './modules/game';

export const reducerList = {
  splash,
  home,
  game,
};

export const reducers = combineReducers(reducerList);
