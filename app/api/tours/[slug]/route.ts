import prisma from "@/lib/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(request:Request,{ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    console.log('slug is ', slug)
    try {
        const getTour = await prisma.tours.findUnique({
            where: {
                name: slug
            },
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
                description:true,
                reviews:{
                    include:{
                        users:true,
                    }
                }
            }
        })
        console.log('TOUR is ',getTour)
        return NextResponse.json({ status: true, data: getTour })
    } catch (error) {
        console.log('Unable to find tour', error)
        return NextResponse.json({ status: false, data: error })
    }

}

export async function DELETE(request:Request,{ params }: { params: Promise<{ slug: string }> }) {
    const  id= (await params).slug
    console.log('id is ',id)

    try {
        if (!id) {
            throw new Error('Please define id')
        }
        const deleteTour = await prisma.tours.deleteMany({
            where: {
                id: id,
            },
        })
        
        
        return NextResponse.json({ status: true, })
    } catch (error) {
        console.log('Unable to delete tour', error)
        return NextResponse.json({ status: false, data: error })
    }   
}

export async function PATCH(request:Request,{ params }: { params: Promise<{ slug: string }> }) {
    const  id= (await params).slug
    console.log('id is ',id)
    const data=await request.json();
    console.log('data is ',data)
    try {
        if (!id) {
            throw new Error('Please define id')
        }
        const updateTour = await prisma.tours.updateMany({
            where: {
                id: id,
            },
            data: {
                name:data.name,
                duration:data.duration,
                maxGroupSize:data.maxGroupSize,
                difficulty:data.difficulty,
                ratingsAverage:data.ratingsAverage,
                ratingsQuantity:data.ratingsQuantity,
                price:data.price,
                summary:data.summary,
                description:data.description,
                startDates:data.startDate
            },
        })
        
        
        return NextResponse.json({ status: true, })
    } catch (error) {
        console.log('Unable to update tour', error)
        return NextResponse.json({ status: false, data: error })
    }
        
}
