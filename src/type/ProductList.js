import PropTypes from 'prop-types';

export const AttributeItemType = PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    displayValue: PropTypes.string,
});

export const AttributeType = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    items: PropTypes.arrayOf(AttributeItemType),
});

export const CurrencyType = PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
});

export const PriceType = PropTypes.shape({
    amount: PropTypes.number,
    currency: CurrencyType,
});

export const ProductType = PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    brand: PropTypes.string,
    name: PropTypes.string,
    inStock: PropTypes.bool,
    description: PropTypes.string,
    gallery: PropTypes.arrayOf(PropTypes.string),
    prices: PropTypes.arrayOf(PriceType),
    attribute: PropTypes.arrayOf(AttributeType),
});

export const CartItemType = PropTypes.shape({
    item_id: PropTypes.string,
    item_qty: PropTypes.number,
    product: ProductType,
});
