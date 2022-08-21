import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { RouteType } from 'Type/Route';
import { CATEGORIES_ROUTE } from './MenuItem.config';

import './MenuItem.style.scss';

class MenuItemComponent extends PureComponent {
    static propTypes = {
        category: PropTypes.string.isRequired,
        currentRoute: RouteType,
        setSelectedCategory: PropTypes.func,
    }

    static defaultProps = {
        category: null,
        currentRoute: {},
        setSelectedCategory: () => {},
    }

    renderMenuItem() {
        const { 
            currentRoute: { name }, 
            setSelectedCategory, 
            category 
        } = this.props;

        const itemClass = name === category 
                ? 'ListItem ListItem_isActive' 
                : 'ListItem';

        const currentRoute = {
            name: category,
            path: CATEGORIES_ROUTE,
        };

        return (
            <Link
                key={category}
                to={`/category/${category}`}
                className={`${itemClass} Link`}
                onClick={() => setSelectedCategory(currentRoute)}
            >
                { category }
            </Link>
        );
    }

    render() {
        return this.renderMenuItem();
    }
}

export default MenuItemComponent;