import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';

export const NotFound = () => (
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }} data-testid="not-found-page">
    <Helmet>
      <title>404</title>
    </Helmet>
    <h1 style={{ fontSize: '120px' }}>
      404
    </h1>
    <h1 style={{ fontSize: '40px' }}>Страница не найдена</h1>

    <Link to={AppRoute.Root} style={{ color: 'blue' }}>
      Вернуться на главную
    </Link>
  </div>

);
