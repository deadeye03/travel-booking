import prisma from "@/lib/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log('Attempting to fetch tours...');
    const fetchAllTours = await prisma.tours.findMany(
        {
        select:{
            id:true,
            name:true,
            duration:true,
            difficulty:true,
            maxGroupSize:true,
            price:true,
            ratingsAverage:true,
            ratingsQuantity:true,
            startLocation:true,
            startDates:true,
            imageCover:true,
            summary:true,
            images:true,
        }
    }
);
    // console.log('Fetched tours:', fetchAllTours);
    
    if (fetchAllTours.length === 0) {
      console.log('No tours found');
      return NextResponse.json({ message: "No tours found" }, { status: 404 });
    }

    return NextResponse.json(fetchAllTours);
  } catch (error) {
    console.error('Unable to fetch all tours', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

