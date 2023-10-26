import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { browserHistory } from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../actions';
import { AppRoute } from '../../const';
import { State } from '../../hooks/use-app-selector/use-app-selector';


vi.mock('../../browser-history', () => ({
  browserHistory: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/basket" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Basket);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Basket);
  });

  it('should not redirect to "/root" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Root };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Root);
  });
});
