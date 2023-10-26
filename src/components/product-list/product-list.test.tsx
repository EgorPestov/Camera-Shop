import { render, screen } from '@testing-library/react';
import { ProductList } from './product-list';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';

describe('Component: Product List', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductList />, {
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
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });
});
