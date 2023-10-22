import { AppRoute, MODAL_ANIMATION_DELAY_TIME } from '../../../const';
import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { getModalAddItemSuccessStatus } from '../../../store/product-process/selectors';
import { setIsModalAddItemSuccessOpen } from '../../../store/product-process/product-process';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export const ModalAddItemSuccess = () => {
  const dispatch = useAppDispatch();
  const isModalAddItemSuccessOpen = useAppSelector(getModalAddItemSuccessStatus);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (isModalAddItemSuccessOpen && linkRef.current) {
        linkRef.current.focus();
      }
    }, MODAL_ANIMATION_DELAY_TIME);
  }, [isModalAddItemSuccessOpen]);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(setIsModalAddItemSuccessOpen(false))} />
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" to={AppRoute.Root} onClick={() => dispatch(setIsModalAddItemSuccessOpen(false))} ref={linkRef}>
              Продолжить покупки
            </Link>
            <Link className="btn btn--purple modal__btn modal__btn--fit-width" onClick={() => dispatch(setIsModalAddItemSuccessOpen(false))} to={AppRoute.Basket}> {/* тут наверное редирект в корзину или изменить на Link?*/}
              Перейти в корзину
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(setIsModalAddItemSuccessOpen(false))}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
