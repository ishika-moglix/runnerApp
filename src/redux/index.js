import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from './sagas';
import rootReducer from './reducers';

const PRELOADED_STATE = {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  PRELOADED_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})(
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
