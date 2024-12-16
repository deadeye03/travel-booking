import prisma from "@/lib/utils/db";
import { NextResponse } from "next/server";

type Booking = {
    number: string;
    id: string;
    toursId: string;
    userName: string;
    price: number;
    travelers: number;
    email: string;
    cretedAt: Date;
}
export async function POST(request: Request) {
    const body = await request.text();
    const data = JSON.parse(body);

    console.log('data is in add', data);

    try {
        const createBooking = await prisma.booking.create({
            data:{
                userName: data.name,
                email:data.email,
                number:data.number,
                travelers:data.travelers,
                toursId:data.toursId,
                price:data.price
            }
        })
        console.log('Created booking is ', createBooking)
        return NextResponse.json({ status: true, message: 'Booking created' })
    } catch (error) {
        console.log('Unable to create booking', error)
        return NextResponse.json({ status: false, data: error })
    }

}