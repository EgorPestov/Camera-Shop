import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';

export const NotFound = () => (
  <div>
    <Helmet>
      <title>404</title>
    </Helmet>
    <h1>
      404.
      <br />
      <small>Страница не найдена</small>
    </h1>
    <Link to={AppRoute.Root}>Вернуться на главную</Link>
  </div>
);
