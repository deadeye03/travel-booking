import React from 'react';

interface QuickFactsProps {
  tour: {
    startDates: Date[];
    difficulty: string;
    maxGroupSize: number;
    ratingsAverage: number;
  };
}

const QuickFacts: React.FC<QuickFactsProps> = ({ tour }) => {
  return (
    <div className="overview-box__group">
      <h2 className="heading-secondary mb-[35px]">Quick facts</h2>
      <div className="overview-box__detail text-[15px] flex items-center font-normal mb-[23px]">
        <svg className="overview-box__icon h-[23px] w-[23px] fill-[#55c57a] mr-5">
          <use xlinkHref="/img/icons.svg#icon-calendar"></use>
        </svg>
        <span className="overview-box__label font-bold mr-[23px] uppercase text-[15px]">Next date</span>
        <span className="overview-box__text capitalize">
          {new Date(tour.startDates[0]).toLocaleString('en-us', { month: 'long', year: 'numeric' })}
        </span>
      </div>
      <div className="overview-box__detail text-[15px] flex items-center font-normal mb-[23px]">
        <svg className="overview-box__icon h-[23px] w-[23px] fill-[#55c57a] mr-5">
          <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
        </svg>
        <span className="overview-box__label font-bold mr-[23px] uppercase text-[15px]">Difficulty</span>
        <span className="overview-box__text capitalize">{tour.difficulty}</span>
      </div>
      <div className="overview-box__detail text-[15px] flex items-center font-normal mb-[23px]">
        <svg className="overview-box__icon h-[23px] w-[23px] fill-[#55c57a] mr-5">
          <use xlinkHref="/img/icons.svg#icon-user"></use>
        </svg>
        <span className="overview-box__label font-bold mr-[23px] uppercase text-[15px]">Participants</span>
        <span className="overview-box__text capitalize">{tour.maxGroupSize} people</span>
      </div>
      <div className="overview-box__detail text-[15px] flex items-center font-normal">
        <svg className="overview-box__icon h-[23px] w-[23px] fill-[#55c57a] mr-5">
          <use xlinkHref="/img/icons.svg#icon-star"></use>
        </svg>
        <span className="overview-box__label font-bold mr-[23px] uppercase text-[15px]">Rating</span>
        <span className="overview-box__text capitalize">{tour.ratingsAverage} / 5</span>
      </div>
    </div>
  );
};

export default QuickFacts;

