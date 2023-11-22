import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { setModalBasketRemoveItemStatus } from '../../../store/modals-process/modals-process';
import { getBuyingModalProduct } from '../../../store/product-process/selectors';
import { getModalBasketRemoveItemStatus } from '../../../store/modals-process/selectors';
import { CameraNames } from '../../../const';
import { formatPrice } from '../../../utils';
import { useRef, useEffect } from 'react';


type ModalBasketRemoveItemProps = {
  handleDelete: (productId: string) => void;
};

export const ModalBasketRemoveItem = ({ handleDelete }: ModalBasketRemoveItemProps) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getBuyingModalProduct);
  const isModalRemoveItemOpen = useAppSelector(getModalBasketRemoveItemStatus);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isModalRemoveItemOpen && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isModalRemoveItemOpen]);

  const handleCloseBlur = () => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  if (product !== undefined) {
    return (
      <div className="modal is-active" data-testid="modal-basket-remove-item">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={() => dispatch(setModalBasketRemoveItemStatus(false))} />
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}
                  />
                  <img
                    src={`/${product.previewImg}`}
                    srcSet={`/${product.previewImgWebp2x} 2x`}
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
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
                ref={buttonRef}
                onClick={() => {
                  handleDelete(String(product.id));
                }}
              >
                Удалить
              </button>
              <button className="btn btn--transparent modal__btn modal__btn--half-width"
                type='button'
                onClick={() => dispatch(setModalBasketRemoveItemStatus(false))}
              >
                Продолжить покупки
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => dispatch(setModalBasketRemoveItemStatus(false))}
              onBlur={handleCloseBlur}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
