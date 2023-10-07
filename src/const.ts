export const AppRoute = {
  Root: '/',
  Item: '/item',
  Basket: '/basket',
  NotFound: '/404',
} as const;

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
