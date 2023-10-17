import { NameSpace } from '../../const';
import { State } from '../../hooks/use-app-selector/use-app-selector';
import { ProductType, ReviewType } from '../../types';

export const getProducts = (state: State): ProductType[] => state[NameSpace.Products].products;
export const getBackupProducts = (state: State): ProductType[] => state[NameSpace.Products].backupProducts;
export const getProductsLoadStatus = (state: State): boolean => state[NameSpace.Products].isProductsLoading;
export const hasError = (state: State): boolean => state[NameSpace.Products].hasError;
export const getSortingType = (state: State): 'price' | 'popularity' => state[NameSpace.Products].sortingType;
export const getSortingDirection = (state: State): 'top' | 'down' => state[NameSpace.Products].sortingDirection;
export const getShowableProducts = (state: State): ProductType[] => state[NameSpace.Products].showableProducts;
export const getCurrentPage = (state: State): number => state[NameSpace.Products].currentPage;
export const getCurrentProduct = (state: State): ProductType | undefined => state[NameSpace.Products].products.find((product) => product.id === state[NameSpace.Products].currentId);
export const getModalAddItemStatus = (state: State): boolean => state[NameSpace.Products].isModalAddItemOpen;
export const getModalAddItemSuccessStatus = (state: State): boolean => state[NameSpace.Products].isModalAddItemSuccessOpen;
export const getSimilarProducts = (state: State): ProductType[] => state[NameSpace.Products].similarProducts;
export const getSimilarProductsLoadStatus = (state: State): boolean => state[NameSpace.Products].isSimilarProductsLoading;
export const getCurrentId = (state: State): number => state[NameSpace.Products].currentId;
export const getReviews = (state: State): ReviewType[] =>
  state[NameSpace.Products].reviews.slice().sort((a, b) => {
    const dateA = new Date(a.createAt).getTime();
    const dateB = new Date(b.createAt).getTime();
    return dateB - dateA;
  });
export const getReviewsLoadStatus = (state: State): boolean => state[NameSpace.Products].isReviewsLoading;
