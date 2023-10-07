import { productsProcessSlice } from './product-process/product-process';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [productsProcessSlice.name]: productsProcessSlice.reducer,
});
