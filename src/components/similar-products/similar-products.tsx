import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchSimilarProducts } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCurrentId, getSimilarProductsLoadStatus, getSimilarProducts } from '../../store/product-process/selectors';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { ProductCard } from '../product-card/product-card';

export const SimilarProducts = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(getCurrentId);
  const isSimilarProductsLoading = useAppSelector(getSimilarProductsLoadStatus);
  const similarProducts = useAppSelector(getSimilarProducts);

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
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">

              {similarProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} isActive />
              ))}

            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
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
};
