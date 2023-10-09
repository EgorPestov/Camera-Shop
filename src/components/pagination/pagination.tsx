import { SHOWABLE_CARDS_PER_PAGE_COUNT, SHOWABLE_PAGES_COUNT } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts } from '../../store/product-process/selectors';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setShowableProducts, setCurrentPage } from '../../store/product-process/product-process';
import { useEffect, useState } from 'react';

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const [currentBlock, setCurrentBlock] = useState(1);
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


  const pagesCount = Math.ceil(productsLength / SHOWABLE_CARDS_PER_PAGE_COUNT);
  const blocksCount = Math.ceil(pagesCount / SHOWABLE_PAGES_COUNT);

  const numberButtons = Array.from({ length: pagesCount }, (_, index) => (
    <li key={index} className="pagination__item">
      <Link
        className={`pagination__link ${currentPage === index + 1 ? 'pagination__link--active' : ''} ${Math.ceil((index + 1) / SHOWABLE_PAGES_COUNT) === currentBlock ? '' : 'visually-hidden'}`}
        to={`${AppRoute.Root}?page=${index + 1}`}
        onClick={() => {
          dispatch(setShowableProducts());
          setCurrentBlock(Math.ceil((index + 1) / SHOWABLE_PAGES_COUNT));
        }}
      >
        {index + 1}
      </Link>
    </li>
  ));

  if (productsLength > SHOWABLE_CARDS_PER_PAGE_COUNT) {
    return (
      <div className="pagination">
        <ul className="pagination__list">
          <li className="pagination__item">
            <Link
              className={`pagination__link pagination__link--text ${currentBlock === 1 ? 'visually-hidden' : ''}`}
              to={`${AppRoute.Root}?page=${Number(currentPage) - 1}`}
              onClick={() => {
                dispatch(setShowableProducts());
                setCurrentBlock(currentBlock - 1);
              }}
            >
              Назад
            </Link>
          </li>
          {numberButtons}
          <li className="pagination__item">
            <Link
              className={`pagination__link pagination__link--text ${currentBlock === blocksCount ? 'visually-hidden' : ''}`}
              to={`${AppRoute.Root}?page=${currentPage + 1}`}
              onClick={() => {
                dispatch(setShowableProducts());
                setCurrentBlock(currentBlock + 1);
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
