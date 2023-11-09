import { initialState, productsProcessSlice, ProductsProcessType } from './product-process';
import { mockProducts } from '../../mocks/mock-products';
import { mockReviews } from '../../mocks/mock-reviews';

describe('Products Process Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = productsProcessSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = productsProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set products', () => {
    const action = productsProcessSlice.actions.setProducts(mockProducts);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      products: mockProducts,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set backup products', () => {
    const action = productsProcessSlice.actions.setBackupProducts(mockProducts);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      backupProducts: mockProducts,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set products load status', () => {

    const action = productsProcessSlice.actions.setProductsLoadStatus(false);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isProductsLoading: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set error', () => {

    const action = productsProcessSlice.actions.setError(true);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      hasError: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set sorting type', () => {

    const action = productsProcessSlice.actions.setSortingType('popularity');

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      sortingType: 'popularity',
    };

    expect(result).toEqual(expectedState);
  });

  it('should set sorting type direction', () => {

    const action = productsProcessSlice.actions.setSortingDirection('down');

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      sortingDirection: 'down',
    };

    expect(result).toEqual(expectedState);
  });

  it('should set current page', () => {

    const action = productsProcessSlice.actions.setCurrentPage(2);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      currentPage: 2,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set showable products', () => {
    const startState: ProductsProcessType = {
      ...initialState,
      currentPage: 2,
      products: mockProducts,
      isProductsLoading: false,
    };
    const action = productsProcessSlice.actions.setShowableProducts();

    const result = productsProcessSlice.reducer(startState, action);

    const expectedState = {
      ...startState,
      showableProducts: mockProducts.slice(9, 18),
    };

    expect(result).toEqual(expectedState);
  });

  it('should set current ID', () => {
    const action = productsProcessSlice.actions.setCurrentId(42);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      currentId: 42,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set buying ID', () => {
    const action = productsProcessSlice.actions.setBuyingId(42);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      buyingId: 42,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set similar products', () => {
    const action = productsProcessSlice.actions.setSimilarProducts(mockProducts);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      similarProducts: mockProducts,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set similar products load status', () => {

    const action = productsProcessSlice.actions.setSimilarProductsLoadStatus(true);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isSimilarProductsLoading: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set reviews', () => {
    const action = productsProcessSlice.actions.setReviews(mockReviews);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      reviews: mockReviews,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set reviews load status', () => {

    const action = productsProcessSlice.actions.setReviewsLoadStatus(true);

    const result = productsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isReviewsLoading: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('should sort products by price to top and should set lowest and highest price', () => {
    const startState: ProductsProcessType = {
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
    };

    const action = productsProcessSlice.actions.sortAndFilterProducts();

    const result = productsProcessSlice.reducer(startState, action);

    const expectedProducts = mockProducts.slice().sort((a, b) => a.price - b.price);

    const expectedState = {
      ...startState,
      products: expectedProducts,
      showableProducts: expectedProducts.slice(0, 9),
      priceLowest: 5690,
      priceHighest: 149990,
    };

    expect(result).toEqual(expectedState);
  });

  it('should filter products by category and should set lowest and highest price', () => {
    const startState: ProductsProcessType = {
      products: mockProducts,
      backupProducts: mockProducts,
      isProductsLoading: false,
      hasError: false,
      sortingType: null,
      sortingDirection: null,
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
      filterCategory: 'Видеокамера',
      filterType: null,
      filterLevel: null,
      filterLowestPrice: null,
      filterHighestPrice: null,
      priceLowest: null,
      priceHighest: null,
    };

    const action = productsProcessSlice.actions.sortAndFilterProducts();

    const result = productsProcessSlice.reducer(startState, action);

    const expectedState = {
      ...startState,
      products: mockProducts.filter((product) => product.category === 'Видеокамера'),
      showableProducts: mockProducts.filter((product) => product.category === 'Видеокамера'),
      priceLowest: 5690,
      priceHighest: 149990,
    };

    expect(result).toEqual(expectedState);
  });

});
