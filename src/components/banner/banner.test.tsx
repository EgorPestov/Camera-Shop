import { render, screen } from '@testing-library/react';
import { Banner } from './banner';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Banner />, {
      PRODUCTS: {
        products: mockProducts,
        backupProducts: [],
        isProductsLoading: true,
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
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('banner')).toBeInTheDocument();
  });
});
