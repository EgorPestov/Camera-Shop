import { NameSpace } from '../../const';
import { State } from '../../hooks/use-app-selector/use-app-selector';

export const getModalAddItemStatus = (state: State): boolean => state[NameSpace.Modals].isModalAddItemOpen;
export const getModalAddItemSuccessStatus = (state: State): boolean => state[NameSpace.Modals].isModalAddItemSuccessOpen;
export const getAddReviewModalStatus = (state: State): boolean => state[NameSpace.Modals].isAddReviewOpen;
export const getReviewSuccessModalStatus = (state: State): boolean => state[NameSpace.Modals].isReviewSuccessModalOpen;
