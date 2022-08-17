import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomePageComponent from './HomePage.component';
import { HOME_PAGE, HOME_PAGE_ROUTE } from './HomePage.config';
import { routeAction } from '../../store/Route/Route.action';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    routeAction: (route) => dispatch(routeAction(route)),
});

class HomePage extends PureComponent {
    static propTypes = {
        routeAction: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.setCurrentRoute();
    }

    setCurrentRoute() {
        const { routeAction } = this.props;
        const currentRoute = {
            name: HOME_PAGE,
            path: HOME_PAGE_ROUTE,
        };
        routeAction(currentRoute);
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