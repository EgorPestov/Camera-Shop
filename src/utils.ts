import { ProductsProcessType } from './store/product-process/product-process';
import { SHOWABLE_CARDS_PER_PAGE_COUNT, SortDirection, SortType } from './const';

export const formatPrice = (number: number): string => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const formatDateToMachineType = (inputDate: string): string => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateToHumanType = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day = date.getDate();
  let month = date.toLocaleString('default', { month: 'long' });

  const lastChar = month.charAt(month.length - 1);
  if (lastChar === 'ь' || lastChar === 'й') {
    month = month.replace(/.$/, 'я');
  } else if (lastChar === 'т') {
    month += 'а';
  }

  return `${day} ${month}`;
};

export const sortAndFilter = (state: ProductsProcessType) => {
  const {
    backupProducts,
    filterCategory,
    filterType,
    filterLevel,
    filterLowestPrice,
    filterHighestPrice,
    sortingType,
    sortingDirection,
    currentPage,
  } = state;

  let filteredProducts = [...backupProducts];

  if (filterCategory) {
    filteredProducts = filteredProducts.filter((product) => product.category === filterCategory);
  }
  if (filterType) {
    filteredProducts = filteredProducts.filter((product) => product.type === filterType);
  }
  if (filterLevel) {
    filteredProducts = filteredProducts.filter((product) => product.level === filterLevel);
  }
  if (filterLowestPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= filterLowestPrice);
  }
  if (filterHighestPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= filterHighestPrice);
  }

  if (sortingType === SortType.Price) {
    const directionMultiplier = sortingDirection === SortDirection.Top ? 1 : -1;
    filteredProducts = filteredProducts.sort((a, b) => (a.price - b.price) * directionMultiplier);
  } else if (sortingType === SortType.Popularity) {
    const directionMultiplier = sortingDirection === SortDirection.Top ? 1 : -1;
    filteredProducts = filteredProducts.sort((a, b) => (a.rating - b.rating) * directionMultiplier);
  }

  const startIndex = (currentPage - 1) * SHOWABLE_CARDS_PER_PAGE_COUNT;
  const endIndex = currentPage * SHOWABLE_CARDS_PER_PAGE_COUNT;
  state.showableProducts = filteredProducts.slice(startIndex, endIndex);
  state.products = filteredProducts;

  if (filterCategory || filterType || filterLevel || filterCategory === null || filterType === null || filterLevel === null) {
    if (state.products.length > 0) {
      state.priceLowest = state.products.reduce((minPrice, product) => minPrice === null || product.price < minPrice ? product.price : minPrice, state.products[0].price);
      state.priceHighest = state.products.reduce((maxPrice, product) => maxPrice === null || product.price > maxPrice ? product.price : maxPrice, state.products[0].price);
    } else {
      state.priceLowest = null;
      state.priceHighest = null;
    }
  }
};
