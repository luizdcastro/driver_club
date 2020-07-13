import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';
import { apiMiddleware } from './api-middleware/rocket.api';

export function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('STATE', serializedState);
  } catch (e) {
    console.log(e);
  }
}

export function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('STATE');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

export function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(apiMiddleware))
  );
}

export default { configureStore };
