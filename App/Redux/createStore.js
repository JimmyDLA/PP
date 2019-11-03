import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { sagas } from './sagas';
import { reducerList } from './reducers';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  ...reducerList,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'game',
    'home',
    'splash',
  ],
}

const reducer = persistReducer(persistConfig, rootReducer);

export const configureStore = initialState => {
  const composeEnhancers = typeof window === 'object'
    /* eslint-disable no-underscore-dangle */
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
  );

  const store = createStore(
    reducer,
    enhancer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  sagaMiddleware.run(sagas);
  return store;
};
