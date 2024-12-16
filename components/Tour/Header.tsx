import Image from 'next/image';
import React from 'react';

interface HeaderProps {
  tour: {
    imageCover: string;
    name: string;
    duration: number;
    startLocation: {
      description: string;
    };
  };
}

const Header: React.FC<HeaderProps> = ({ tour }) => {
  // console.log('TOURS IS HEADER',tour)
  return (
    <section className="relative h-[38vw] clip-path-polygon-[0_0,_100%_0,_100%_calc(100%_-_var(--section-rotate)),_0_100%]">
      <div className="header__hero h-full">
        <div className="header__hero-overlay absolute w-full h-full bg-gradient-to-br from-[#7dd56f] to-[#28b487] opacity-85"></div>
        <Image
          src={`/img/tours/${tour?.imageCover}`}
          alt={tour.name}
          className="object-cover h-full w-full object-[50%_25%]"
          height={700}
          width={700}
        />
      </div>
      <div className="heading-box absolute bottom-[13vw] left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2">
        <h1 className="heading-primary">
          <span className="bg-gradient-to-br from-[#fff] to-[#fff] bg-clip-text text-transparent px-[10px] py-[10px] box-decoration-clone">
            {tour.name} Tour
          </span>
        </h1>
        <div className="heading-box__group text-white mt-12 flex items-center justify-center">
          <div className="heading-box__detail text-[15px] font-bold uppercase flex items-center text-shadow-[0_5px_20px_rgba(0,0,0,0.15)] mr-16">
            <svg className="heading-box__icon h-8 w-8 fill-current mr-3 filter drop-shadow-[0_0.75rem_5px_rgba(0,0,0,0.25)]">
              <use xlinkHref="/img/icons.svg#icon-clock"></use>
            </svg>
            <span className="heading-box__text">{tour.duration} days</span>
          </div>
          <div className="heading-box__detail text-[15px] font-bold uppercase flex items-center text-shadow-[0_0.5rem_20px_rgba(0,0,0,0.15)]">
            <svg className="heading-box__icon h-8 w-8 fill-current mr-3 filter drop-shadow-[0_0.75rem_0.5rem_rgba(0,0,0,0.25)]">
              <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
            </svg>
            <span className="heading-box__text">{tour.startLocation?.description || 'Unknown location'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

