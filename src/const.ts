export const BANNER_SHOW_TIME = 3000;

export const SHOWABLE_CARDS_PER_PAGE_COUNT = 9;

export const SHOWABLE_PAGES_COUNT = 3;

export const SHOWABLE_SIMILAR_CARDS_COUNT = 3;

export const SHOWABLE_REVIEWS_COUNT = 3;

export const SIMILAR_CARDS_SLIDER_DELAY_TIME = 100;

export const MODAL_ADD_REVIEW_ANIMATION_DELAY_TIME = 200;

export const AppRoute = {
  Root: '/',
  Item: '/item',
  Basket: '/basket',
  NotFound: '/404',
} as const;

export type AppRouteType = typeof AppRoute;

export const NameSpace = {
  Products: 'PRODUCTS',
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
    src: 'promo-look-54.jpg',
    srcSet: 'promo-look-54.jpg 2x',
    srcSetWebp: 'img/content/promo-look-54.webp, promo-look-54@2x.webp 2x',
    description: 'Профессиональная камера от известного производителя',
  }
];

export const CameraNames: Record<string, string> = {
  'Фотоаппарат': 'фотокамера',
  'Видеокамера': 'видеокамера',
};
