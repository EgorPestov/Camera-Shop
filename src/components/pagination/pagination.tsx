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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [currPage, setCurrPage] = useState(Number(searchParams.get('page')));
  const [currentBlock, setCurrentBlock] = useState(1);

  const productsLength = useAppSelector(getProducts).length;

  useEffect(() => {
    if (!currPage || currPage < 1) {
      setCurrPage(1);
    }
    dispatch(setCurrentPage(currPage));
    dispatch(setShowableProducts());
  }, [dispatch, currPage]);

  const calculateNewStates = (increment: number) => {
    const newCurrPage = currPage + increment;
    const newCurrentBlock = Math.ceil(newCurrPage / SHOWABLE_PAGES_COUNT);
    return { newCurrPage, newCurrentBlock };
  };

  const pagesCount = Math.ceil(productsLength / SHOWABLE_CARDS_PER_PAGE_COUNT);
  const blocksCount = Math.ceil(pagesCount / SHOWABLE_PAGES_COUNT);

  const numberButtons = Array.from({ length: 5 }, (_, index) => {
    if (Math.ceil((index + 1) / SHOWABLE_PAGES_COUNT) === currentBlock) {
      return (
        <li key={index} className="pagination__item">
          <Link
            className={`pagination__link ${currPage === index + 1 ? 'pagination__link--active' : ''}`}
            to={`${AppRoute.Root}?page=${index + 1}`}
            onClick={() => {
              dispatch(setShowableProducts());
              setCurrPage(index + 1);
              setCurrentBlock(Math.ceil((index + 1) / SHOWABLE_PAGES_COUNT));
            }}
          >
            {index + 1}
          </Link>
        </li>
      );
    }
  });

  if (productsLength > SHOWABLE_CARDS_PER_PAGE_COUNT) {
    return (
      <div className="pagination" data-testid="pagination">
        <ul className="pagination__list">
          <li className="pagination__item">
            <Link
              className={`pagination__link pagination__link--text ${currentBlock === 1 ? 'visually-hidden' : ''}`}
              to={`${AppRoute.Root}?page=${(currentBlock - 1) * SHOWABLE_PAGES_COUNT}`}
              onClick={() => {
                const { newCurrPage, newCurrentBlock } = calculateNewStates(-1);
                dispatch(setShowableProducts());
                setCurrPage(newCurrPage);
                setCurrentBlock(newCurrentBlock);
              }}
            >
              Назад
            </Link>
          </li>
          {numberButtons}
          <li className="pagination__item">
            <Link
              className={`pagination__link pagination__link--text ${currentBlock === blocksCount ? 'visually-hidden' : ''}`}
              to={`${AppRoute.Root}?page=${currentBlock * SHOWABLE_PAGES_COUNT + 1}`}
              onClick={() => {
                const { newCurrPage, newCurrentBlock } = calculateNewStates(1);
                dispatch(setShowableProducts());
                setCurrPage(newCurrPage);
                setCurrentBlock(newCurrentBlock);
              }}
            >
              Далее
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return null;
};
