import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { getModalAddItemSuccessStatus } from '../../../store/modals-process/selectors';
import { setModalAddItemSuccessStatus } from '../../../store/modals-process/modals-process';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export const ModalAddItemSuccess = () => {
  const dispatch = useAppDispatch();
  const isModalAddItemSuccessOpen = useAppSelector(getModalAddItemSuccessStatus);
  const linkRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isModalAddItemSuccessOpen && linkRef.current) {
      linkRef.current.focus();
    }
  }, [isModalAddItemSuccessOpen]);

  return (
    <div className="modal is-active modal--narrow" data-testid="modal-add-item-success">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(setModalAddItemSuccessStatus(false))} />
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--transparent modal__btn"
              onClick={() => {
                dispatch(setModalAddItemSuccessStatus(false));
              }}
              ref={linkRef}
            >
              Продолжить покупки
            </button>
            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={() => dispatch(setModalAddItemSuccessStatus(false))}
              to={AppRoute.Basket}
            >
              Перейти в корзину
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(setModalAddItemSuccessStatus(false))}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
