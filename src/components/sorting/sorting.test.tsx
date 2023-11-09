import { render, screen } from '@testing-library/react';
import { Sorting } from './sorting';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Sorting />, {
      PRODUCTS: {
        products: mockProducts,
        backupProducts: mockProducts,
        isProductsLoading: false,
        hasError: false,
        sortingType: 'price',
        sortingDirection: 'top',
        currentPage: 1,
        showableProducts: mockProducts,
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

    expect(screen.getByTestId('sorting')).toBeInTheDocument();
  });
});
