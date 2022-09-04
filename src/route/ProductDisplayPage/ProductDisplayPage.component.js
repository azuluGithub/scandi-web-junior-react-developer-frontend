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

    renderOutOfStock() {

        return (
            <div className='ProductDisplayPage-OutOfStock'>
                <p className="ProductDisplayPage-OutOfStockText">
                    OUT OF STOCK
                </p>
            </div>
        )
    }

    renderProductWrapper() {
        const { product } = this.props;

        if (!product) {
            return ;
        }

        const { inStock } = product;
        
        return (
            <ContainerWrapper>
                <div className='ProductDisplayPage-Wrapper'>
                    { this.renderProductGallery() }
                    { this.renderProductActions() }
                    { !inStock && this.renderOutOfStock() }
                </div>
            </ContainerWrapper>
        );
    }

    renderProductDisplayPage() {
        return (
            <main className='ProductDisplayPage'>
                { this.renderProductWrapper() }
            </main>
        );
    }

    render() {
        return this.renderProductDisplayPage();
    }
}

export default ProductDisplayPageComponent;