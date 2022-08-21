import { cloneElement, PureComponent } from 'react';
import { Provider } from 'react-redux';

import Router from '../Router';
import configureStore from 'Util/Store';
import InjectStaticReducers from 'Store';

import { ROOT_COMPONENTS } from './App.config';

class App extends PureComponent {

  reduxStore = null;

  constructor(props) {
    super(props);

    this.configApp();
    this.configEnvironment();
  }

  developmentFunctions = [
    this.enableHotModule.bind(this),
  ];

  [ROOT_COMPONENTS] = [
    { component: <Router key='router'/> },
  ];

  contextProviders = [
    this.renderRedux.bind(this),
  ];

  commonFunctions = [
    this.createReduxStore.bind(this),
  ]

  createReduxStore() {
    const store = configureStore();
    this.reduxStore = InjectStaticReducers.registerReducers(store);
  }

  configEnvironment() {
    if (process.env.NODE_ENV === 'development') {
      this.developmentFunctions.forEach((func) => func());
    }
  }

  configApp() {
    this.commonFunctions.forEach((func) => func());
  }

  enableHotModule() {
    if (module.hot) {
      module.hot.accept();
    }
  }

  renderRedux(children) {
    const { reduxStore } = this;

    return (
      <Provider store={reduxStore} key='redux'>
        { children }
      </Provider>
    );
  }

  renderContextProviders() {
    const child = this[ROOT_COMPONENTS].map(({ component }) => cloneElement(component));
  
    return this.contextProviders.map((render) => render(child));
  }

  render() {
    return this.renderContextProviders();
  }
}

export default App;
