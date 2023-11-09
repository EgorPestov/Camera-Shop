import { render, screen } from '@testing-library/react';
import { SimilarProducts } from './similar-products';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';

describe('Component: Similar Products', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<SimilarProducts />, {
      PRODUCTS: {
        products: mockProducts,
        backupProducts: [],
        isProductsLoading: false,
        hasError: false,
        sortingType: 'price',
        sortingDirection: 'top',
        currentPage: 1,
        showableProducts: [],
        currentId: 3,
        buyingId: 0,
        similarProducts: mockProducts,
        isSimilarProductsLoading: false,
        reviews: [],
        isReviewsLoading: false,
        product: null,
        isProductLoading: false,
        filterCategory: null,
        filterType: null,
        filterLevel: null,
        filterLowestPrice: null,
        filterHighestPrice: null,
        priceLowest: null,
        priceHighest: null,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('similar-products')).toBeInTheDocument();
  });
});
