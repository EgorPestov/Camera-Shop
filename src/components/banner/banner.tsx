import Swiper from 'swiper/bundle';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import { BANNER_SHOW_TIME, BannerInfo } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts } from '../../store/product-process/selectors';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState, useEffect } from 'react';

export const Banner = () => {
  const products = useAppSelector(getProducts);
  const [swiperInitialized, setSwiperInitialized] = useState(false);

  const findIdByName = (name: string) => {
    if (products) {
      return products.find((product) => product.name === name)?.id;
    }
  };

  useEffect(() => {
    if (!swiperInitialized) {
      new Swiper('.swiper', {
        modules: [Navigation],
        direction: 'horizontal',
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: BANNER_SHOW_TIME,
          disableOnInteraction: false,
        },
      });
      setSwiperInitialized(true);
    }
  }, [swiperInitialized]);

  return (
    <div className='swiper' data-testid="banner">
      <div className="swiper-button-prev" />
      <div className='swiper-wrapper'>
        {BannerInfo.map((banner) => (
          <div key={banner.name} className="banner swiper-slide">
            <picture>
              <source
                type="image/webp"
                srcSet={banner.srcSetWebp}
              />
              <img
                src={banner.src}
                srcSet={banner.srcSet}
                width={1280}
                height={280}
                alt={banner.name}
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">
                {banner.name}
              </span>
              <span className="banner__text">
                {banner.description}
              </span>
              <Link className="btn" to={`${AppRoute.Item}/${findIdByName(banner.name) as number}`}>
                Подробнее
              </Link>
            </p>
          </div>
        ))}
      </div>
      <div className="swiper-button-next" />
    </div>
  );
};
