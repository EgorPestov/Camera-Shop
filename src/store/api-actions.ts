import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/use-app-dispatch/use-app-dispatch';
import { State } from '../hooks/use-app-selector/use-app-selector';
import { NewReviewType, ProductType, ReviewType } from '../types';
import { APIRoute } from '../const';
import { toast } from 'react-toastify';
import {
  setProducts, setBackupProducts, setProductsLoadStatus, setError, setProduct, setProductLoadStatus, setLowestPrice, setHighestPrice,
  setShowableProducts, setSimilarProducts, setSimilarProductsLoadStatus, setReviews, setReviewsLoadStatus, sortAndFilterProducts
} from './product-process/product-process';

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
      dispatch(sortAndFilterProducts());
      dispatch(setShowableProducts());
      dispatch(setLowestPrice());
      dispatch(setHighestPrice());
      dispatch(setError(false));
    } catch {
      dispatch(setError(true));
      toast.error('Ошибка загрузки товаров, пожалуйста, попробуйте еще раз');
      throw new Error;
    } finally {
      dispatch(setProductsLoadStatus(false));
    }
  }
);

export const fetchProduct = createAsyncThunk<void, { id: number }, thunkObjType>(
  'PRODUCTS/fetchProduct',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      dispatch(setProductLoadStatus(true));
      const url = `${APIRoute.Products}/${id}`;
      const { data } = await api.get<ProductType>(url);
      dispatch(setProduct(data));
    } catch {
      toast.error('Ошибка загрузки товара, пожалуйста, попробуйте еще раз');
      throw new Error;
    } finally {
      dispatch(setProductLoadStatus(false));
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk<void, { id: number }, thunkObjType>(
  'PRODUCTS/fetchSimilarProducts',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      dispatch(setSimilarProductsLoadStatus(true));
      const url = `${APIRoute.Products}/${id}${APIRoute.Similar}`;
      const { data } = await api.get<ProductType[]>(url);
      dispatch(setSimilarProducts(data));
    } catch {
      toast.error('Ошибка загрузки похожих товаров, пожалуйста, попробуйте еще раз');
      throw new Error;
    } finally {
      dispatch(setSimilarProductsLoadStatus(false));
    }
  }
);

export const fetchReviews = createAsyncThunk<void, { id: number }, thunkObjType>(
  'PRODUCTS/fetchReviews',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      dispatch(setReviewsLoadStatus(true));
      const url = `${APIRoute.Products}/${id}${APIRoute.Reviews}`;
      const { data } = await api.get<ReviewType[]>(url);
      dispatch(setReviews(data));
    } catch {
      toast.error('Ошибка загрузки отзывов, пожалуйста, попробуйте еще раз');
      throw new Error;
    } finally {
      dispatch(setReviewsLoadStatus(false));
    }
  }
);

export const postReview = createAsyncThunk<void, NewReviewType, thunkObjType>(
  'PRODUCTS/postReview',
  async (reviewData, { dispatch, extra: api }) => {
    try {
      dispatch(setProductsLoadStatus(true));
      await api.post<NewReviewType>(APIRoute.Reviews, reviewData);
    } catch {
      toast.error('Ошибка отправки отзыва, пожалуйста, попробуйте еще раз');
      throw new Error;
    } finally {
      dispatch(setProductsLoadStatus(false));
    }
  }
);
