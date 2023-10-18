import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { setReviewSuccessModalStatus } from '../../../store/product-process/product-process';
import { getReviewSuccessModalStatus } from '../../../store/product-process/selectors';

export const ModalReviewSuccess = () => {
  const dispatch = useAppDispatch();
  const isReviewSuccessModalOpen = useAppSelector(getReviewSuccessModalStatus);
  const handleClose = () => dispatch(setReviewSuccessModalStatus(false));

  return (
    <div className={`modal ${isReviewSuccessModalOpen ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
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
