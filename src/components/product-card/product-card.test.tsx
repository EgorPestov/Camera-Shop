import { render, screen } from '@testing-library/react';
import { ProductCard } from './product-card';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockProducts } from '../../mocks/mock-products';

describe('Component: Product Card', () => {
  const mockKey = '1';
  const mockProduct = mockProducts[0];

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductCard key={mockKey} product={mockProduct} />, {
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

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
});
