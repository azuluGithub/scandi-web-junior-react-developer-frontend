import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CSS from 'Util/CSS';

import './ProductGallery.style.scss';

class ProductGalleryComponent extends PureComponent {
    static propTypes = {
        gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    numberOfItems = 0;

    state = {
        activeSlide: 0,
    }

    componentDidMount() {
        const { gallerySliderWrapperRef, gallery } = this.props;

        this.numberOfItems = gallery.length;
        CSS.setVariable(gallerySliderWrapperRef, 'gallery-items-length', this.numberOfItems);
    }

    renderAdditionalSlide(url, pos) {
        const { activeSlide } = this.state;
        const isActiveClass = pos === activeSlide && 'ProductGallery-AdditionalImage_isActive';

        return (
            <div
                onClick={() => this.setActiveSlide(pos)}
                className='ProductGallery-AdditionalSlide'
                key={url}
            >
                <img
                    src={url} 
                    alt='awesome scandi product for sale'
                    className={`ProductGallery-AdditionalImage ${isActiveClass}`}
                />
            </div>
        );
    }

    renderAdditionalSliderList() {
        const { gallery } = this.props;

        return gallery && gallery.map((url, pos) => this.renderAdditionalSlide(url, pos));

    }

    renderAdditionalSlider() {
        const { additionalSliderWrapperRef } = this.props;

        return (
            <div className='ProductGallery-AdditionalSlider'>
                <div
                    ref={additionalSliderWrapperRef}
                    className='ProductGallery-AdditionalSliderWrapper'
                >
                    { this.renderAdditionalSliderList() }
                </div>
            </div>
        );
    }

    renderImageSlide(url) {
        return (
            <div
                className='ProductGallery-ImageSlide'
                key={url}
            >
                <img src={url} alt='awesome scandi product for sale' />
            </div>
        );
    }

    renderSliderList() {
        const { gallery } = this.props;

        return gallery && gallery.map((url) => this.renderImageSlide(url));
    }

    setActiveSlide(pos) {
        const { gallerySliderWrapperRef, additionalSliderWrapperRef } = this.props;

        this.setState({ activeSlide: pos });

        CSS.setVariable(gallerySliderWrapperRef, 'gallery-slider-x-position', pos);
        CSS.setVariable(additionalSliderWrapperRef, 'additional-slider-y-position', pos);
    }

    renderSliderSelector(url, pos) {
        const { activeSlide } = this.state;
        const isActiveClass = pos === activeSlide && 'ProductGallery-SliderSelector_isActive';

        return (
            <div
                onClick={() => this.setActiveSlide(pos)}
                className={`ProductGallery-SliderSelector ${isActiveClass}`}
                key={url}
            >
            </div>
        );
    }

    renderSliderSelectors() {
        const { gallery } = this.props;

        if (!gallery.length) {
            return ;
        }

        return gallery.map((url, pos) => this.renderSliderSelector(url, pos));
    }

    renderGallerySlider() {
        const { gallerySliderWrapperRef } = this.props;

        return (
            <div className='ProductGallery-Slider'>
                <div
                    ref={gallerySliderWrapperRef}
                    className='ProductGallery-SliderWrapper'
                >
                    { this.renderSliderList() }
                </div>
                <div className='ProductGallery-SliderSelectors'>
                    { this.renderSliderSelectors() }
                </div>
            </div>
        );
    }

    renderProductGallery() {
        return (
            <div className='ProductGallery'>
              { this.renderAdditionalSlider() }
              { this.renderGallerySlider() }
            </div>
        );
    }

    render() {
        return this.renderProductGallery();
    }
}

export default ProductGalleryComponent;