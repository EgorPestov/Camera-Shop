import { NameSpace } from '../../const';
import { State } from '../../hooks/use-app-selector/use-app-selector';
import { ProductType } from '../../types';

export const getProducts = (state: State): ProductType[] => state[NameSpace.Products].products;
export const getBackupProducts = (state: State): ProductType[] => state[NameSpace.Products].backupProducts;
export const getProductsLoadStatus = (state: State): boolean => state[NameSpace.Products].isProductsLoading;
export const hasError = (state: State): boolean => state[NameSpace.Products].hasError;
export const getSortingType = (state: State): 'price' | 'popularity' => state[NameSpace.Products].sortingType;
export const getSortingDirection = (state: State): 'top' | 'down' => state[NameSpace.Products].sortingDirection;
