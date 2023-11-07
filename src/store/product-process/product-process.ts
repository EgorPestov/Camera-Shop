import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, ReviewType } from '../../types';
import { NameSpace } from '../../const';
import { SHOWABLE_CARDS_PER_PAGE_COUNT } from '../../const';
import { FilterCategory, FilterLevel, FilterType } from '../../types';

export type ProductsProcessType = {
  products: ProductType[];
  backupProducts: ProductType[];
  isProductsLoading: boolean;
  hasError: boolean;
  sortingType: 'price' | 'popularity' | null;
  sortingDirection: 'top' | 'down' | null;
  currentPage: number;
  showableProducts: ProductType[];
  currentId: number;
  buyingId: number;
  similarProducts: ProductType[];
  isSimilarProductsLoading: boolean;
  reviews: ReviewType[];
  isReviewsLoading: boolean;
  product: ProductType | null;
  isProductLoading: boolean;
  filterCategory: FilterCategory;
  filterType: FilterType;
  filterLevel: FilterLevel;
  filterLowestPrice: number | null;
  filterHighestPrice: number | null;
  priceLowest: number | null;
  priceHighest: number | null;
}

export const initialState: ProductsProcessType = {
  products: [],
  backupProducts: [],
  isProductsLoading: true,
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
  filterCategory: null,
  filterType: null,
  filterLevel: null,
  filterLowestPrice: null,
  filterHighestPrice: null,
  priceLowest: null,
  priceHighest: null,
};

export const productsProcessSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
    setBackupProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.backupProducts = action.payload;
    },
    setProductsLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isProductsLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setSortingType: (state, action: PayloadAction<'price' | 'popularity' | null>) => {
      state.sortingType = action.payload;
    },
    setSortingDirection: (state, action: PayloadAction<'top' | 'down' | null>) => {
      state.sortingDirection = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setShowableProducts: (state) => {
      state.showableProducts = state.products.slice((state.currentPage - 1) * SHOWABLE_CARDS_PER_PAGE_COUNT, state.currentPage * SHOWABLE_CARDS_PER_PAGE_COUNT);
    },
    setCurrentId: (state, action: PayloadAction<number>) => {
      state.currentId = action.payload;
    },
    setBuyingId: (state, action: PayloadAction<number>) => {
      state.buyingId = action.payload;
    },
    setSimilarProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.similarProducts = action.payload;
    },
    setSimilarProductsLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isSimilarProductsLoading = action.payload;
    },
    setReviews: (state, action: PayloadAction<ReviewType[]>) => {
      state.reviews = action.payload;
    },
    setReviewsLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewsLoading = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductType | null>) => {
      state.product = action.payload;
    },
    setProductLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isProductLoading = action.payload;
    },
    setLowestPrice: (state) => {
      if (state.products.length) {
        const lowestPrice = state.products.reduce((minPrice, product) => minPrice === null || product.price < minPrice ? product.price : minPrice, state.products[0].price);
        state.priceLowest = lowestPrice;
      } else {
        state.priceLowest = null;
      }
    },
    setHighestPrice: (state) => {
      if (state.products.length) {
        const highestPrice = state.products.reduce((maxPrice, product) => maxPrice === null || product.price > maxPrice ? product.price : maxPrice, state.products[0].price);
        state.priceHighest = highestPrice;
      } else {
        state.priceHighest = null;
      }
    },
    sortAndFilterProducts: (state) => {
      const {
        backupProducts,
        filterCategory,
        filterType,
        filterLevel,
        filterLowestPrice,
        filterHighestPrice,
        sortingType,
        sortingDirection,
        currentPage
      } = state;

      let filteredProducts = [...backupProducts];

      if (filterCategory) {
        filteredProducts = filteredProducts.filter((product) => product.category === filterCategory);
      }
      if (filterType) {
        filteredProducts = filteredProducts.filter((product) => product.type === filterType);
      }
      if (filterLevel) {
        filteredProducts = filteredProducts.filter((product) => product.level === filterLevel);
      }
      if (filterLowestPrice) {
        filteredProducts = filteredProducts.filter((product) => product.price >= filterLowestPrice);
      }
      if (filterHighestPrice) {
        filteredProducts = filteredProducts.filter((product) => product.price <= filterHighestPrice);
      }

      if (sortingType === 'price') {
        const directionMultiplier = sortingDirection === 'top' ? 1 : -1;
        filteredProducts = filteredProducts.sort((a, b) => (a.price - b.price) * directionMultiplier);
      } else if (sortingType === 'popularity') {
        const directionMultiplier = sortingDirection === 'top' ? 1 : -1;
        filteredProducts = filteredProducts.sort((a, b) => (a.rating - b.rating) * directionMultiplier);
      }

      const startIndex = (currentPage - 1) * SHOWABLE_CARDS_PER_PAGE_COUNT;
      const endIndex = currentPage * SHOWABLE_CARDS_PER_PAGE_COUNT;
      state.showableProducts = filteredProducts.slice(startIndex, endIndex);
      state.products = filteredProducts;

    },
    setFilterCategory: (state, action: PayloadAction<FilterCategory>) => {
      state.filterCategory = action.payload;
    },
    setFilterType: (state, action: PayloadAction<FilterType>) => {
      state.filterType = action.payload;
    },
    setFilterLevel: (state, action: PayloadAction<FilterLevel>) => {
      state.filterLevel = action.payload;
    },
    setFilterLowestPrice: (state, action: PayloadAction<number | null>) => {
      state.filterLowestPrice = action.payload;
    },
    setFilterHighestPrice: (state, action: PayloadAction<number | null>) => {
      state.filterHighestPrice = action.payload;
    },
  },
});

export const { setBackupProducts, setProducts, setProductsLoadStatus, setCurrentId, setBuyingId, setFilterCategory, setFilterType, setFilterLevel,
  setError, setSortingDirection, setSortingType, setShowableProducts, setCurrentPage, setSimilarProducts, setFilterHighestPrice, setFilterLowestPrice,
  setSimilarProductsLoadStatus, setReviews, setReviewsLoadStatus, setProduct, setProductLoadStatus, sortAndFilterProducts, setLowestPrice, setHighestPrice } = productsProcessSlice.actions;
