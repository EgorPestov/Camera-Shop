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
    sortAndFilterProducts: (state) => {
      state.products = [...state.backupProducts];

      if (state.filterCategory) {
        state.products = state.products.filter((product) => product.category === state.filterCategory);
      }
      if (state.filterType) {
        state.products = state.products.filter((product) => product.type === state.filterType);
      }
      if (state.filterLevel) {
        state.products = state.products.filter((product) => product.level === state.filterLevel);
      }

      if (state.sortingType === 'price' && state.sortingDirection === 'top') {
        state.products = [...state.products].sort((a, b) => a.price - b.price);
      } else if (state.sortingType === 'price' && state.sortingDirection === 'down') {
        state.products = [...state.products].sort((a, b) => b.price - a.price);
      } else if (state.sortingType === 'popularity' && state.sortingDirection === 'top') {
        state.products = [...state.products].sort((a, b) => a.rating - b.rating);
      } else if (state.sortingType === 'popularity' && state.sortingDirection === 'down') {
        state.products = [...state.products].sort((a, b) => b.rating - a.rating);
      }

      state.showableProducts = state.products.slice((state.currentPage - 1) * SHOWABLE_CARDS_PER_PAGE_COUNT, state.currentPage * SHOWABLE_CARDS_PER_PAGE_COUNT);
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
  },
});

export const { setBackupProducts, setProducts, setProductsLoadStatus, setCurrentId, setBuyingId, setFilterCategory, setFilterType, setFilterLevel,
  setError, setSortingDirection, setSortingType, setShowableProducts, setCurrentPage, setSimilarProducts,
  setSimilarProductsLoadStatus, setReviews, setReviewsLoadStatus, setProduct, setProductLoadStatus, sortAndFilterProducts } = productsProcessSlice.actions;
