import { PureComponent } from 'react';

import MenuItem from '../MenuItem';
import { CategoriesType } from 'Type/Category';

import './Menu.style.scss';

class MenuComponent extends PureComponent {
    static propTypes = {
        categories: CategoriesType.isRequired,
    }

    renderMenuItem(name) {
        return (
            <MenuItem
                category={name}
                key={name}
            />
        );
    }

    renderList() {
        const { categories } = this.props;

        if (!categories.length) {
            return ;
        }
        
        return categories.map((category) => this.renderMenuItem(category.name));
    }

    renderMenu() {
        return (
            <div className='Menu'>
               { this.renderList() }
            </div>
        );
    }

    render() {
        return this.renderMenu();
    }
}

export default MenuComponent;