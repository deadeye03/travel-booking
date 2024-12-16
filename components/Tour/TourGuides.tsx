import Image from 'next/image';
import React from 'react';

interface Guide {
  name: string;
  role: string;
  photo: string;
}

interface TourGuidesProps {
  guides: Guide[];
}

const TourGuides = () => {
  return (
    <div className="overview-box__group">
      <h2 className="heading-secondary mb-[35px]">Your tour guides</h2>
      
        <div  className="overview-box__detail text-[16px] flex items-center font-normal mb-[23px]">
          <Image height={100} width={100}
            src={`/img/users/user-4.jpg`}
            alt={'name is '}
            className="overview-box__img rounded-full h-[35px] mr-5"

          />
          <span className="overview-box__label font-bold mr-[23px] uppercase text-[14px]">
          lead-guide
          </span>
          <span className="overview-box__text capitalize">Sonia Desouza</span>
        </div>

        <div  className="overview-box__detail text-[16px] flex items-center font-normal mb-[23px]">
          <Image height={100} width={100}
            src={`/img/users/user-1.jpg`}
            alt={'name is '}
            className="overview-box__img rounded-full h-[35px] mr-5"
          />
          <span className="overview-box__label font-bold mr-[23px] uppercase text-[14px]">
          lead-guide
          </span>
          <span className="overview-box__text capitalize">Saurbh kumar</span>
        </div>

        <div  className="overview-box__detail text-[16px] flex items-center font-normal mb-[23px]">
          <Image height={100} width={100}
            src={`/img/users/user-2.jpg`}
            alt={'name is '}
            className="overview-box__img rounded-full h-[35px] mr-5"
          />
          <span className="overview-box__label font-bold mr-[23px] uppercase text-[14px]">
          lead-guide
          </span>
          <span className="overview-box__text capitalize">Lucy Williams</span>
        </div>
     
    </div>
  );
};

export default TourGuides;

