import TourCards from "@/components/tourCards";

// Force dynamic rendering if needed
// export const dynamic = 'force-dynamic'

async function getTours() {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined')
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return null;
  }
}

export default async function Home() {
  const allTours = await getTours();

  if (!allTours) {
    // You might want to render an error message instead of returning notFound
    return <div>Failed to load tours. Please try again later.</div>;
  }

  return (
    <div
      className="min-h-[calc(100vh-72px)] mt-[72px] w-full shadow-xl p-6"
      style={{
        background: `
        linear-gradient(135deg, 
          #d8f7ea 0%, 
          #d8f7ea 40%, 
          #e1eeff 60%, 
          #e1eeff 100%
        ),
        linear-gradient(
          to bottom,
          rgba(225, 238, 255, 1) 0%,
          rgba(225, 238, 255, 1) 70%,
          rgba(255, 255, 255, 1) 100%
        )
      `,
        backgroundBlendMode: 'normal, soft-light',
      }}
    >
      <TourCards tours={allTours} />
    </div>
  );
}

