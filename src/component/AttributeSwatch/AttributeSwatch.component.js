import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CSS from 'Util/CSS';
import { AttributeItemType } from 'Type/ProductList';

import './AttributeSwatch.style.scss';

class AttributeSwatch extends PureComponent {
    static propTypes = {
        selectedAttributes: AttributeItemType,
        name: PropTypes.string,
        elem: PropTypes.object,
        swatchRef: PropTypes.object.isRequired,
        onHandleSelectedAttributes: PropTypes.func,
        isSmall: PropTypes.bool,
        isSelectable: PropTypes.bool,
    }

    static defaultProps = {
        onHandleSelectedAttributes: () => {},
        selectedAttributes: null,
        elem: null,
        name: '',
        isSmall: false,
        isSelectable: true,
    }

    componentDidMount() {
        const { elem: { value }, swatchRef } = this.props;
        CSS.setVariable(swatchRef, 'swatch-background-color', value);
    }

    renderSmallSelectable(swatchSmallClass, selectableClass) {
        const { name, swatchRef, elem: { value }, onHandleSelectedAttributes } = this.props;

        return (
            <div className={`AttributeSwatch ${swatchSmallClass} ${selectableClass}`}
                onClick={() => onHandleSelectedAttributes(value, name)}
                ref={swatchRef}
            >
            </div>
        );
    }

    renderSelectedSelectable(selectableClass) {
        const { selectedAttributes, name, swatchRef, elem: { value }, onHandleSelectedAttributes } = this.props;
        
        const isSwatchSelected = selectedAttributes[name] === value && 'AttributeSwatch_Selected';

        return (
            <div
                onClick={() => onHandleSelectedAttributes(value, name)}
                className={`AttributeSwatch ${isSwatchSelected} ${selectableClass}`}
                ref={swatchRef}
            >
            </div>
        );
    }

    renderSmallSelectedSelectable(swatchSmallClass, selectableClass) {
        const { selectedAttributes, name, swatchRef, elem: { value }, onHandleSelectedAttributes } = this.props;
        const isSmallSwatchSelected = selectedAttributes[name] === value && 'AttributeSwatch_isSmallSwatchSelected';

        return (
            <div
                onClick={() => onHandleSelectedAttributes(value, name)}
                className={`AttributeSwatch ${swatchSmallClass} ${isSmallSwatchSelected} ${selectableClass}`}
                ref={swatchRef}
            >
            </div>
        );
    }

    renderAttributeSwatch() {
        const { isSmall, selectedAttributes, isSelectable } = this.props;

        const swatchSmallClass = isSmall && 'AttributeSwatch_isSmall';
        const selectableClass = isSelectable && 'AttributeItem_isSelectable';

        if (!selectedAttributes) {
            return this.renderSmallSelectable(swatchSmallClass, selectableClass);
        }

        if (isSmall) {
            return this.renderSmallSelectedSelectable(swatchSmallClass, selectableClass);
        }

        return this.renderSelectedSelectable(selectableClass);
    }

    render() {
        return this.renderAttributeSwatch();
    }
}

export default AttributeSwatch;