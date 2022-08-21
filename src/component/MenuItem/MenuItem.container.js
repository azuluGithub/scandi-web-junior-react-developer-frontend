import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MenuItemComponent from './MenuItem.component';
import { routeAction } from 'Store/Route/Route.action';
import { RouteType } from 'Type/Route';

import './MenuItem.style.scss';

const mapStateToProps = (state) => ({
    currentRoute: state.route.currentRoute,
})

const mapDispatchToProps = (dispatch) => ({
    routeAction: (route) => dispatch(routeAction(route)),
});

class MenuItem extends PureComponent {
    static propTypes = {
        category: PropTypes.string.isRequired,
        currentRoute: RouteType,
        routeAction: PropTypes.func,
    }

    static defaultProps = {
        currentRoute: {},
        routeAction: () => {},
    }

    containerProps() {
        const { currentRoute, category } = this.props;

        return { currentRoute, category };
    }

    setSelectedCategory(route) {
        const { routeAction } = this.props;
        
        routeAction(route);
    }

    containerFunctions() {
        return {
            setSelectedCategory: this.setSelectedCategory.bind(this),
        }
    }

    renderComponent() {
        return (
            <MenuItemComponent
                { ...this.containerProps()}
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MenuItem);
