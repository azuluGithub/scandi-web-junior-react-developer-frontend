import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { CurrencyType } from 'Type/ProductList';
import Chevron from 'Util/Icons/Chevron';

import './CurrencySwitcher.style.scss';

class CurrencySwitcherComponent extends PureComponent {
    static propTypes = {
        handleCurrency: PropTypes.func.isRequired,
        selectedCurrency: CurrencyType.isRequired,
        currencies: PropTypes.arrayOf(CurrencyType).isRequired,
        currentOverlay: PropTypes.string,
    }

    static defaultProps = {
        currentOverlay: '',
    }

    renderCurrencyItem(currency) {
        const { label, symbol } = currency;
        const { selectedCurrency , handleCurrency } = this.props;
        
        const selectedClass = selectedCurrency.label === label && 'CurrencySwitcher-Item_Selected';

        return (
            <div
                onClick={() => handleCurrency(currency)}
                className={`CurrencySwitcher-Item ${selectedClass}`} 
                key={symbol}
            >
                {symbol} {label}
            </div>
        );
    }

    renderCurrencyList() {
        const { currencies, currentOverlay } = this.props;

        if (!currencies || currentOverlay.length) {
            return ;
        }

        return (
            <div className="CurrencySwitcher-List">
                { currencies.map((currency) => this.renderCurrencyItem(currency))}
            </div>
        );
    }

    renderSelectedCurrency() {
        const { selectedCurrency: { symbol } } = this.props;

        return (
            <div className='CurrencySwitcher-SelectedCurrency'>
                <span className='CurrencySwitcher-SelectedCurrencySymbol'>
                    { symbol }
                </span>
                <span className='CurrencySwitcher-SelectedCurrencyArrow'>
                    <Chevron width={8} height={8} color={'#1d1f22'} />
                </span>
            </div>
        );
    }

    renderCurrencySwitcher() {
        return (
            <div className="CurrencySwitcher">
                { this.renderSelectedCurrency() }
                { this.renderCurrencyList() }
            </div>
        );
    }

    render() {
        return this.renderCurrencySwitcher();
    }
}

export default CurrencySwitcherComponent;
