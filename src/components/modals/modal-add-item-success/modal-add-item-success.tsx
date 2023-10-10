import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { setIsModalAddItemSuccess } from '../../../store/product-process/product-process';
import { Link } from 'react-router-dom';

export const ModalAddItemSuccess = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" to={AppRoute.Root} onClick={() => dispatch(setIsModalAddItemSuccess(false))}>
              Продолжить покупки
            </Link>
            <button className="btn btn--purple modal__btn modal__btn--fit-width"> {/* тут наверное редирект в корзину или изменить на Link?*/}
              Перейти в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(setIsModalAddItemSuccess(false))}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
