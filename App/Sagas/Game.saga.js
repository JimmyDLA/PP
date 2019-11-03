import { fork, takeEvery } from 'redux-saga/effects'
import NavigationService from 'App/Services/NavigationService'
import { 
  START_GAME, 
  GAME_PAUSE,
  GAME_OVER,
  GAME_WIN,
  REMOVE_MODAL,
} from '../Redux/modules/game';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* doStartGame() {
  try {
    NavigationService.navigateAndReset('GameScreen');
  } catch (error) {
    console.warn(error);
  }
};

export function* doGameWin(action) {
  try {
    const { data } = action;
    const won = { won: data };
    NavigationService.navigate('Modal', won);
  } catch (error) {
    console.warn(error);
  }
};

export function* doGamePause(action) {
  try {
    const { data } = action;
    const paused = { paused: data };
    NavigationService.navigate('Modal', paused);
  } catch (error) {
    console.warn(error);
  }
};

export function* doGameOver(action) {
  try {
    const { data } = action;
    const lost = { lost: data };
    NavigationService.navigate('Modal', lost);
  } catch (error) {
    console.warn(error);
  }
};

export function* doRemoveModal() {
  try {
    NavigationService.navigate('Main');
  } catch (error) {
    console.warn(error)
  }
}

export function* watchGame() {
  yield takeEvery(START_GAME, doStartGame);
  yield takeEvery(GAME_PAUSE, doGamePause);
  yield takeEvery(GAME_OVER, doGameOver);
  yield takeEvery(REMOVE_MODAL, doRemoveModal);
  yield takeEvery(GAME_WIN, doGameWin);
}
