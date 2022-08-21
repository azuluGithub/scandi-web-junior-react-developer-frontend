import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CART_OVERLAY } from './Header.config';
import HeaderComponent from './Header.component';
import { overlayAction } from 'Store/Overlay/Overlay.action';
import { routeAction } from 'Store/Route/Route.action';

const mapStateToProps = (state) => ({
    itemsCount: state.cart.itemsCount,
    currentOverlay: state.overlay.currentOverlay,
});

const mapDispatchToProps = (dispatch) => ({
    overlayAction: (name) => dispatch(overlayAction(name)),
    routeAction: (route) => dispatch(routeAction(route)),
})

class Header extends PureComponent {
    static propTypes = {
        currentOverlay: PropTypes.string,
        overlayAction: PropTypes.func.isRequired,
        routeAction: PropTypes.func.isRequired,
        itemsCount: PropTypes.number.isRequired,
    }

    static defaultProps = {
        currentOverlay: '',
    }

    containerProps() {
        const { itemsCount, currentOverlay} = this.props;
        return { itemsCount, currentOverlay };
    }

    containerFunctions() {
        return {
            toggleCartOverlayOpen: this.toggleCartOverlayOpen.bind(this),
            setCurrentRoute: this.setCurrentRoute.bind(this),
            handleOverLay: this.handleOverLay.bind(this),
        }
    }

    handleOverLay() {
        const { overlayAction } = this.props;

        overlayAction('');
    }

    setCurrentRoute(route) {
        const { routeAction } = this.props;
        
        routeAction(route);
    }

    toggleCartOverlayOpen() {
        const { overlayAction, currentOverlay } = this.props;

        if (currentOverlay === CART_OVERLAY) {
            return overlayAction('');
        }
        overlayAction(CART_OVERLAY);
    }

    renderComponents() {
        return (
            <HeaderComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponents();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);