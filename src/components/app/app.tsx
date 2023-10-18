import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Catalog } from '../../pages/catalog/catalog';
import { NotFound } from '../../pages/404/404';
import { Basket } from '../../pages/basket/basket';
import { Item } from '../../pages/item/item';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { setIsModalAddItemOpen, setIsModalAddItemSuccessOpen, setAddReviewModalStatus, setReviewSuccessModalStatus } from '../../store/product-process/product-process';
import { fetchProducts } from '../../store/api-actions';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchProducts());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      dispatch(setIsModalAddItemOpen(false));
      dispatch(setIsModalAddItemSuccessOpen(false));
      dispatch(setAddReviewModalStatus(false));
      dispatch(setReviewSuccessModalStatus(false));
    }
  };

  document.addEventListener('keydown', handleEscapeKey);


  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Catalog />}
        />
        <Route
          path={`${AppRoute.Item}/:id`}
          element={<Item />}
        />
        <Route
          path={AppRoute.Basket}
          element={<Basket />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </HelmetProvider>
  );
};
