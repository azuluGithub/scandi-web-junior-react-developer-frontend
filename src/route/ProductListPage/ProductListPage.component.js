import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ContainerWrapper from 'Component/ContainerWrapper';
import ProductCard from 'Component/ProductCard';
import { ProductType } from 'Type/ProductList';

import './ProductListPage.style.scss';

class ProductListPageComponent extends PureComponent {
    static propTypes = {
        products: PropTypes.arrayOf(ProductType),
        category: PropTypes.string,
    }

    static defaultProps = {
        products: [],
        category: '',
    }

    renderTitleSkeleton() {
        return (
            <div className='ProductListPage-TitleWrapper'>
                <div className='ProductListPage-TitleSkeleton'></div>
            </div>
        );
    }

    renderProductCardSeleton(i) {
        return <div className='ProductListPage-CardContainerSkeleton' key={i}></div>;
    }

    renderProductListSkeleton() {
        return (
            <div className='ProductListPage-List'>
                { Array.from(Array(10), (_, i) => this.renderProductCardSeleton(i)) }
            </div>
        );
    }

    renderTitle() {
        const { category } = this.props;

        return (
            <div className='ProductListPage-TitleWrapper'>
                <h1 className='ProductListPage-Title'>
                    { category }
                </h1>
            </div>
        );
    }

    renderProduct(product) {
        const { id } = product;

        return (
            <ProductCard
                key={id}
                product={product}
            />
        );
    }

    renderProductList() {
        const { products } = this.props;

        return (
            <div className='ProductListPage-List'>
                { products.map((product) => this.renderProduct(product)) }
            </div>
        );
    }

    renderProductWrapper() {
        const { products } = this.props;

        if (!products.length) {
            return (
                <div className='ProductListPage-Skeleton'>
                    { this.renderTitleSkeleton() }
                    { this.renderProductListSkeleton() }
                </div>
            )
        }

        return (
            <>
                { this.renderTitle() }
                { this.renderProductList() }
            </>
        );
    }

    renderProductListPage() {
        return (
            <main className='ProductListPage'>
                <ContainerWrapper>
                    { this.renderProductWrapper() }
                </ContainerWrapper>
            </main>
        );
    }

    render() {
        return this.renderProductListPage();
    }
}

export default ProductListPageComponent;