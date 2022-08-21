import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Attributes from '../Attributes';
import { INCREASE_CART_TYPE, DECREASE_CART_TYPE } from './CartItem.config';
import ProductContent from '../ProductContent';
import { CurrencyType, CartItemType } from 'Type/ProductList';
import Chevron from 'Util/Icons/Chevron';
import CSS from 'Util/CSS';

import './CartItem.style.scss';

class CartItemComponent extends PureComponent {
    static propTypes = {
        item: CartItemType.isRequired,
        selectedCurrency: CurrencyType.isRequired,
        updateCartHandler: PropTypes.func,
        isSmall: PropTypes.bool,
        currencyIsUSD: PropTypes.bool,
        isSelectable: PropTypes.bool,
    }

    static defaultProps = {
        updateCartHandler: () => {},
        isSmall: false,
        currencyIsUSD: false,
        isSelectable: true,
    }

    numberOfItems = 0;

    state = {
        activeSlide: 0,
    }

    componentDidMount() {
        const { sliderWrapperRef, item: { product: { gallery } } } = this.props;

        this.numberOfItems = gallery.length;

        CSS.setVariable(sliderWrapperRef, 'image-slider-x-position', 0);
        CSS.setVariable(sliderWrapperRef, 'cart-items-number-of-images', this.numberOfItems);
    }

    handleLeftClick() {
        const { activeSlide } = this.state;
        const { sliderWrapperRef } = this.props;

        if (activeSlide === 0) {
            return ;
        }

        const newCount = activeSlide - 1;
        this.setState({ activeSlide: newCount });

        CSS.setVariable(sliderWrapperRef, 'image-slider-x-position', newCount);
    }

    handleRightClick() {
        const { activeSlide } = this.state;
        const { sliderWrapperRef  } = this.props;

        if (activeSlide === this.numberOfItems - 1) {
            return ;
        }

        const newCount = activeSlide + 1;
        this.setState({ activeSlide: newCount });

        CSS.setVariable(sliderWrapperRef, 'image-slider-x-position', newCount);
    }

    renderProductContent() {
        const { item: { product }, isSmall, currencyIsUSD } = this.props;

        return (
            <ProductContent
                product={product}
                isSmall={isSmall}
                currencyIsUSD={currencyIsUSD}
            />
        )
    }

    renderAttributes() {
        const { item: { product, selectedAttributes }, isSmall, isSelectable } = this.props;
        const attributesProps = { product, selectedAttributes, isSmall, isSelectable };

        return <Attributes { ...attributesProps } />;
    }

    renderContent() {
        return (
            <div className='CartItem-Content'>
                { this.renderProductContent() }
                { this.renderAttributes() }
            </div>
        );
    }

    renderActionIncrement() {
        const { isSmall, updateCartHandler } = this.props;

        const buttonClass = isSmall && 'CartItem-ActionButton_isSmall';

        return (
            <div
                onClick={() => updateCartHandler(INCREASE_CART_TYPE)}
                className={`CartItem-ActionButton ${buttonClass}`}
            >
                &#43;
            </div>
        );
    }

    renderActionDecrement() {
        const { isSmall, updateCartHandler, item: { item_qty } } = this.props;

        const minValue = item_qty < 2 && 'CartItem-ActionButton_MinValue';
        const buttonClass = isSmall && 'CartItem-ActionButton_isSmall';

        return (
            <div
                onClick={() => updateCartHandler(DECREASE_CART_TYPE)}
                className={`CartItem-ActionButton ${buttonClass} ${minValue}`}
            >
                &#45;
            </div>
        );
    }

    renderActionQuantity() {
        const { item: { item_qty }, isSmall } = this.props;

        const buttonClass = isSmall && 'CartItem-ActionButton_isSmall';

        return (
            <div className={`CartItem-ActionButton CartItem-ActionButton_NoBorder ${buttonClass}`}>
                { item_qty }
            </div>
        );
    }

    renderActions() {
        const { isSmall } = this.props;

        const buttonClass = isSmall && 'CartItem-Actions_isSmall';

        return (
            <div className={`CartItem-Actions ${buttonClass}`}>
                { this.renderActionIncrement() }
                { this.renderActionQuantity() }
                { this.renderActionDecrement() }
            </div>
        );
    }

    renderImageArrows() {
        const { activeSlide } = this.state;

        const startOfSlide = activeSlide === 0 && 'CartItem-Chevron_Disabled';
        const endOfSlide = activeSlide === this.numberOfItems - 1 && 'CartItem-Chevron_Disabled';

        return (
            <>
                <div onClick={() => this.handleLeftClick() }
                    className={`CartItem-Chevron CartItem-Chevron_Left ${startOfSlide}`}
                >
                    <Chevron width={14} height={14} color={'#fff'}/>
                </div>
                <div onClick={() => this.handleRightClick() } className={`CartItem-Chevron ${endOfSlide}`}>
                    <Chevron width={14} height={14} color={'#fff'}/>
                </div>
            </>
        );
    }

    renderImageArrowsCheck() {
        const { item: { product: { gallery } } } = this.props;

        return gallery.length > 1 && this.renderImageArrows();
    }

    renderImageSlide(url) {
        const { isSmall } = this.props;

        const urlClass = isSmall && 'CartItem-ImageSlide_isSmall';

        return (
            <div className={`CartItem-ImageSlide ${urlClass}`} key={url} >
                <img src={url} alt='awesome scandi product for sale' />
            </div>
        );
    }

    renderSLiderList() {
        const { item: { product: { gallery } } } = this.props;

        return gallery && gallery.map((url) => this.renderImageSlide(url));

    }

    renderImageSlider() {
        const { isSmall, sliderWrapperRef } = this.props;
        
        const imgClass = isSmall && 'CartItem-ImageSlider_isSmall';
        const imgWrapperClass = isSmall && 'CartItem-ImageSliderWrapper';

        return (
            <div className={`CartItem-ImageSlider ${imgClass}`}>
                <div
                    ref={sliderWrapperRef}
                    className={`CartItem-ImageSliderWrapper ${imgWrapperClass}`}
                >
                    { this.renderSLiderList() }
                </div>
                { !isSmall && this.renderImageArrowsCheck() }
            </div>
        );
    }

    renderActionsWithImage() {
        return (
            <div className='CartItem-ActionsWithImage'>
                { this.renderActions() }
                { this.renderImageSlider() }
            </div>
        );
    }

    renderCartItem() {
        const { isSmall } = this.props;
        
        const itemClass = isSmall && 'CartItem_isSmall';

        return (
            <div className={`CartItem ${itemClass}`}>
                { this.renderContent() }
                { this.renderActionsWithImage() }
            </div>
        );
    }

    render() {
        return this.renderCartItem();
    }
}

export default CartItemComponent;