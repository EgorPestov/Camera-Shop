import { NameSpace } from '../../const';
import { State } from '../../hooks/use-app-selector/use-app-selector';
import { ProductType } from '../../types';

export const getProducts = (state: State): ProductType[] => state[NameSpace.Products].products;
export const getBackupProducts = (state: State): ProductType[] => state[NameSpace.Products].backupProducts;
export const getProductsLoadStatus = (state: State): boolean => state[NameSpace.Products].isProductsLoading;
