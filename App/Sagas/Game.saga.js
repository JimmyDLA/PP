import { fork, takeEvery } from 'redux-saga/effects'
import NavigationService from 'App/Services/NavigationService'
import { 
  START_GAME, 
  GAME_PAUSE,
  GAME_OVER,
  GAME_QUIT,
  GAME_WIN,
  REMOVE_MODAL,
  GAME_ABOUT_TO_START,
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

export function* doGameWin() {
  try {
    NavigationService.navigate('Modal');
  } catch (error) {
    console.warn(error);
  }
};

export function* doGamePause() {
  try {
    NavigationService.navigate('Modal');
  } catch (error) {
    console.warn(error);
  }
};

export function* doGameOver() {
  try {
    NavigationService.navigate('Modal');
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

export function* doQuit() {
  try {
    NavigationService.navigate('MainScreen');
  } catch (error) {
    console.warn(error)
  }
}

function* doAboutToStart() {
  try {
    NavigationService.navigate('Modal');
  } catch (error) {
    
  }
}

export function* watchGame() {
  yield takeEvery(START_GAME, doStartGame);
  yield takeEvery(GAME_PAUSE, doGamePause);
  yield takeEvery(GAME_ABOUT_TO_START, doAboutToStart);
  yield takeEvery(GAME_OVER, doGameOver);
  yield takeEvery(REMOVE_MODAL, doRemoveModal);
  yield takeEvery(GAME_QUIT, doQuit);
  yield takeEvery(GAME_WIN, doGameWin);
}
