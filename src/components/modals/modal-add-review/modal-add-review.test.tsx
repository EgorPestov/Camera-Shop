import { render, screen } from '@testing-library/react';
import { ModalAddReview } from './modal-add-review';
import { withHistory, withStore } from '../../../mocks/mock-component';
import { mockProducts } from '../../../mocks/mock-products';
import { mockReviews } from '../../../mocks/mock-reviews';

describe('Component: Modal Add Review', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ModalAddReview />, {
      PRODUCTS: {
        products: mockProducts,
        backupProducts: mockProducts,
        isProductsLoading: false,
        hasError: false,
        sortingType: 'price',
        sortingDirection: 'top',
        currentPage: 1,
        showableProducts: mockProducts,
        currentId: 0,
        buyingId: 3,
        similarProducts: mockProducts,
        isSimilarProductsLoading: false,
        reviews: mockReviews,
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
      },
      MODALS: {
        isModalAddItemOpen: false,
        isModalAddItemSuccessOpen: false,
        isModalAddReviewOpen: true,
        isModalAddReviewSuccessOpen: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('modal-add-review')).toBeInTheDocument();
  });
});
