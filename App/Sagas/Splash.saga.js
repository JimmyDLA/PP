import { fork, takeEvery } from 'redux-saga/effects'
import NavigationService from 'App/Services/NavigationService'
import { STARTUP } from '../Redux/modules/splash';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
function* doStartup(action) {
  try {
    // When those operations are finished we redirect to the main screen
    NavigationService.navigateAndReset('MainScreen');
  } catch (error) {
    console.warn(error);
  }
};
export function* watchSplash() {
  yield takeEvery(STARTUP, doStartup);
}
