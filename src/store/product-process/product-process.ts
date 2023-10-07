import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../types';
import { NameSpace } from '../../const';

export type ProductsProcessType = {
  products: ProductType[];
  backupProducts: ProductType[];
  isProductsLoading: boolean;
  hasError: boolean;
  sortingType: 'price' | 'popularity';
  sortingDirection: 'top' | 'down';
}

export const initialState: ProductsProcessType = {
  products: [],
  backupProducts: [],
  isProductsLoading: true,
  hasError: false,
  sortingType: 'price',
  sortingDirection: 'top',
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
    }
  }
});

export const { setBackupProducts, setProducts, setProductsLoadStatus, setError, sortProducts, setSortingDirection, setSortingType } = productsProcessSlice.actions;
