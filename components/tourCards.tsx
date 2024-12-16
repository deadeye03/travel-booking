"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';


interface Tour {
  id:string;
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

interface TourCardsProps {
  tours: Tour[];
}

const TourCards: React.FC<TourCardsProps> = ({ tours }) => {
  const pathname = usePathname();
  const isAdmin = pathname.split('/')[1];

  const [tourId,setTourId]=React.useState('');
  
  const handleDelete = async (id: string) => {
  
    setTourId(id)
    try {
      const res = await fetch(`/api/tours/${id}`, {
        method: 'DELETE',
      });

      // const response = await deleteTour(id);
      const response = await res.json();
      if (response.status) {
        toast.success('Tour deleted successfully');
        location.reload();
      } else {
        toast.error('Failed to delete tour');
      }
      
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast.error('Failed to delete tour');
      
    }
    setTourId('');
  };

  return (
    <main className="main">
      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-[50px] ">
        {tours.map((tour, index) => (
          <div key={index} className="rounded overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.1)] bg-white transition-all duration-300 flex flex-col">
            <div className="relative">
              <div className="relative clip-path-polygon-[0_0,_100%_0%,_100%_83%,_0%_98%] h-[220px]">
                <div className="absolute w-full h-full bg-gradient-to-br from-[#7dd56f] to-[#28b487] opacity-70"></div>
                <Image src={`/img/tours/${tour.imageCover}`} alt={tour.name} className="object-cover h-full w-full" height={500} width={500} />
              </div>
              <h3 className="absolute bottom-[10px] right-[10px] text-[27px] text-right text-white font-light uppercase tracking-[2px] w-[70%]">
                <span className="bg-gradient-to-br from-[#fff] to-[#28b487] bg-clip-text text-transparent px-[10px] py-[10px] box-decoration-clone">
                  {tour.name}
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-2 text-xl  gap-y-[10px] gap-x-[10px] p-4">
              <h4 className="text-[16px] uppercase font-bold col-span-2">
                {tour.difficulty} {tour.duration}-day tour
              </h4>
              <p className="text-[15px] italic mt-[-10px] mb-[7.5px] col-span-2">
                {tour.summary}
              </p>
              <div className="text-[15px] flex items-center">
                <svg className="h-[10px] w-[10px] fill-[#55c57a] mr-[7px]">
                  <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                </svg>
                <span>{tour.startLocation?.description}</span>
              </div>
              <div className="text-[15px] flex items-center">
                <svg className="h-[10px] w-[10px] fill-[#55c57a] mr-[7px]">
                  <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                </svg>
                <span>{new Date(tour.startDates[0]).toLocaleString('en-us', { month: 'long', year: 'numeric' })}</span>
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
                <span>{tour.maxGroupSize} people</span>
              </div>
            </div>
            <div className="bg-[#f7f7f7] p-[25px_30px] border-t border-[#f1f1f1] text-[14px] grid grid-cols-[auto_1fr] gap-x-[10px] gap-y-[10px] mt-auto">
              <p>
                <span className="font-bold">${tour.price}</span>
                {' | '}
                <span className="text-[#999]">per person</span>
              </p>
              <p className="row-start-2">
                <span className="font-bold">{tour.ratingsAverage}</span>
                {' | '}
                <span className="text-[#999]">rating ({tour.ratingsQuantity})</span>
              </p>
              {isAdmin==='admin'?(
                 <>
                  <a href={`/admin/edit/${tour.name}`} className="btn bg-[#55c57a] text-white flex text-center">Edit</a>
                  <button className="btn bg-red-500 text-white" onClick={()=>handleDelete(tour.id)}>{tourId===tour.id ?'Deleting...':'Delete'}</button>
                  </>
              ):
              <a href={`/tour/${tour.name}`} className="row-span-2 justify-self-end self-center bg-[#55c57a] text-white text-[14px] py-[12.5px] px-[30px] rounded-[10rem] uppercase no-underline transition-all duration-200 hover:shadow-[0_10px_10px_rgba(0,0,0,0.15)] hover:-translate-y-[3px] active:shadow-[0_0.50px_10px_rgba(0,0,0,0.15)] active:translate-y-[-1px]">
                Details
              </a> }

            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TourCards;

