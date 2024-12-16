"use server"

import prisma from "@/lib/utils/db"

export const deleteTour = async (id: string) => { 
    console.log('id',id)
    try {
        await prisma.tours.deleteMany({
            where:{
                id
            }
        })
        return {status:true}
    } catch (error) {
        console.log('unable to delete tour',error)
        return {status:false}
    }

}