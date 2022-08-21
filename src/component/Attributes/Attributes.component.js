import { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ProductType } from 'Type/ProductList';
import AttributeSwatch from '../AttributeSwatch';
import AttributeItem from '../AttributeItem';

import './Attributes.style.scss';

class Attributes extends PureComponent {

    swatchRef= createRef();

    static propTypes = {
        product: ProductType.isRequired,
        isSmall: PropTypes.bool,
    }

    static defaultProps = {
        isSmall: false,
    }

    renderAttributeType(elem, name, type) {
        const elemValues = { elem, name, ...this.props };
        const swatchValues = { elem, name, swatchRef: this.swatchRef, ...this.props };

        return type === 'swatch'
            ? <AttributeSwatch key={elem.id} { ...swatchValues} />
            : <AttributeItem key={elem.id} { ...elemValues} />
    }

    renderAttributesItems(attrItems, name, type) {
        return attrItems.map((elem) => this.renderAttributeType(elem, name, type));
    }

    renderAttributesName(name) {
        const { isSmall } = this.props;
        
        const nameClass = isSmall && 'Attributes-Name_isSmall';

        return (
            <p className={`Attributes-Name ${nameClass}`}>
                { name }
            </p>
        );
    }

    renderAttribute(attribute) {
        const { isSmall } = this.props;
        const { id, name, type, items } = attribute;

        const attrClass = isSmall && 'Attributes_isSmall';

        return (
            <div className={`Attributes ${attrClass}`} key={id}>
                { this.renderAttributesName(name) }
                <div className='Attributes-Container'>
                    { items && this.renderAttributesItems(items, name, type) }
                </div>
            </div>
        );
    }

    renderAttributesList() {
        const { product: { attributes } } = this.props;

        return attributes.map((attribute) => this.renderAttribute(attribute));
    }


    renderAttributesComponent() {
        const { product: { attributes } } = this.props;

        return attributes && this.renderAttributesList();
    }

    render() {
        return this.renderAttributesComponent();
    }
}

export default Attributes;