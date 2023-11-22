import { State } from '../hooks/use-app-selector/use-app-selector';
import { mockProducts } from './mock-products';
import { mockReviews } from './mock-reviews';

export const mockStore = (initialState?: Partial<State>): State => ({
  PRODUCTS: {
    products: mockProducts,
    backupProducts: mockProducts,
    isProductsLoading: false,
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
    isModalBasketRemoveItemOpen: false,
  },
  ...initialState ?? {},
});
