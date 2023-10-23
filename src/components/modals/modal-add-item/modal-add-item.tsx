import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { setModalAddItemStatus, setModalAddItemSuccessStatus } from '../../../store/modals-process/modals-process';
import { getBuyingModalProduct } from '../../../store/product-process/selectors';
import { getModalAddItemStatus } from '../../../store/modals-process/selectors';
import { CameraNames, MODAL_ANIMATION_DELAY_TIME } from '../../../const';
import { formatPrice } from '../../../utils';
import { useRef, useEffect } from 'react';


export const ModalAddItem = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getBuyingModalProduct);
  const isModalAddItemOpen = useAppSelector(getModalAddItemStatus);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (isModalAddItemOpen && buttonRef.current) {
        buttonRef.current.focus();
      }
    }, MODAL_ANIMATION_DELAY_TIME);
  }, [isModalAddItemOpen]);

  if (product !== undefined) {
    return (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={() => dispatch(setModalAddItemStatus(false))} />
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
                ref={buttonRef}
                onClick={() => {
                  dispatch(setModalAddItemStatus(false));
                  dispatch(setModalAddItemSuccessStatus(true));
                }}
              >
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                Добавить в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(setModalAddItemStatus(false))}>
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
