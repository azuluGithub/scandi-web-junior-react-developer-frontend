import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RouterComponent from './Router.component';

const CurrencyDispatcher = import('Store/Currency/Currency.dispatcher');
const CategoryDispatcher = import('Store/Category/Category.dispatcher');

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  initApp: () => {
    CategoryDispatcher.then(
      ({ default: categoryDispatcher }) => categoryDispatcher.requestData(dispatch)
    );
    CurrencyDispatcher.then(
      ({ default: currencyDispatcher }) => currencyDispatcher.requestData(dispatch)
    );
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
