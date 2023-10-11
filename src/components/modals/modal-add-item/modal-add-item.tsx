import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { setIsModalAddItemOpen, setIsModalAddItemSuccessOpen } from '../../../store/product-process/product-process';
import { getCurrentProduct } from '../../../store/product-process/selectors';
import { CameraNames } from '../../../const';
import { formatPrice } from '../../../utils';


export const ModalAddItem = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getCurrentProduct);

  if (product !== undefined) {
    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`/markup/${product.previewImgWebp}, /markup/${product.previewImgWebp2x} 2x`}
                  />
                  <img
                    src={`/markup/${product.previewImg}`}
                    srcSet={`/markup/${product.previewImgWebp2x} 2x`}
                    width={140}
                    height={120}
                    alt={product.name}
                  />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{product.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул: </span>
                    <span className="basket-item__number">{product.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{`${product.type} ${CameraNames[product.category]}`}</li>
                  <li className="basket-item__list-item">Любительский уровень</li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>{`${formatPrice(product.price)} ₽`}
                </p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={() => {
                  dispatch(setIsModalAddItemOpen(false));
                  dispatch(setIsModalAddItemSuccessOpen(true));
                }}
              >
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                Добавить в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(setIsModalAddItemOpen(false))}>
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
};
