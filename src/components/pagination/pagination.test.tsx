import { render, screen } from '@testing-library/react';
import { Pagination } from './pagination';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Pagination />, {
      PRODUCTS: {
        products: mockProducts,
        backupProducts: [],
        isProductsLoading: false,
        hasError: false,
        sortingType: 'price',
        sortingDirection: 'top',
        currentPage: 1,
        showableProducts: [],
        currentId: 0,
        buyingId: 0,
        similarProducts: [],
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

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
