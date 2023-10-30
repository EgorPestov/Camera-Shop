import { render, screen } from '@testing-library/react';
import { Reviews } from './reviews';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';
import { mockReviews } from '../../mocks/mock-reviews';

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Reviews />, {
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
        similarProducts: [],
        isSimilarProductsLoading: false,
        reviews: mockReviews,
        isReviewsLoading: false,
        product: null,
        isProductLoading: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });
});
