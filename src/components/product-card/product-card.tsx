import { ProductType } from '../../types';
import { formatPrice } from '../../utils';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setBuyingId, setCurrentId } from '../../store/product-process/product-process';
import { setModalAddItemStatus } from '../../store/modals-process/modals-process';
import { redirectToRoute } from '../../store/actions';

interface ProductCardProps {
  product: ProductType;
  isActive?: boolean;
  basket: boolean;
}

export const ProductCard = ({ product, isActive = false, basket }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const {
    id,
    name,
    previewImg,
    price,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    rating,
    reviewCount,
  } = product;

  const handleBuyClick = () => {
    dispatch(setBuyingId(id));
    dispatch(setModalAddItemStatus(true));
  };

  const handleBasketClick = () => {
    dispatch(redirectToRoute(AppRoute.Basket));
  };

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''} `} data-testid="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {Array.from({ length: 5 }, (_, index) => (
            <svg key={index} width={17} height={16} aria-hidden="true">
              <use xlinkHref={index < rating ? '#icon-full-star' : '#icon-star'} />
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {basket ? (
          <button
            className="btn btn--purple-border product-card__btn"
            type="button"
            onClick={handleBasketClick}
          >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            В корзине
          </button>
        ) :
          (
            <button
              className="btn btn--purple product-card__btn"
              type="button"
              onClick={handleBuyClick}
            >
              Купить
            </button>
          )}
        <Link className="btn btn--transparent" onClick={() => dispatch(setCurrentId(id))} to={`${AppRoute.Item}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div >
  );
};
