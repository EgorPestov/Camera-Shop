import { SHOWABLE_CARDS_PER_PAGE_COUNT } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts } from '../../store/product-process/selectors';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setShowableProducts, setCurrentPage } from '../../store/product-process/product-process';
import { useEffect } from 'react';

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let currentPage = Number(searchParams.get('page'));
  const productsLength = useAppSelector(getProducts).length;


  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
    dispatch(setShowableProducts());
  }, [dispatch, currentPage]);

  if (!currentPage) {
    currentPage = 1;
  }

  const pagesCount = Math.ceil(productsLength / 9);


  if (productsLength > SHOWABLE_CARDS_PER_PAGE_COUNT) {
    return (
      <div className="pagination">
        <ul className="pagination__list">
          <li className="pagination__item">
            <Link
              className={`pagination__link pagination__link--text ${currentPage <= 1 ? 'visually-hidden' : ''}`}
              to={`${AppRoute.Root}?page=${Number(currentPage) - 1}`}
              onClick={() => {
                dispatch(setShowableProducts());
              }}
            >
              Назад
            </Link>
          </li>
          <li className="pagination__item">
            <Link
              className={`pagination__link ${currentPage === 1 ? 'pagination__link--active' : ''}`}
              to={`${AppRoute.Root}?page=1`}
              onClick={() => {
                dispatch(setShowableProducts());
              }}
            >
              1
            </Link>
          </li>
          <li className="pagination__item">
            <Link
              className={`pagination__link ${currentPage === 2 ? 'pagination__link--active' : ''}`}
              to={`${AppRoute.Root}?page=2`}
              onClick={() => {
                dispatch(setShowableProducts());
              }}
            >
              2
            </Link>
          </li>
          <li className="pagination__item">
            <Link
              className={`pagination__link ${currentPage === 3 ? 'pagination__link--active' : ''}`}
              to={`${AppRoute.Root}?page=3`}
              onClick={() => {
                dispatch(setShowableProducts());
              }}
            >
              3
            </Link>
          </li>
          <li className="pagination__item">
            <Link
              className={`pagination__link pagination__link--text ${currentPage >= pagesCount ? 'visually-hidden' : ''}`}
              to={`${AppRoute.Root}?page=${currentPage + 1}`}
              onClick={() => {
                dispatch(setShowableProducts());
              }}
            >
              Далее
            </Link>
          </li>
        </ul>
      </div>
    );
  }
};
