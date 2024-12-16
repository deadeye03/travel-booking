import { NextResponse } from 'next/server';
import prisma from '@/lib/utils/db';

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Content-Type must be application/json');
        }

        const body = await request.text();
        const data = JSON.parse(body);

        console.log('data is in add', data);

        if (!data || Object.keys(data).length === 0) {
            throw new Error('Request body is empty or invalid');
        }

        const createTour = await prisma.tours.create({
            data: {
                name: data.name || 'Utrakhand snow hills',
                duration: data.duration,
                maxGroupSize: data.maxGroupSize,
                difficulty: data.difficulty,
                ratingsAverage: data.ratingsAverage,
                ratingsQuantity: data.ratingsQuantity,
                price: data.price,
                summary: data.summary,
                description: data.description,
                startDates: data.startDate ? [new Date(data.startDate)] : [],
                imageCover: 'tour-2-cover.jpg',
                images: ['tour-2-1.jpg', 'tour-2-2.jpg', 'tour-2-3.jpg'],
            },
        });

        console.log('created Tour is ', createTour);
        return NextResponse.json({ status: true, data: createTour });
    } catch (error: any) {
        console.error('Unable to create tour', error);
        return NextResponse.json({ status: false, error: error.message }, { status: 400 });
    }
}

