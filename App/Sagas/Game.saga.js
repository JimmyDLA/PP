import { fork, takeEvery } from 'redux-saga/effects'
import NavigationService from 'App/Services/NavigationService'
import { START_GAME } from '../Redux/modules/game';

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
export function* watchGame() {
  yield fork(takeEvery, START_GAME, doStartGame);
}
