import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/use-app-dispatch/use-app-dispatch';
import { State } from '../hooks/use-app-selector/use-app-selector';
import { ProductType } from '../types';
import { APIRoute } from '../const';
// import { toast } from 'react-toastify';
import { setProducts, setBackupProducts, setProductsLoadStatus, setError, sortProducts, setShowableProducts } from './product-process/product-process';

type thunkObjType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchProducts = createAsyncThunk<void, undefined, thunkObjType>(
  'PRODUCTS/fetchProducts',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setProductsLoadStatus(true));
      const { data } = await api.get<ProductType[]>(APIRoute.Products);
      dispatch(setProducts(data));
      dispatch(setBackupProducts(data));
      dispatch(setError(false));
    } catch {
      dispatch(setError(true));
      throw new Error;
    } finally {
      dispatch(setProductsLoadStatus(false));
      dispatch(sortProducts());
      dispatch(setShowableProducts());
    }
  }
);
