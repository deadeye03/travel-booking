import prisma from "@/lib/utils/db"
import { NextResponse } from "next/server"

export async function GET(request:Request) {
    try {
        const allBookTours=await prisma.booking.findMany({
            include:{
                tours:true
            }
        })
        console.log('all booking',allBookTours)
        return NextResponse.json({status:true,data:allBookTours})
        
    } catch (error:any) {
        throw new Error('Unable to fetch all booking',error)
    }
}