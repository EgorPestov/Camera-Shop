import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from '../mocks/mock-utils';
import { mockProducts } from '../mocks/mock-products';
import { mockReviews } from '../mocks/mock-reviews';
import { State } from '../hooks/use-app-selector/use-app-selector';
import { fetchProducts, fetchSimilarProducts, fetchReviews, postReview } from './api-actions';
import { APIRoute } from '../const';
import {
  setProducts, setBackupProducts, setProductsLoadStatus, setError, sortAndFilterProducts,
  setShowableProducts, setSimilarProducts, setSimilarProductsLoadStatus, setReviews, setReviewsLoadStatus
} from './product-process/product-process';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ PRODUCTS: { products: [] } });
  });

  describe('"fetchProducts" action works correct', () => {
    it('correct work of dispatches with "fetchProducts" action when server response 200', async () => {
      const responseProducts = [...mockProducts];
      mockAxiosAdapter.onGet(APIRoute.Products).reply(200, responseProducts);

      await store.dispatch(fetchProducts());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductsActionFulfilled = emittedActions.at(2) as ReturnType<typeof fetchProducts.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchProducts.pending.type,
        setProductsLoadStatus.type,
        setProducts.type,
        setBackupProducts.type,
        sortAndFilterProducts.type,
        setShowableProducts.type,
        setError.type,
        setProductsLoadStatus.type,
        fetchProducts.fulfilled.type,
      ]);

      expect(fetchProductsActionFulfilled.payload)
        .toEqual(responseProducts);
    });

    it('correct work of dispatches with "fetchProducts" action when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Products).reply(400, []);

      await store.dispatch(fetchProducts());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProducts.pending.type,
        setProductsLoadStatus.type,
        setError.type,
        setProductsLoadStatus.type,
        fetchProducts.rejected.type,
      ]);
    });
  });

  describe('"fetchSimilarProducts" action works correct', () => {
    const mockId = 3;

    it('correct work of dispatches with "fetchSimilarProducts" action when server response 200', async () => {
      const responseSimilarProducts = [...mockProducts];
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockId}${APIRoute.Similar}`).reply(200, responseSimilarProducts);

      await store.dispatch(fetchSimilarProducts({ id: mockId }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarProductsActionFulfilled = emittedActions.at(2) as ReturnType<typeof fetchProducts.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProducts.pending.type,
        setSimilarProductsLoadStatus.type,
        setSimilarProducts.type,
        setSimilarProductsLoadStatus.type,
        fetchSimilarProducts.fulfilled.type,
      ]);

      expect(fetchSimilarProductsActionFulfilled.payload)
        .toEqual(responseSimilarProducts);
    });

    it('correct work of dispatches with "fetchProducts" action when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockId}${APIRoute.Similar}`).reply(400, []);

      await store.dispatch(fetchSimilarProducts({ id: mockId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarProducts.pending.type,
        setSimilarProductsLoadStatus.type,
        setSimilarProductsLoadStatus.type,
        fetchSimilarProducts.rejected.type,
      ]);
    });
  });

  describe('"fetchReviews" action works correct', () => {
    const mockId = 3;

    it('correct work of dispatches with "fetchReviews" action when server response 200', async () => {

      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockId}${APIRoute.Reviews}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews({ id: mockId }));
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchReviewsFulfilled = dispatchedActions.at(2) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        setReviewsLoadStatus.type,
        setReviews.type,
        setReviewsLoadStatus.type,
        fetchReviews.fulfilled.type,
      ]);

      expect(fetchReviewsFulfilled.payload).toEqual(mockReviews);
    });

    it('correct work of dispatches with "fetchReviews" action when server response 400', async () => {

      mockAxiosAdapter.onGet(`${APIRoute.Products}/${mockId}${APIRoute.Reviews}`).reply(400);

      await store.dispatch(fetchReviews({ id: mockId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        setReviewsLoadStatus.type,
        setReviewsLoadStatus.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('"postReview" action works correct', () => {
    const mockReview = { cameraId: 42, userName: 'Egor', advantage: 'yes', disadvantage: 'no', review: 'asdf', rating: 5 };

    it('correct work of dispatches with "postReview" action when server response 200', async () => {

      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200);

      await store.dispatch(postReview(mockReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        setProductsLoadStatus.type,
        setProductsLoadStatus.type,
        postReview.fulfilled.type,
      ]);
    });

    it('correct work of dispatches with "postReview" action when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(400);

      await store.dispatch(postReview(mockReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        setProductsLoadStatus.type,
        setProductsLoadStatus.type,
        postReview.rejected.type,
      ]);
    });
  });
});
