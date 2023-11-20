import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { setModalBasketFailStatus } from '../../../store/modals-process/modals-process';

export const ModalBasketFail = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Произошла ошибка</p>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => dispatch(setModalBasketFailStatus(false))}
            >
              Попробовать ещё раз
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => dispatch(setModalBasketFailStatus(false))}
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
