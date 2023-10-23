import { initialState, modalsProcessSlice } from './modals-process';

describe('Modals Process Slice', () => {
  it('should set modal add item status', () => {

    const action = modalsProcessSlice.actions.setModalAddItemStatus(true);

    const result = modalsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isModalAddItemOpen: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set modal add item success status', () => {

    const action = modalsProcessSlice.actions.setModalAddItemSuccessStatus(true);

    const result = modalsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isModalAddItemSuccessOpen: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set modal add review status', () => {

    const action = modalsProcessSlice.actions.setModalAddReviewStatus(true);

    const result = modalsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isModalAddReviewOpen: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set modal add review status', () => {

    const action = modalsProcessSlice.actions.setModalAddReviewSuccessStatus(true);

    const result = modalsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isModalAddReviewSuccessOpen: true,
    };

    expect(result).toEqual(expectedState);
  });

});
