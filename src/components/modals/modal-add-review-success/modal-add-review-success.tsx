import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { setModalAddReviewSuccessStatus } from '../../../store/modals-process/modals-process';
import { getReviewSuccessModalStatus } from '../../../store/modals-process/selectors';
import { useRef, useEffect } from 'react';

export const ModalReviewSuccess = () => {
  const dispatch = useAppDispatch();
  const isReviewSuccessModalOpen = useAppSelector(getReviewSuccessModalStatus);
  const handleClose = () => dispatch(setModalAddReviewSuccessStatus(false));
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isReviewSuccessModalOpen && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isReviewSuccessModalOpen]);

  return (
    <div className={`modal ${isReviewSuccessModalOpen ? 'is-active' : ''} modal--narrow`} data-testid="modal-add-review-success">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleClose} />
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-review-success" />
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleClose}
              ref={buttonRef}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleClose}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
