import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { redirectToRoute } from '../../../store/actions';
import { setModalBasketSuccessStatus } from '../../../store/modals-process/modals-process';

export const ModalBasketSuccess = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => {
                dispatch(redirectToRoute(AppRoute.Root));
                dispatch(setModalBasketSuccessStatus(false));
              }}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setModalBasketSuccessStatus(false))}
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
