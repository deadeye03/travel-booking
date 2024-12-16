import TourForm from '@/components/EditTours';
import React from 'react'

async function page( { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  console.log('id is',id)
  
  const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${id}`)
  const tour=await response.json();
  // console.log('tourdata is ',tour.data)
  return (
    <TourForm tour={tour.data} />
  )
}

export default page