import { render, screen } from '@testing-library/react';
import { ModalAddItem } from './modal-add-item';
import { withHistory, withStore } from '../../../mocks/mock-component';
import { mockProducts } from '../../../mocks/mock-products';

describe('Component: Modal Add Item', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ModalAddItem />, {
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
      },
      MODALS: {
        isModalAddItemOpen: true,
        isModalAddItemSuccessOpen: false,
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('modal-add-item')).toBeInTheDocument();
  });
});
