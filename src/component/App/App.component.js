import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import Router from '../Router';
import configureStore from '../../util/Store';
import InjectStaticReducers from '../../store';

class App extends PureComponent {

  state = {
    reduxStore: null,
  }

  componentDidMount() {
    this.createReduxStore();
    this.enableHotModule();
  }

  createReduxStore() {
    const store = configureStore();
    const reduxStore = InjectStaticReducers.registerReducers(store);
    this.setState({ reduxStore });
  }

  enableHotModule() {
    if (process.env.NODE_ENV === 'development' && module.hot) {
      module.hot.accept();
    }
  }

  renderRouter() {
    return <Router />;
  }

  renderReduxProvider(children) {
    const { reduxStore } = this.state;

    return (
      <Provider store={reduxStore}>
        { children }
      </Provider>
    );
  }

  renderFragment() {
    return <></>;
  }

  renderApp() {
    const { reduxStore } = this.state;

    return reduxStore
      ? this.renderReduxProvider(this.renderRouter()) 
      : this.renderFragment();
  }

  render() {
    return this.renderApp();
  }
}

export default App;
