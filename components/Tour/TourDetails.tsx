import React from 'react';
import Header from './Header';
import QuickFacts from './QuickFacts';
import TourGuides from './TourGuides';
import Description from './Description';
import Pictures from './Pictures';
import Reviews from './Reviews';
import CTA from './CTA';
import { Tour } from '@/type';



interface TourDetailsProps {
  tour: Tour;
  user: any;
  allBookTours: string[];
}

const TourDetails: React.FC<TourDetailsProps> = ({ tour, user, allBookTours }) => {
  return (
    <div className="tour-details">
      <Header tour={tour} />
      <section className="section-description bg-gray-50 -mt-[calc(var(--section-rotate))] flex">
        <div className="overview-box bg-gray-100 flex justify-center py-10 px-20 pb-[calc(1vw+var(--section-rotate))] flex-[0_0_50%]">
          <div>
            <QuickFacts tour={tour} />
            <TourGuides />
          </div>
        </div>
        <Description tour={tour} />
      </section>
      <Pictures images={tour.images} name={tour.name} />
      <Reviews reviews={tour.reviews} />
      <CTA tour={tour} user={user} allBookTours={allBookTours} />
    </div>
  );
};

export default TourDetails;

