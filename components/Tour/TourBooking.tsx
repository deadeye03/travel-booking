'use client';
import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import React, { useState } from 'react'
import { DialogContent, DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type BookingProps = {
    IsOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    price: number
    imageCover: string,
    toursId: string,
}

function TourBooking({ IsOpen, setIsOpen, price, toursId }: BookingProps) {
    const router=useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [travelers, setTravelers] = useState<number>(1)
    const [loading, setLoading] = useState(false)
    const handleBooking = async (e: React.FormEvent) => {
        if (!name || !email || !number || travelers <1) {
            toast.error('Please fill all the fields');
            return;
        }
        else {
            setLoading(true)
            try {
                const data = {
                    name, email, number, travelers, toursId, price
                }
                const res = await fetch('/api/tours/book-tour', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const response = await res.json();
                if (response.status) {
                    toast.success(response.message);
                    setIsOpen(false);
                    router.push('/my-bookings');
                    
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.log('Unable to book tour', error);
                toast.error('Unable to book tour');
            }
        }
        setLoading(false)
    }





    return (
        <Dialog open={IsOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-semibold'>Tour Booking</DialogTitle>
                </DialogHeader>
                <form className='flex flex-col gap-4'>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Input type="text" id="name"
                            placeholder='Enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>
                    <div>
                        <label htmlFor="Email">Email</label>
                        <Input type="email" id="Email" placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="number">Phone number</label>
                        <Input type="number" id="number" placeholder='Enter your phone number'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="number">Number of travelers</label>
                        <Input type="number" id="number" placeholder='Enter number of people'
                            value={travelers}
                            onChange={(e) => setTravelers(Number(e.target.value))}
                        />
                    </div>
                    <div className='flex flex-1 gap-12'>
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button onClick={handleBooking} className='bg-blue-500 text-white hover:bg-blue-600 flex-1' disabled={loading} type='submit'>{loading ? 'Processing...' : `Pay ${price*travelers}`} </Button>
                    </div>
                </form>
            </DialogContent>

        </Dialog>


    )
}

export default TourBooking
