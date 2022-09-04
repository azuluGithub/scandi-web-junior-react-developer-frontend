import PropTypes from 'prop-types';

import { CartItemType } from './ProductList';

export const PopupType = PropTypes.shape({
    item: CartItemType,
    message: PropTypes.string,
});