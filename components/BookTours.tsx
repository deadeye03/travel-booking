"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteTour } from '@/action/tourDeleteAction';
import { Button } from './ui/button';
import InvoiceGenerator from './InvoiceGenerator';
import Image from 'next/image';

interface Booking {
    number: string;
    id: string;
    toursId: string;
    userName: string;
    price: number;
    travelers: number;
    email: string;
    cretedAt: Date;
    tours: {
        id: string;
        name: string;
        imageCover: string;
        difficulty: string;
        duration: number;
        summary: string;
        startLocation: {
            description: string;
        };
        startDates: Date[];
        locations: any[];
        maxGroupSize: number;
        price: number;
        ratingsAverage: number;
        ratingsQuantity: number;

    }
}

interface TourCardsProps {
    tours: Booking[];
}

const BookTours: React.FC<TourCardsProps> = ({ tours }) => {
    const pathname = usePathname();
    
    if (tours.length === 0) {
        return (
            <div className="main mt-[76px]">
                <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-[50px]">
                    <div className="col-span-3">
                        <h2 className="text-[25px] font-bold text-center mt-[20px] mb-[20px]">No Booked Tours available!</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="main mt-[76px]">
            <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-[50px] ">
                {tours?.map((tour, index) => (
                    <div key={index} className="rounded overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.1)] bg-white transition-all duration-300 flex flex-col">
                        <div className="relative">
                            <div className="relative clip-path-polygon-[0_0,_100%_0%,_100%_83%,_0%_98%] h-[220px]">
                                <div className="absolute w-full h-full bg-gradient-to-br from-[#7dd56f] to-[#28b487] opacity-70"></div>
                                <Image src={`/img/tours/${tour.tours.imageCover}`} alt={tour.tours.name} className="object-cover h-full w-full" height={100} width={100} />
                            </div>
                            <h3 className="absolute bottom-[10px] right-[10px] text-[27px] text-right text-white font-light uppercase tracking-[2px] w-[70%]">
                                <span className="bg-gradient-to-br from-[#fff] to-[#28b487] bg-clip-text text-transparent px-[10px] py-[10px] box-decoration-clone">
                                    {tour.tours.name}
                                </span>
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 text-xl  gap-y-[10px] gap-x-[10px] p-4">
                            <h4 className="text-[16px] uppercase font-bold col-span-2">
                                {tour.tours.difficulty} {tour.tours.duration}-day tour
                            </h4>
                            <p className="text-[15px] italic mt-[-10px] mb-[7.5px] col-span-2">
                                {tour.tours.summary}
                            </p>
                            <div className="text-[15px] flex items-center">
                                <svg className="h-[10px] w-[10px] fill-[#55c57a] mr-[7px]">
                                    <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                                </svg>
                                <span>{tour.tours.startLocation?.description}</span>
                            </div>
                            <div className="text-[15px] flex items-center">
                                <svg className="h-[10px] w-[10px] fill-[#55c57a] mr-[7px]">
                                    <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                                </svg>
                                <span>{new Date(tour.tours.startDates[0]).toLocaleString('en-us', { month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="text-[15px] flex items-center">
                                <svg className="h-[20px] w-[10px] fill-[#55c57a] mr-[7px]">
                                    <use xlinkHref="/img/icons.svg#icon-flag"></use>
                                </svg>
                                <span>{5} stops</span>
                            </div>
                            <div className="text-[15px] flex items-center">
                                <svg className="h-[10px] w-[10px] fill-[#55c57a] mr-[7px]">
                                    <use xlinkHref="/img/icons.svg#icon-user"></use>
                                </svg>
                                <span>{tour.tours.maxGroupSize} people</span>
                            </div>
                        </div>
                        <div className="bg-[#f7f7f7] p-[25px_30px] border-t border-[#f1f1f1] text-[14px] grid grid-cols-[auto_1fr] gap-x-[10px] gap-y-[10px] mt-auto">
                            <p>
                                <span className="font-bold">${tour.tours.price}</span>
                                {' | '}
                                <span className="text-[#999]">per person</span>
                            </p>
                            <p className="row-start-2">
                                <span className="font-bold">{tour.tours.ratingsAverage}</span>
                                {' | '}
                                <span className="text-[#999]">rating ({tour.tours.ratingsQuantity})</span>
                            </p>
                           
                            <a href={`/tour/${tour.tours.name}`} className="row-span-2 justify-self-end self-center bg-[#55c57a] text-white text-[14px] py-[12.5px] px-[30px] rounded-[10rem] uppercase no-underline transition-all duration-200 hover:shadow-[0_10px_10px_rgba(0,0,0,0.15)] hover:-translate-y-[3px] active:shadow-[0_0.50px_10px_rgba(0,0,0,0.15)] active:translate-y-[-1px]">
                                    Details
                            </a>

                        </div>
                        <div className='p-4'>
                            <InvoiceGenerator booking={tour} />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default BookTours;

