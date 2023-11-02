import { NameSpace } from '../../const';
import { State } from '../../hooks/use-app-selector/use-app-selector';
import { ProductType, ReviewType } from '../../types';

export const getProducts = (state: State): ProductType[] => state[NameSpace.Products].products;
export const getBackupProducts = (state: State): ProductType[] => state[NameSpace.Products].backupProducts;
export const getProductsLoadStatus = (state: State): boolean => state[NameSpace.Products].isProductsLoading;
export const hasError = (state: State): boolean => state[NameSpace.Products].hasError;
export const getSortingType = (state: State): 'price' | 'popularity' | null => state[NameSpace.Products].sortingType;
export const getSortingDirection = (state: State): 'top' | 'down' | null => state[NameSpace.Products].sortingDirection;
export const getShowableProducts = (state: State): ProductType[] => state[NameSpace.Products].showableProducts;
export const getCurrentPage = (state: State): number => state[NameSpace.Products].currentPage;
export const getSimilarProducts = (state: State): ProductType[] => state[NameSpace.Products].similarProducts;
export const getSimilarProductsLoadStatus = (state: State): boolean => state[NameSpace.Products].isSimilarProductsLoading;
export const getCurrentId = (state: State): number => state[NameSpace.Products].currentId;
export const getReviews = (state: State): ReviewType[] => state[NameSpace.Products].reviews;
export const getReviewsLoadStatus = (state: State): boolean => state[NameSpace.Products].isReviewsLoading;
export const getBuyingId = (state: State): number => state[NameSpace.Products].buyingId;
export const getBuyingModalProduct = (state: State): ProductType | undefined => state[NameSpace.Products].products.find((product) => product.id === state[NameSpace.Products].buyingId);
export const getProduct = (state: State): ProductType | null => state[NameSpace.Products].product;
export const getProductLoadStatus = (state: State): boolean => state[NameSpace.Products].isProductLoading;
