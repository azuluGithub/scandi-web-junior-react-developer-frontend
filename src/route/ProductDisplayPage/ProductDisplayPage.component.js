import { createRef, PureComponent } from 'react';

import ContainerWrapper from 'Component/ContainerWrapper';
import ProductGallery from 'Component/ProductGallery';
import ProductActions from 'Component/ProductActions';
import { ProductType } from 'Type/ProductList';

import './ProductDisplayPage.style.scss';

class ProductDisplayPageComponent extends PureComponent {
    static propTypes = {
        product: ProductType,
    }

    static defaultProps = {
        product: null,
    }

    gallerySliderWrapperRef = createRef();
    additionalSliderWrapperRef = createRef();

    renderProductGallery() {
        const { product } = this.props;
        const { gallerySliderWrapperRef, additionalSliderWrapperRef } = this;

        if (!product) {
            return ;
        }

        const { gallery } = product;
        
        return (
            <ProductGallery 
                gallery={gallery}
                gallerySliderWrapperRef={gallerySliderWrapperRef}
                additionalSliderWrapperRef={additionalSliderWrapperRef}
            />
        );
    }

    renderProductActions() {
        const { product } = this.props;

        return (
            <ProductActions
                product={product}
            />
        );
    }

    renderProductWrapper() {
        return (
            <div className='ProductDisplayPage-Wrapper'>
                { this.renderProductGallery() }
                { this.renderProductActions() }
            </div>
        );
    }

    renderProductDisplayPage() {
        return (
            <main className='ProductDisplayPage'>
                <ContainerWrapper>
                    { this.renderProductWrapper() }
                </ContainerWrapper>
            </main>
        );
    }

    render() {
        return this.renderProductDisplayPage();
    }
}

export default ProductDisplayPageComponent;