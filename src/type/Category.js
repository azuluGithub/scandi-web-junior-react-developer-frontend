import PropTypes from 'prop-types';

export const CategoryType = PropTypes.shape({
    name: PropTypes.string,
});

export const CategoriesType = PropTypes.arrayOf(CategoryType);
