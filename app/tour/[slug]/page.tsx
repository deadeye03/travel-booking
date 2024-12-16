
import TourDetails from '@/components/Tour/TourDetails';
import React from 'react'

async function page( { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug
  console.log('SLug is',slug)
  
  const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${slug}`)
  const tour=await response.json();
  return (
    <TourDetails tour={tour.data} user={null} allBookTours={[]} />
  )
}

export default page
