import { useAppSelector } from '../../../hooks/use-app-selector/use-app-selector';
import { getCurrentId } from '../../../store/product-process/selectors';
import { getAddReviewModalStatus } from '../../../store/modals-process/selectors';
import { useAppDispatch } from '../../../hooks/use-app-dispatch/use-app-dispatch';
import { setModalAddReviewStatus, setModalAddReviewSuccessStatus } from '../../../store/modals-process/modals-process';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { NewReviewType, ErrorsDataType } from '../../../types';
import { MAX_TEXT_LENGTH, MIN_TEXT_LENGTH, StarsNames } from '../../../const';
import { MouseEvent } from 'react';
import { fetchProduct, postReview } from '../../../store/api-actions';


export const ModalAddReview = () => {
  const isAddReviewOpened = useAppSelector(getAddReviewModalStatus);
  const dispatch = useAppDispatch();
  const currentId = useAppSelector(getCurrentId);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [reviewData, setReviewData] = useState<NewReviewType>({
    cameraId: currentId,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  });

  const [errorsData, setErrorsData] = useState({
    userName: false,
    advantage: false,
    disadvantage: false,
    review: false,
    rating: false,
  });

  const handleClose = () => {
    dispatch(setModalAddReviewStatus(false));
    setErrorsData({
      userName: false,
      advantage: false,
      disadvantage: false,
      review: false,
      rating: false,
    });
    setReviewData({
      cameraId: currentId,
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
    });
  };

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const updateErrorsData = async (newErrorsData: ErrorsDataType) => {
      setErrorsData(newErrorsData);

      if (
        !newErrorsData.userName &&
        !newErrorsData.advantage &&
        !newErrorsData.disadvantage &&
        !newErrorsData.review &&
        !newErrorsData.rating
      ) {
        await dispatch(postReview(reviewData));
        await dispatch(fetchProduct({ id: currentId }));
        handleClose();
        dispatch(setModalAddReviewSuccessStatus(true));
      }
    };

    const newErrorsData = { ...errorsData };

    if (reviewData.userName.length < MIN_TEXT_LENGTH || reviewData.userName.length > MAX_TEXT_LENGTH) {
      newErrorsData.userName = true;
    } else {
      newErrorsData.userName = false;
    }

    if (reviewData.advantage.length < MIN_TEXT_LENGTH || reviewData.advantage.length > MAX_TEXT_LENGTH) {
      newErrorsData.advantage = true;
    } else {
      newErrorsData.advantage = false;
    }

    if (reviewData.disadvantage.length < MIN_TEXT_LENGTH || reviewData.disadvantage.length > MAX_TEXT_LENGTH) {
      newErrorsData.disadvantage = true;
    } else {
      newErrorsData.disadvantage = false;
    }

    if (reviewData.review.length < MIN_TEXT_LENGTH || reviewData.review.length > MAX_TEXT_LENGTH) {
      newErrorsData.review = true;
    } else {
      newErrorsData.review = false;
    }

    if (reviewData.rating === 0) {
      newErrorsData.rating = true;
    } else {
      newErrorsData.rating = false;
    }

    updateErrorsData(newErrorsData);
  };


  useEffect(() => {
    if (isAddReviewOpened && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isAddReviewOpened]);

  const handleNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setReviewData({ ...reviewData, userName: evt.target.value });
    if (evt.target.value.length >= MIN_TEXT_LENGTH) {
      setErrorsData({ ...errorsData, userName: false });
    }
  };

  const handleAdvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setReviewData({ ...reviewData, advantage: evt.target.value });
    if (evt.target.value.length >= MIN_TEXT_LENGTH) {
      setErrorsData({ ...errorsData, advantage: false });
    }
  };

  const handleDisadvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setReviewData({ ...reviewData, disadvantage: evt.target.value });
    if (evt.target.value.length >= MIN_TEXT_LENGTH) {
      setErrorsData({ ...errorsData, disadvantage: false });
    }
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData({ ...reviewData, review: evt.target.value });
    if (evt.target.value.length >= MIN_TEXT_LENGTH) {
      setErrorsData({ ...errorsData, review: false });
    }
  };

  return (
    <div className={`modal ${isAddReviewOpened ? 'is-active' : ''}`} data-testid="modal-add-review">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleClose} />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post">
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item ${errorsData.rating ? 'is-invalid' : ''}`}>
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {Array.from({ length: 5 }, (_, index) => (
                        <React.Fragment key={index}>
                          <input
                            className="visually-hidden"
                            id={`star-${index + 1}`}
                            name="rate"
                            type="radio"
                            defaultValue={index + 1}
                            onChange={() => {
                              setReviewData({ ...reviewData, rating: index + 1 });
                              setErrorsData({ ...errorsData, rating: false });
                            }}
                            checked={index + 1 === reviewData.rating}
                          />
                          <label
                            className="rate__label"
                            htmlFor={`star-${index + 1}`}
                            title={StarsNames[index + 1]}
                          />
                        </React.Fragment>
                      )).reverse()}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{reviewData.rating}</span> <span>/ </span>
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className={`custom-input form-review__item ${errorsData.userName ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      value={reviewData.userName}
                      onChange={handleNameChange}
                      ref={nameInputRef}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className={`custom-input form-review__item ${errorsData.advantage ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      value={reviewData.advantage}
                      onChange={handleAdvantageChange}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={`custom-input form-review__item ${errorsData.disadvantage ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      value={reviewData.disadvantage}
                      onChange={handleDisadvantageChange}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className={`custom-textarea form-review__item ${errorsData.review ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      value={reviewData.review}
                      onChange={handleReviewChange}
                    />
                  </label>
                  <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" onClick={handleSubmit}>
                Отправить отзыв
              </button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleClose}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
