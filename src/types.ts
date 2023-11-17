export type ProductType = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  previewImg: string;
  level: string;
  price: number;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  rating: number;
  reviewCount: number;
};

export type ReviewType = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type NewReviewType = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type CouponType = {
  coupon: string;
};

export type ErrorsDataType = {
  userName: boolean;
  advantage: boolean;
  disadvantage: boolean;
  review: boolean;
  rating: boolean;
};

export type BasketType = {
  [key: string]: number;
}

export type SortTypeType = 'price' | 'popularity';
export type SortDirectionType = 'top' | 'down';

export type FilterCategoryType = 'Фотоаппарат' | 'Видеокамера' | null;
export type FilterTypeType = 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная' | null;
export type FilterLevelType = 'Нулевой' | 'Любительский' | 'Профессиональный' | null;
