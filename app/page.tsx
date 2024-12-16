
import TourCards from "@/components/tourCards";
import Image from "next/image";

export default async function Home() {
  // console.log(process.env.NEXT_PUBLIC_BASE_URL)
  const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`)
  // console.log(response)
  const allTours=await response.json();
  if (!allTours) {
    return {
      notFound: true
    }
  }
  // console.log('all tours is ',allTours)
  return (
    <div
        className="min-h-[calc(100vh-72px] mt-[72px] w-full  shadow-xl p-6"
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
