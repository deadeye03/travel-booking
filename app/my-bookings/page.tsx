import BookTours from '@/components/BookTours';
import React from 'react'

async function page() {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-bookings`);
    const response=await res.json();
    if (!response.data) {
        return {
            notFound: true
        }
    }
  return (
    <BookTours tours={response.data} />
  )
}

export default page
