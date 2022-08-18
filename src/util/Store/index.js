import { combineReducers, createStore } from 'redux';

const configureStore = () => {
  const store = createStore(() => {});
  store.asyncReducers = {};

  store.injectReducer = (k, v) => {
    store.asyncReducers[k] = v;
    store.replaceReducer(combineReducers(store.asyncReducers));
  }

  return store;
}

export default configureStore;
