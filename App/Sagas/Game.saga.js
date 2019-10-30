import { fork, takeEvery } from 'redux-saga/effects'
import NavigationService from 'App/Services/NavigationService'
import { START_GAME, GAME_OVER } from '../Redux/modules/game';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* doStartGame() {
  try {
    // When those operations are finished we redirect to the main screen
    NavigationService.navigateAndReset('GameScreen');
  } catch (error) {
    console.warn(error);
  }
};

export function* doGameOver() {
  debugger
  try {
    // When those operations are finished we redirect to the main screen
    NavigationService.navigate('Modal');
  } catch (error) {
    console.warn(error);
  }
};

export function* watchGame() {
  yield takeEvery(START_GAME, doStartGame);
  yield takeEvery(GAME_OVER, doGameOver);
}
