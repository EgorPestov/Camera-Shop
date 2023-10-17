import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchReviews } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCurrentId, getReviewsLoadStatus, getReviews } from '../../store/product-process/selectors';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { formatDateToHumanType, formatDateToMachineType } from '../../utils';

export const Reviews = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(getCurrentId);
  const isReviewsLoading = useAppSelector(getReviewsLoadStatus);
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchReviews({ id }));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (isReviewsLoading) {
    return (<LoadingScreen />);
  } else if (reviews.length > 0) {
    return (
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">

            {reviews.map((review) => (
              <li className="review-card" key={review.id}>
                <div className="review-card__head">
                  <p className="title title--h4">{review.userName}</p>
                  <time className="review-card__data" dateTime={formatDateToMachineType(review.createAt)}>
                    {formatDateToHumanType(review.createAt)}
                  </time>
                </div>
                <div className="rate review-card__rate">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg key={index} width={17} height={16} aria-hidden="true">
                      <use xlinkHref={index < review.rating ? '#icon-full-star' : '#icon-star'} />
                    </svg>
                  ))}
                  <p className="visually-hidden">Оценка: {review.rating}</p>
                </div>
                <ul className="review-card__list">
                  <li className="item-list">
                    <span className="item-list__title">Достоинства:</span>
                    <p className="item-list__text">
                      {review.advantage}
                    </p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Недостатки:</span>
                    <p className="item-list__text">
                      {review.disadvantage}
                    </p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Комментарий:</span>
                    <p className="item-list__text">
                      {review.review}
                    </p>
                  </li>
                </ul>
              </li>
            ))}

          </ul>
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button">
              Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
    );
  }
};
