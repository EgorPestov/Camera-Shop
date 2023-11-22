import { render, screen } from '@testing-library/react';
import { ModalBasketRemoveItem } from './modal-basket-remove-item';
import { withHistory, withStore } from '../../../mocks/mock-component';
import { mockProducts } from '../../../mocks/mock-products';

describe('Component: Modal Basket Remove Item', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ModalBasketRemoveItem handleDelete={(mockId) => mockId.toString()}/>, {
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
        isModalAddItemOpen: false,
        isModalAddItemSuccessOpen: false,
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: false,
        isModalBasketFailOpen: false,
        isModalBasketSuccessOpen: false,
        isModalBasketRemoveItemOpen: true,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('modal-basket-remove-item')).toBeInTheDocument();
  });
});
