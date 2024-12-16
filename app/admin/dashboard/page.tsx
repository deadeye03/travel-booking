import TourCards from '@/components/tourCards';
import React from 'react'

async function page() {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error('NEXT_PUBLIC_BASE_URL is not defined')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`)
    const allTours = await response.json();
    if (!allTours) {
        return{
            notFound:true,
        }
    }
    return (
        <div className='min-h-[calc(100vh-72px] mt-[72px] w-full p-6'>
           <TourCards tours={allTours} />
        </div>
    )
}

export default page
