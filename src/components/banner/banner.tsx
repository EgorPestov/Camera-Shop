import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BANNER_SHOW_TIME, BannerInfo } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getProducts } from '../../store/product-process/selectors';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export const Banner = () => {
  const products = useAppSelector(getProducts);

  const findIdByName = (name: string) => {
    if (products) {
      return products.find((product) => product.name === name)?.id;
    }
  };

  return (
    <Swiper
      direction='horizontal'
      loop
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
      }}
      autoplay={{
        delay: BANNER_SHOW_TIME,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      style={{
        '--swiper-pagination-color': '#7575E2',
        '--swiper-pagination-bullet-inactive-color': '#F4F4FC',
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-size': '16px',
        '--swiper-pagination-bullet-horizontal-gap': '6px',
        '--swiper-pagination-bottom': '22px',
      } as React.CSSProperties}
    >
      <div className='swiper-wrapper'>
        {BannerInfo.map((banner) => (
          <SwiperSlide key={banner.name} className="banner swiper-slide">
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
          </SwiperSlide>
        ))}
      </div>
      <div
        className="swiper-pagination"
        style={{
          textAlign: 'right',
          paddingRight: '40px',
        }}
      >
      </div>
    </Swiper>
  );
};
