import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { AttributeItemType } from 'Type/ProductList';

import './AttributeItem.style.scss';

class AttributeItem extends PureComponent {
    static propTypes = {
        selectedAttributes: PropTypes.object,
        name: PropTypes.string,
        elem: AttributeItemType,
        onHandleSelectedAttributes: PropTypes.func,
        isSmall: PropTypes.bool,
        isSelectable: PropTypes.bool,
    }

    static defaultProps = {
        onHandleSelectedAttributes: () => {},
        selectedAttributes: null,
        name: '',
        elem: null,
        isSmall: false,
        isSelectable: true,
    }

    renderSelectable(itemClass, selectableClass) {
        const { name, elem: { value }, onHandleSelectedAttributes } = this.props;

        return (
            <div
                className={`AttributeItem ${itemClass} ${selectableClass}`}
                onClick={() => onHandleSelectedAttributes(value, name)}
            >
                { value }
            </div>
        );
    }

    renderSelectedSelectable(itemClass, selectableClass) {
        const { name, elem: { value }, selectedAttributes, onHandleSelectedAttributes } = this.props;
        
        const isItemSelected = selectedAttributes[name] === value && 'AttributeItem_Selected';

        return (
            <div 
                className={`AttributeItem ${itemClass} ${isItemSelected} ${selectableClass}`}
                onClick={() => onHandleSelectedAttributes(value, name)}
            >
                { value }
            </div>
        );
    }

    renderAttributeItem() {
        const { isSmall, selectedAttributes, isSelectable } = this.props;

        const itemClass = isSmall && 'AttributeItem_isSmall';
        const selectableClass = isSelectable && 'AttributeItem_isSelectable';

        if (!selectedAttributes) {
            return this.renderSelectable(itemClass, selectableClass);
        }

        return this.renderSelectedSelectable(itemClass, selectableClass);
    }

    render() {
        return this.renderAttributeItem();
    }
}

export default AttributeItem;