import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

export type ModalsProcessType = {
  isModalAddItemOpen: boolean;
  isModalAddItemSuccessOpen: boolean;
  isAddReviewOpen: boolean;
  isReviewSuccessModalOpen: boolean;
}

export const initialState: ModalsProcessType = {
  isModalAddItemOpen: false,
  isModalAddItemSuccessOpen: false,
  isAddReviewOpen: false,
  isReviewSuccessModalOpen: false,
};

export const modalsProcessSlice = createSlice({
  name: NameSpace.Modals,
  initialState,
  reducers: {
    setModalAddItemStatus: (state, action: PayloadAction<boolean>) => {
      state.isModalAddItemOpen = action.payload;
    },
    setModalAddItemSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isModalAddItemSuccessOpen = action.payload;
    },
    setAddReviewModalStatus: (state, action: PayloadAction<boolean>) => {
      state.isAddReviewOpen = action.payload;
    },
    setReviewSuccessModalStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewSuccessModalOpen = action.payload;
    },
  },
});

export const { setAddReviewModalStatus, setModalAddItemStatus, setModalAddItemSuccessStatus, setReviewSuccessModalStatus } = modalsProcessSlice.actions;
