import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NoMatchComponent from './NoMatch.component';
import { routeAction } from 'Store/Route/Route.action';
import { NOMATCH, NOMATCH_ROUTE } from './NoMatch.config';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    routeAction: (route) => dispatch(routeAction(route)),
})

class NoMatch extends PureComponent {

    static propTypes = {
        routeAction: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.setCurrentPath();
    }

    setCurrentPath() {
        const { setCurrentRoute } = this;

        const currentRoute = {
            name: NOMATCH,
            path: NOMATCH_ROUTE,
        };
        setCurrentRoute(currentRoute);
    }

    setCurrentRoute(route) {
        routeAction(route);
    }

    containerFunctions() {
        return {
            setCurrentRoute: this.setCurrentRoute.bind(this),
        }
    }

    renderComponent() {
        return (
            <NoMatchComponent
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (NoMatch);