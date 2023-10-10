import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../types';
import { NameSpace } from '../../const';
import { SHOWABLE_CARDS_PER_PAGE_COUNT } from '../../const';

export type ProductsProcessType = {
  products: ProductType[];
  backupProducts: ProductType[];
  isProductsLoading: boolean;
  hasError: boolean;
  sortingType: 'price' | 'popularity';
  sortingDirection: 'top' | 'down';
  currentPage: number;
  showableProducts: ProductType[];
  currentId: number;
  isModalAddItemOpen: boolean;
  isModalAddItemSuccessOpen: boolean;
}

export const initialState: ProductsProcessType = {
  products: [],
  backupProducts: [],
  isProductsLoading: true,
  hasError: false,
  sortingType: 'price',
  sortingDirection: 'top',
  currentPage: 1,
  showableProducts: [],
  currentId: 0,
  isModalAddItemOpen: false,
  isModalAddItemSuccessOpen: false,
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
    setSortingType: (state, action: PayloadAction<'price' | 'popularity'>) => {
      state.sortingType = action.payload;
    },
    setSortingDirection: (state, action: PayloadAction<'top' | 'down'>) => {
      state.sortingDirection = action.payload;
    },
    sortProducts: (state) => {
      if (state.sortingType === 'price' && state.sortingDirection === 'top') {
        state.products = state.products.sort((a, b) => a.price - b.price);
      } else if (state.sortingType === 'price' && state.sortingDirection === 'down') {
        state.products = state.products.sort((a, b) => b.price - a.price);
      }
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
    setIsModalAddItemOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalAddItemOpen = action.payload;
    },
    setIsModalAddItemSuccess: (state, action: PayloadAction<boolean>) => {
      state.isModalAddItemSuccessOpen = action.payload;
    }
  }
});

export const { setBackupProducts, setProducts, setProductsLoadStatus, setCurrentId, setIsModalAddItemOpen, setIsModalAddItemSuccess,
  setError, sortProducts, setSortingDirection, setSortingType, setShowableProducts, setCurrentPage } = productsProcessSlice.actions;
