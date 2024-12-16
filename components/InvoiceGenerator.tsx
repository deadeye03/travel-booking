"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface Booking {
    number: string;
    id: string;
    toursId: string;
    userName: string;
    price: number;
    travelers: number;
    email: string;
    cretedAt: Date;
    tours: {
        id: string;
        name: string;
        imageCover: string;
        difficulty: string;
        duration: number;
        summary: string;
        startLocation: {
            description: string;
        };
        startDates: Date[];
        locations: any[];
        maxGroupSize: number;
        price: number;
        ratingsAverage: number;
        ratingsQuantity: number;
    }
}

const InvoiceGenerator: React.FC<{ booking: Booking }> = ({ booking }) => {
    const generateInvoice = () => {
        const doc = new jsPDF()

        // Add company logo or name
        doc.setFontSize(20)
        doc.text('Natours Tour Agency', 105, 15, { align: 'center' })

        // Add invoice details
        doc.setFontSize(12)
        doc.text(`Invoice Number: ${booking.number}`, 20, 30)
        doc.text(`Date: ${new Date(booking.cretedAt).toLocaleDateString()}`, 20, 37)
        doc.text(`Customer: ${booking.userName}`, 20, 44)
        doc.text(`Email: ${booking.email}`, 20, 51)

        // Add tour details
        doc.setFontSize(16)
        doc.text('Tour Details', 20, 65)
        
        autoTable(doc, {
            startY: 70,
            head: [['Description', 'Details']],
            body: [
                ['Tour Name', booking.tours.name],
                ['Duration', `${booking.tours.duration} days`],
                ['Difficulty', booking.tours.difficulty],
                ['Start Location', booking.tours.startLocation.description],
                ['Start Date', new Date(booking.tours.startDates[0]).toLocaleDateString()],
                ['Group Size', `${booking.travelers} / ${booking.tours.maxGroupSize}`],
            ],
        })

        // Add pricing details
        const finalY = (doc as any).lastAutoTable.finalY || 70
        doc.setFontSize(16)
        doc.text('Pricing Details', 20, finalY + 15)

        autoTable(doc, {
            startY: finalY + 20,
            head: [['Item', 'Quantity', 'Price', 'Total']],
            body: [
                [
                    booking.tours.name,
                    booking.travelers.toString(),
                    `$${booking.tours.price.toFixed(2)}`,
                    `$${(booking.tours.price * booking.travelers).toFixed(2)}`,
                ],
                ['', '', 'Total', `$${booking.price.toFixed(2)}`],
            ],
        })

        // Add footer
        doc.setFontSize(10)
        doc.text('Thank you for your business!', 105, 280, { align: 'center' })

        // Save the PDF
        doc.save(`Invoice_${booking.number}.pdf`)
    }

    return (
        <Button onClick={generateInvoice}>Download Invoice</Button>
    )
}

export default InvoiceGenerator

