import { Button } from '@/components/ui/button'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import prisma from '@/lib/db'
import { addImage } from '@/actions/actions'
import ImageForm from '@/components/form/ImageForm'


export default async function Home() {
  
  const images = await prisma.image.findMany()

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-5'>
      <div className='text-4xl font-bold'>Images:</div>
      <div className='min-h-72 max-w-lg' >
        <Carousel>
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id}>
                <img src={`data:image/png;base64,${image.base64}`} alt='image' />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <ImageForm />
    </div>
    
  )
}