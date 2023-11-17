export const BANNER_SHOW_TIME = 3000;

export const SHOWABLE_CARDS_PER_PAGE_COUNT = 9;

export const SHOWABLE_PAGES_COUNT = 3;

export const SHOWABLE_SIMILAR_CARDS_COUNT = 3;

export const SHOWABLE_REVIEWS_COUNT = 3;

export const SIMILAR_CARDS_SLIDER_DELAY_TIME = 300;

export const MIN_TEXT_LENGTH = 2;

export const MAX_TEXT_LENGTH = 160;

export const PRODUCTS_COUNT = 40;

export const MIN_SEARCH_LENGTH = 3;

export const MIN_SYMBOLS_COUNT_FOR_HIGHPRICE_FILTER = 4;

export const MIN_PRODUCT_QUANTITY = 1;

export const MAX_PRODUCT_QUANTITY = 99;

export const AppRoute = {
  Root: '/',
  Item: '/item',
  Basket: '/basket',
  NotFound: '/404',
} as const;

export type AppRouteType = typeof AppRoute;

export const NameSpace = {
  Products: 'PRODUCTS',
  Reviews: 'REVIEWS',
  Modals: 'MODALS'
} as const;

export const APIRoute = {
  Products: '/cameras',
  Similar: '/similar',
  Promo: '/promo',
  Reviews: '/reviews',
  Coupons: '/coupons',
  Order: '/orders',
} as const;

export const BannerInfo = [
  {
    name: 'Click Pro',
    src: 'img/content/promo_click_pro.jpg',
    srcSet: 'img/content/promo_click_pro@2x.jpg 2x',
    srcSetWebp: 'img/content/promo_click_pro.webp, img/content/promo_click_pro@2x.webp 2x',
    description: 'Проверенная временем классика',
  },
  {
    name: 'Click Lite R',
    src: 'img/content/promo_click-lite-r.jpg',
    srcSet: 'img/content/promo_click-lite-r@2x.jpg 2x',
    srcSetWebp: 'img/content/promo_click-lite-r.webp, img/content/promo_click-lite-r@2x.webp 2x',
    description: 'Камера будущего',
  },
  {
    name: 'Look 54',
    src: 'img/content/promo-look-54.jpg',
    srcSet: 'img/content/promo-look-54@2x.jpg 2x',
    srcSetWebp: 'img/content/promo-look-54.webp, img/content/promo-look-54@2x.webp 2x',
    description: 'Профессиональная камера от известного производителя',
  }
];

export const CameraNames: Record<string, string> = {
  'Фотоаппарат': 'фотокамера',
  'Видеокамера': 'видеокамера',
};

export const StarsNames: { [key: number]: string } = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
};

export const ValidCatalogParams = [
  'type',
  'direction',
  'level',
  'page',
  'cameratype',
  'category',
  'pricelow',
  'pricehigh',
];

export const ValidItemParams = [
  'tab',
];

export const FilterCategory = {
  Photo: 'Фотоаппарат',
  Video: 'Видеокамера',
} as const;

export const FilterType = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Instant: 'Моментальная',
  Collection: 'Коллекционная',
} as const;

export const FilterLevel = {
  Zero: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Профессиональный',
} as const;

export const SortType = {
  Price: 'price',
  Popularity: 'popularity',
} as const;

export const SortDirection = {
  Top: 'top',
  Down: 'down',
} as const;

export const OptionType = {
  Description: 'dscrptn',
  Specs: 'specs',
} as const;
