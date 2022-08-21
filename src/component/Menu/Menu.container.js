import { PureComponent } from 'react';
import { connect } from 'react-redux';

import MenuComponent from './Menu.component';
import { CategoriesType } from 'Type/Category';

const mapStateToProps = (state) => ({
    categories: state.categoriesReducer.categories,
})

const mapDispatchToProps = (dispatch) => ({});

class Menu extends PureComponent {
    static propTypes = {
        categories: CategoriesType.isRequired,
    }

    containerProps() {
        const { categories } = this.props;
        
        return { categories };
    }

    renderMenu() {
        return (
            <MenuComponent
                { ...this.containerProps() }
            />
        );
    }

    render() {
        return this.renderMenu();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Menu);