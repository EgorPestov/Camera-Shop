import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { setModalBasketFailStatus } from '../../../store/modals-process/modals-process';
import { useRef, useEffect } from 'react';
import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { getModalBasketFailStatus } from '../../../store/modals-process/selectors';

export const ModalBasketFail = () => {
  const dispatch = useAppDispatch();
  const isModalBasketSuccessOpen = useAppSelector(getModalBasketFailStatus);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isModalBasketSuccessOpen && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isModalBasketSuccessOpen]);

  const handleCloseBlur = () => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  return (
    <div className="modal is-active modal--narrow" data-testid="modal-basket-fail">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(setModalBasketFailStatus(false))} />
        <div className="modal__content">
          <p className="title title--h4">Произошла ошибка</p>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => dispatch(setModalBasketFailStatus(false))}
              ref={buttonRef}
            >
              Попробовать ещё раз
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setModalBasketFailStatus(false))}
            onBlur={handleCloseBlur}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
