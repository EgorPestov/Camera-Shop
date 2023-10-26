import { render, screen } from '@testing-library/react';
import { Catalog } from './catalog';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';

describe('Page: Catalog', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Catalog />, {
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

    expect(screen.getByTestId('catalog')).toBeInTheDocument();
  });
});
