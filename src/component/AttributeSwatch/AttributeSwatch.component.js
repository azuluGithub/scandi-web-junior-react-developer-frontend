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

    renderSmallSelectable(swatchSmallClass, selectableClass, swatchWhite) {
        const { name, swatchRef, elem: { value }, onHandleSelectedAttributes } = this.props;

        return (
            <div className={`AttributeSwatch ${swatchSmallClass} ${selectableClass} ${swatchWhite}`}
                onClick={() => onHandleSelectedAttributes(value, name)}
                ref={swatchRef}
            >
            </div>
        );
    }

    renderSelectedSelectable(selectableClass, swatchWhite) {
        const { selectedAttributes, name, swatchRef, elem: { value }, onHandleSelectedAttributes } = this.props;
        
        const isSwatchSelected = selectedAttributes[name] === value && 'AttributeSwatch_Selected';

        return (
            <div
                onClick={() => onHandleSelectedAttributes(value, name)}
                className={`AttributeSwatch ${isSwatchSelected} ${selectableClass} ${swatchWhite}`}
                ref={swatchRef}
            >
            </div>
        );
    }

    renderSmallSelectedSelectable(swatchSmallClass, selectableClass, swatchWhite) {
        const { selectedAttributes, name, swatchRef, elem: { value }, onHandleSelectedAttributes } = this.props;
        const isSmallSwatchSelected = selectedAttributes[name] === value && 'AttributeSwatch_isSmallSwatchSelected';

        return (
            <div
                onClick={() => onHandleSelectedAttributes(value, name)}
                className={`AttributeSwatch ${swatchSmallClass} ${isSmallSwatchSelected} ${selectableClass} ${swatchWhite}`}
                ref={swatchRef}
            >
            </div>
        );
    }

    renderAttributeSwatch() {
        const { isSmall, selectedAttributes, isSelectable, elem: { value } } = this.props;

        const swatchSmallClass = isSmall && 'AttributeSwatch_isSmall';
        const selectableClass = isSelectable && 'AttributeSwatch_isSelectable';
        const swatchWhite = value === '#FFFFFF' && 'AttributeSwatch_isWhite';

        if (!selectedAttributes) {
            return this.renderSmallSelectable(swatchSmallClass, selectableClass, swatchWhite);
        }

        if (isSmall) {
            return this.renderSmallSelectedSelectable(swatchSmallClass, selectableClass, swatchWhite);
        }

        return this.renderSelectedSelectable(selectableClass, swatchWhite);
    }

    render() {
        return this.renderAttributeSwatch();
    }
}

export default AttributeSwatch;