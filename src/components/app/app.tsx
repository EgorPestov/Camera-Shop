import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Catalog } from '../../pages/catalog/catalog';
import { NotFound } from '../../pages/404/404';
import { Basket } from '../../pages/basket/basket';

export const App = () => (
  <HelmetProvider>
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Catalog />}
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
