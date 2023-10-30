import { render, screen } from '@testing-library/react';
import { Item } from './item';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';
import { mockReviews } from '../../mocks/mock-reviews';

describe('Page: Item', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Item />, {
      PRODUCTS: {
        products: mockProducts,
        backupProducts: mockProducts,
        isProductsLoading: false,
        hasError: false,
        sortingType: 'price',
        sortingDirection: 'top',
        currentPage: 3,
        showableProducts: mockProducts,
        currentId: 1,
        buyingId: 2,
        similarProducts: mockProducts,
        isSimilarProductsLoading: false,
        reviews: mockReviews,
        isReviewsLoading: false,
        product: null,
        isProductLoading: false,
      },
      MODALS: {
        isModalAddItemOpen: false,
        isModalAddItemSuccessOpen: false,
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    setTimeout(() => {
      expect(screen.getByTestId('item')).toBeInTheDocument();
    }, 10);
  });
});
