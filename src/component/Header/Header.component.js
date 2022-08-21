import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Logo from '../Logo';
import CurrencySwitcher from '../CurrencySwitcher';
import Cart from 'Util/Icons/Cart';
import CartOverlay from '../CartOverlay';
import Menu from '../Menu';
import { HOME_PAGE, HOME_PAGE_ROUTE } from 'Route/HomePage/HomePage.config';
import { CART_OVERLAY } from './Header.config';

import './Header.style.scss';

class HeaderComponent extends PureComponent {
    static propTypes = {
        currentOverlay: PropTypes.string,
        handleOverLay: PropTypes.func.isRequired,
        toggleCartOverlayOpen: PropTypes.func.isRequired,
        setCurrentRoute: PropTypes.func.isRequired,
        itemsCount: PropTypes.number.isRequired,
    }

    static defaultProps = {
        currentOverlay: '',
    }

    headerComponents = [
        this.renderHeader.bind(this),
        this.renderUnderBlock.bind(this),
        this.renderOverlay.bind(this),
    ];

    headerLinks = [
        this.renderMenu.bind(this),
        this.renderLogo.bind(this),
    ];

    headerActions = [
        this.renderCurrencySwitcher.bind(this),
        this.renderMinicart.bind(this),
    ];

    renderComponents(components) {
        return components.map((render) => render());
    }

    renderCurrencySwitcher() {
        return (
            <div className='Header-CurrencySwitcher' key='switcher'>
                <CurrencySwitcher />
            </div>
        );
    }

    renderLogo() {
        const currentRoute = {
            name: HOME_PAGE,
            path: HOME_PAGE_ROUTE,
        };
        const { setCurrentRoute } = this.props;

        return (
            <div className='Header-Logo' key='logo'>
                <Link to='/' onClick={() => setCurrentRoute(currentRoute)}>
                    <Logo />
                </Link>
            </div>
        );
    }

    isCartOverlayOpen() {
        const { currentOverlay } = this.props;

        return currentOverlay === CART_OVERLAY;
    }

    renderCartOverlay() {
        return (
            <div className='Header-CartOverlay'>
                <CartOverlay />
            </div>
        );
    }

    renderCountItem(count) {
        return (
            <div className='Header-CartCount'>
                { count }
            </div>
        );
    }

    renderCartCount() {
        const { itemsCount } = this.props;
        
        return itemsCount <= 0
            ? <></>
            : this.renderCountItem(itemsCount);
    }

    renderCartIcon() {
        return <Cart height={18} color={'#1d1f22'}/>;
    }

    renderCartButton() {
        const { toggleCartOverlayOpen } = this.props;

        return (
            <div 
                className='Header-CartButton' 
                onClick={() => toggleCartOverlayOpen()}
            >
                { this.renderCartIcon() }
                { this.renderCartCount() }
            </div>
        );
    }

    renderMinicart() {
        return (
            <div className='Header-Cart' key='cart'>
                { this.renderCartButton() }
                { this.isCartOverlayOpen() && this.renderCartOverlay() }
            </div>
        );
    }

    renderOverlayClose() {
        const { handleOverLay } = this.props;

        return (
            <div
                key='overlay'
                className='Header-OverlayWrapper' 
                onClick={() => handleOverLay()}
            >
            </div>
        );
    }


    renderOverlay() {
        const { currentOverlay } = this.props;

        if (!currentOverlay.length) {
            return <div key='overlay'></div>
        }

        return this.renderOverlayClose();
    }

    renderMenu() {
        return <Menu key='menu'/>;
    }

    renderNavItems() {
        return (
            <>
                { this.renderComponents(this.headerLinks) }
                <div className='Header-NavItems'>
                    { this.renderComponents(this.headerActions) }
                </div>
            </>
        );
    }

    renderHeader() {
        return (
            <header className='Header' key='header'>
                <nav className='Header-Wrapper'>
                    { this.renderNavItems() }
                </nav>
            </header>
        );
    }

    renderUnderBlock() {
        return <div className='UnderBlock' key='block'></div>;
    }

    render() {
        return this.renderComponents(this.headerComponents);
    }
}

export default HeaderComponent;