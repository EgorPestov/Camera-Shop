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

});
