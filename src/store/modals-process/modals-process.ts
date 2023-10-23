import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

export type ModalsProcessType = {
  isModalAddItemOpen: boolean;
  isModalAddItemSuccessOpen: boolean;
  isModalAddReviewOpen: boolean;
  isModalAddReviewSuccessOpen: boolean;
}

export const initialState: ModalsProcessType = {
  isModalAddItemOpen: false,
  isModalAddItemSuccessOpen: false,
  isModalAddReviewOpen: false,
  isModalAddReviewSuccessOpen: false,
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
    setModalAddReviewStatus: (state, action: PayloadAction<boolean>) => {
      state.isModalAddReviewOpen = action.payload;
    },
    setModalAddReviewSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isModalAddReviewSuccessOpen = action.payload;
    },
  },
});

export const { setModalAddReviewStatus, setModalAddItemStatus, setModalAddItemSuccessStatus, setModalAddReviewSuccessStatus } = modalsProcessSlice.actions;
