import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomePageComponent from './HomePage.component';
import { HOME_PAGE, HOME_PAGE_ROUTE } from './HomePage.config';
import { routeAction } from 'Store/Route/Route.action';
import { overlayAction } from 'Store/Overlay/Overlay.action';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    overlayAction: (name) => dispatch(overlayAction(name)),
    routeAction: (route) => dispatch(routeAction(route)),
});

class HomePage extends PureComponent {
    static propTypes = {
        routeAction: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.setCurrentRoute();
        this.handleOverLay();
    }

    setCurrentRoute() {
        const { routeAction } = this.props;
        const currentRoute = {
            name: HOME_PAGE,
            path: HOME_PAGE_ROUTE,
        };
        routeAction(currentRoute);
    }

    handleOverLay() {
        const { overlayAction } = this.props;

        overlayAction('');
    }

    renderComponent() {
        return (
            <HomePageComponent />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);