import { NameSpace } from '../../const';
import { State } from '../../hooks/use-app-selector/use-app-selector';

export const getModalAddItemStatus = (state: State): boolean => state[NameSpace.Modals].isModalAddItemOpen;
export const getModalAddItemSuccessStatus = (state: State): boolean => state[NameSpace.Modals].isModalAddItemSuccessOpen;
export const getAddReviewModalStatus = (state: State): boolean => state[NameSpace.Modals].isModalAddReviewOpen;
export const getReviewSuccessModalStatus = (state: State): boolean => state[NameSpace.Modals].isModalAddReviewSuccessOpen;
export const getModalBasketSuccessStatus = (state: State): boolean => state[NameSpace.Modals].isModalBasketSuccessOpen;
export const getModalBasketFailStatus = (state: State): boolean => state[NameSpace.Modals].isModalBasketFailOpen;
export const getModalBasketRemoveItemStatus = (state: State): boolean => state[NameSpace.Modals].isModalBasketRemoveItemOpen;
