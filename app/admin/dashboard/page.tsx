import TourCards from '@/components/tourCards'

export const dynamic = 'force-dynamic' // Add this to force dynamic rendering

async function getData() {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not defined')
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`, {
      // Add cache options
      next: {
        revalidate: 60 // Revalidate every 60 seconds
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch tours')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching tours:', error)
    return []
  }
}

export default async function DashboardPage() {
  const tours = await getData()

  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] w-full p-6">
      {tours.length > 0 ? (
        <TourCards tours={tours} />
      ) : (
        <p>No tours available</p>
      )}
    </div>
  )
}

