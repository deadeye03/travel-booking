'use client';
import React, { useState } from 'react';
import TourBooking from './TourBooking';
import Image from 'next/image';

interface CTAProps {
  tour: {
    id: string;
    images: string[];
    duration: number;
    name: string;
    price:number;
  };
  user: any;
  allBookTours: string[];
}

const CTA: React.FC<CTAProps> = ({ tour, user, allBookTours }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TourBooking IsOpen={isOpen} setIsOpen={setIsOpen} price={tour.price} imageCover={tour.images[0]} toursId={tour.id} />
      <section className="section-cta -mt-[calc(var(--section-rotate))] p-12 bg-gray-100">
        <div className="cta relative p-12 mx-auto overflow-hidden bg-white  rounded-[20px] shadow-[0_30px_80px_5px_rgba(0,0,0,0.15)]">
          <div className="cta__img cta__img--logo h-24 w-24 absolute left-0 top-1/2 rounded-full shadow-[10px_5px_30px_rgba(0,0,0,0.15)] p-8 flex items-center justify-center bg-gradient-to-br from-[#7dd56f] to-[#28b487] z-10 -translate-x-[35%] -translate-y-1/2">
            <Image height={100} width={100} src="/img/logo-white.png" alt="Natours logo" className="h-w-full" />
          </div>
          <Image height={100} width={100}
            src={`/img/tours/${tour.images[0]}`}
            alt=""
            className="cta__img cta__img--1 h-10 w-10 absolute left-0 top-1/2 rounded-full shadow-[10px_0.50px_30px_rgba(0,0,0,0.15)] -translate-x-[10%] -translate-y-[50%] scale-[0.97] z-[9]"
          />
          <Image height={100} width={100}
            src={`/img/tours/${tour.images[1]}`}
            alt=""
            className=" h-24 w-24 absolute left-0 top-1/2 rounded-full shadow-[10px_0.50px_30px_rgba(0,0,0,0.15)] translate-x-[15%] -translate-y-[50%] scale-[0.94] z-[8]"
          />
          <div className="flex ml-24 items-center gap-4">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text text-[19px] font-normal">
              {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
            </p>

            <button className="btn btn--green" onClick={() => setIsOpen(true)}>
              Book tour now!
            </button>

          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;

