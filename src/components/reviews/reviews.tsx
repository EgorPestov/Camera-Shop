import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchReviews } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCurrentId, getReviewsLoadStatus, getReviews } from '../../store/product-process/selectors';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { formatDateToHumanType, formatDateToMachineType } from '../../utils';
import { SHOWABLE_REVIEWS_COUNT } from '../../const';
import { setModalAddReviewStatus } from '../../store/modals-process/modals-process';

export const Reviews = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(getCurrentId);
  const isReviewsLoading = useAppSelector(getReviewsLoadStatus);
  const reviews = useAppSelector(getReviews).slice().sort((a, b) => {
    const dateA = new Date(a.createAt).getTime();
    const dateB = new Date(b.createAt).getTime();
    return dateB - dateA;
  });
  const [visibleReviews, setVisibleReviews] = useState(SHOWABLE_REVIEWS_COUNT);

  const handleShowMoreClick = () => {
    setVisibleReviews(visibleReviews + SHOWABLE_REVIEWS_COUNT);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchReviews({ id }));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  useEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 100) {
        setVisibleReviews(visibleReviews + SHOWABLE_REVIEWS_COUNT);
      }
    };

    if (isMounted) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleReviews]);

  if (isReviewsLoading) {
    return (<LoadingScreen />);
  } else if (reviews.length > 0) {
    return (
      <section className="review-block" data-testid="reviews">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={() => dispatch(setModalAddReviewStatus(true))}>
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">

            {reviews.slice(0, visibleReviews).map((review) => (
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
          {visibleReviews < reviews.length && (
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={handleShowMoreClick} >
                Показать больше отзывов
              </button>
            </div>)}
        </div>
      </section>
    );
  }
};
