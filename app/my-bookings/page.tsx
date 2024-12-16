import BookTours from '@/components/BookTours';
import { notFound } from 'next/navigation';

// Force dynamic rendering to ensure fresh data on each request
export const dynamic = 'force-dynamic';

async function getBookings() {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-bookings`;
  console.log(`Fetching bookings from: ${url}`); // Debug log

  try {
    const res = await fetch(url, {
      next: { revalidate: 0 }, // Disable caching for now
      headers: {
        'Cache-Control': 'no-cache' // Ensure fresh data
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return null;
  }
}

export default async function MyBookingsPage() {
  let bookings;
  let error = null;

  try {
    bookings = await getBookings();
  } catch (e) {
    error = e;
    console.error("Error in MyBookingsPage:", e);
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-72px)] mt-[72px] w-full p-6">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <p className="text-red-500">Error loading bookings. Please try again later.</p>
        <p className="text-sm text-gray-500 mt-2">Error details: {error.toString()}</p>
      </div>
    );
  }

  if (!bookings) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] w-full p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <BookTours tours={bookings} />
    </div>
  );
}

