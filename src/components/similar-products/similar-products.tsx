import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchSimilarProducts } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCurrentId, getSimilarProductsLoadStatus, getSimilarProducts } from '../../store/product-process/selectors';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { ProductCard } from '../product-card/product-card';
import { MouseEvent } from 'react';
import { SHOWABLE_SIMILAR_CARDS_COUNT, SIMILAR_CARDS_SLIDER_DELAY_TIME } from '../../const';
import { BasketType } from '../../types';

export const SimilarProducts = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(getCurrentId);
  const isSimilarProductsLoading = useAppSelector(getSimilarProductsLoadStatus);
  const similarProducts = useAppSelector(getSimilarProducts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const basket = JSON.parse(localStorage.getItem('Basket') || '{}') as BasketType;

  const handleNextClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    if (currentIndex + SHOWABLE_SIMILAR_CARDS_COUNT < similarProducts.length) {
      setTimeout(() => {
        const newIndex = currentIndex + SHOWABLE_SIMILAR_CARDS_COUNT;
        setCurrentIndex(newIndex);
        setIsPrevDisabled(false);
        setIsNextDisabled(newIndex + SHOWABLE_SIMILAR_CARDS_COUNT >= similarProducts.length);
      }, SIMILAR_CARDS_SLIDER_DELAY_TIME);
    }
  };

  const handlePrevClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    if (currentIndex - SHOWABLE_SIMILAR_CARDS_COUNT >= 0) {
      setTimeout(() => {
        const newIndex = currentIndex - SHOWABLE_SIMILAR_CARDS_COUNT;
        setCurrentIndex(newIndex);
        setIsNextDisabled(false);
        setIsPrevDisabled(newIndex <= 0);
      }, SIMILAR_CARDS_SLIDER_DELAY_TIME);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchSimilarProducts({ id }));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (isSimilarProductsLoading) {
    return (<LoadingScreen />);
  } else if (similarProducts.length > 0) {
    return (
      <section className="product-similar" data-testid="similar-products">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">

              {similarProducts.slice(currentIndex, currentIndex + SHOWABLE_SIMILAR_CARDS_COUNT).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isActive
                  basket={basket[product.id] || false}
                />
              ))}

            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={handlePrevClick}
              disabled={isPrevDisabled}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={handleNextClick}
              disabled={isNextDisabled}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }
  return null;
};
