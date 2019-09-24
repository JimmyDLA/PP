import { takeEvery, fork } from 'redux-saga/effects'
import NavigationService from 'App/Services/NavigationService'
import { SET_GAME } from '../Redux/modules/home';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* doSetGame() {
  try {
    // When those operations are finished we redirect to the main screen
    NavigationService.navigate('GameScreen');
  } catch (error) {
    console.warn(error);
  }
};
export function* watchHome() {
  yield takeEvery(SET_GAME, doSetGame);
}
