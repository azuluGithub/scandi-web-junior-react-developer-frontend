import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RouterComponent from './Router.component';
import CurrencyDispatcher from '../../store/Currency/Currency.dispatcher';
import CategoryDispatcher from '../../store/Category/Category.dispatcher';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  initApp: () => {
    new CategoryDispatcher().requestData(dispatch);
    new CurrencyDispatcher().requestData(dispatch);
  }
})

class RouterContainer extends PureComponent {
  static propTypes = {
    initApp: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    const { initApp } = this.props;
    initApp();
  }

  renderRouter() {
    return (
      <RouterComponent />
    );
  }

  render() {
    return this.renderRouter();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
