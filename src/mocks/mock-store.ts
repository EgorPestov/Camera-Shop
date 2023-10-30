import { State } from '../hooks/use-app-selector/use-app-selector';
import { mockProducts } from './mock-products';
import { mockReviews } from './mock-reviews';

export const mockStore = (initialState?: Partial<State>): State => ({
  PRODUCTS: {
    products: mockProducts,
    backupProducts: mockProducts,
    isProductsLoading: true,
    hasError: false,
    sortingType: 'price',
    sortingDirection: 'top',
    currentPage: 1,
    showableProducts: [],
    currentId: 0,
    buyingId: 0,
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
  },
  ...initialState ?? {},
});
