"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Difficulty } from '@/type'
import toast from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'

type Tour = {
  id: string;
  name: string
  duration: number
  maxGroupSize: number
  difficulty: 'easy' | 'medium' | 'hard'
  ratingsAverage: number
  ratingsQuantity: number
  price: number
  summary: string
  description: string
  startDate: Date | null
}

export default function SimpleTourForm({ tour }: { tour?: Tour }) {
  const router = useRouter();
  const pathName = usePathname();
  const addTours = pathName.split('/')[2];
  const [name, setName] = useState(tour?.name || '')
  const [duration, setDuration] = useState(tour?.duration || 0)
  const [maxGroupSize, setMaxGroupSize] = useState(tour?.maxGroupSize || 0)
  const [difficulty, setDifficulty] = useState(tour?.difficulty || 'medium')
  const [ratingsAverage, setRatingsAverage] = useState(tour?.ratingsAverage || 0)
  const [ratingsQuantity, setRatingsQuantity] = useState(tour?.ratingsQuantity || 0)
  const [price, setPrice] = useState(tour?.price || 0)
  const [summary, setSummary] = useState(tour?.summary || '')
  const [description, setDescription] = useState(tour?.description || '')
  const [startDate, setStartDate] = useState<Date | undefined>(tour?.startDate || undefined)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      ratingsAverage,
      ratingsQuantity,
      price,
      summary,
      description,
      startDate,
    }
    console.log("Form data:", formData)
    if (addTours === 'add-tours') {

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/add-tours`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.status) {
        toast.success('Tour added successfully');
        router.push('/admin/dashboard');
      }
      else {        
        toast.error('Failed to add tour');
      }
    }
    else {

      if (!tour?.id) {
        toast.error('Please define id')
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${tour?.id}`, {
        method: "PATCH",
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.status) {
        toast.success('Tour updated successfully');
        router.push('/admin/dashboard');
      }
      else {
        toast.error('Failed to update tour');
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-[76px]">
      <CardHeader>
        <CardTitle>{addTours==='add-tours'?'Add':'Edit'} Tour Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name">Name <span className='text-red-500'>*</span></label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tour Name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration">Duration <span className='text-red-500'>*</span></label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder="Duration (days)"
                required
              />
            </div>
            <div>
              <label htmlFor="maxGroupSize">Max Group Size <span className='text-red-500'>*</span></label>
              <Input
                id="maxGroupSize"
                type="number"
                value={maxGroupSize}
                onChange={(e) => setMaxGroupSize(Number(e.target.value))}
                placeholder="Max Group Size"
              />
            </div>
          </div>

          <div>
            <label htmlFor="difficulty">Difficulty <span className='text-red-500'>*</span></label>
            <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="ratingsAverage">Average Rating <span className='text-red-500'>*</span></label>
              <Input
                id="ratingsAverage"
                type="number"
                step="0.1"
                value={ratingsAverage}
                onChange={(e) => setRatingsAverage(Number(e.target.value))}
                placeholder="Average Rating"
              />
            </div>
            <div>
              <label htmlFor="ratingsQuantity">Number of Ratings <span className='text-red-500'>*</span></label>
              <Input
                id="ratingsQuantity"
                type="number"
                value={ratingsQuantity}
                onChange={(e) => setRatingsQuantity(Number(e.target.value))}
                placeholder="Number of Ratings"
              />
            </div>
          </div>

          <div>
            <label htmlFor="price">Price <span className='text-red-500'>*</span></label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
            />
          </div>

          <div>
            <label htmlFor="summary">Summary <span className='text-red-500'>*</span></label>
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary"
            />
          </div>

          <div>
            <label htmlFor="description">Description <span className='text-red-500'>*</span></label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className='min-h-40'
            />
          </div>

          <div>
            <label htmlFor="startDate">Start Date <span className='text-red-500'>*</span></label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!startDate && "text-muted-foreground"
                    }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP') : <span>Pick a start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full">{addTours==='add-tours'?'Add Tour':'Update Tour'}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

