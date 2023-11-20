import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, ReviewType } from '../../types';
import { NameSpace } from '../../const';
import { SHOWABLE_CARDS_PER_PAGE_COUNT } from '../../const';
import { FilterCategoryType, FilterLevelType, FilterTypeType } from '../../types';
import { sortAndFilter } from '../../utils';
import { postCoupon } from '../api-actions';

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
  filterCategory: FilterCategoryType;
  filterType: FilterTypeType;
  filterLevel: FilterLevelType;
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
    sortAndFilterProducts: (state) => sortAndFilter(state),
    setFilterCategory: (state, action: PayloadAction<FilterCategoryType>) => {
      state.filterCategory = action.payload;
    },
    setFilterType: (state, action: PayloadAction<FilterTypeType>) => {
      state.filterType = action.payload;
    },
    setFilterLevel: (state, action: PayloadAction<FilterLevelType>) => {
      state.filterLevel = action.payload;
    },
    setFilterLowestPrice: (state, action: PayloadAction<number | null>) => {
      state.filterLowestPrice = action.payload;
    },
    setFilterHighestPrice: (state, action: PayloadAction<number | null>) => {
      state.filterHighestPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCoupon.fulfilled, (_, action) => {
        localStorage.setItem('discount', action.payload.toString());
      })
      .addCase(postCoupon.rejected, () => {
        throw new Error;
      });
  }
});

export const { setBackupProducts, setProducts, setProductsLoadStatus, setCurrentId, setBuyingId, setFilterCategory, setFilterType, setFilterLevel,
  setError, setSortingDirection, setSortingType, setShowableProducts, setCurrentPage, setSimilarProducts, setFilterHighestPrice, setFilterLowestPrice,
  setSimilarProductsLoadStatus, setReviews, setReviewsLoadStatus, setProduct, setProductLoadStatus, sortAndFilterProducts, setLowestPrice, setHighestPrice } = productsProcessSlice.actions;
