import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CurrencySwitcherComponent from './CurrencySwitcher.component';
import { selectedCurrencyAction } from 'Store/Currency/Currency.action';
import { CurrencyType } from 'Type/ProductList';

const mapStateToProps = (state) => ({
    selectedCurrency: state.currenciesReducer.selectedCurrency,
    currencies: state.currenciesReducer.currencies,
    currentOverlay: state.overlay.currentOverlay,
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedCurrency: (currency) => dispatch(selectedCurrencyAction(currency)),
})

class CurrencySwitcher extends PureComponent {
    static propTypes = {
        selectedCurrency: CurrencyType.isRequired,
        currencies: PropTypes.arrayOf(CurrencyType).isRequired,
        setSelectedCurrency: PropTypes.func.isRequired,
        currentOverlay: PropTypes.string,
    }

    static defaultProps = {
        currentOverlay: '',
    }

    containerProps() {
        const { selectedCurrency, currencies, currentOverlay } = this.props;
        
        return { selectedCurrency, currencies, currentOverlay };
    }

    containerFunctions() {
        return {
            handleCurrency: this.handleCurrency.bind(this),
        }
    }

    handleCurrency(currency) {
        const { setSelectedCurrency } = this.props;

        setSelectedCurrency(currency);
        window.location.reload();
    }

    renderComponent() {
        return (
            <CurrencySwitcherComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);