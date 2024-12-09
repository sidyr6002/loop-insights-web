import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Image from 'next/image';

const testimonialList = [
    {
        img: "/images/avatar1.jpg",
        name: "Aksay Kumar",
        designation: "Founder / CEO",
        comment:
            "This feedback widget has transformed how we gather customer insights. It's easy to integrate and the responses we get are invaluable!",
    },
    {
        img: "/images/avatar2.jpg",
        name: "Raima Ray",
        designation: "Co-Founder",
        comment:
            "The simplicity and effectiveness of this tool are impressive. Our customer engagement has increased significantly since we implemented it.",
    },
    {
        img: "/images/avatar3.jpg",
        name: "Arjun Kapur",
        designation: "Product Manager",
        comment:
            "We love how customizable the feedback widget is! It's a great way to connect with our users and improve our services based on their input.",
    },
    {
        img: "/images/avatar4.jpg",
        name: "Priya Singh",
        designation: "Marketing Director",
        comment:
            "The analytics provided by this widget help us understand our customers better. It’s a must-have for any business wanting to improve!",
    },
    {
        img: "/images/avatar5.jpg",
        name: "Vikram Sethi",
        designation: "Operations Head",
        comment:
            "A fantastic tool for capturing user feedback! Our team's efficiency in addressing customer concerns has never been better.",
    },
];

function Testimonials() {
  return (
    <section className='w-full px-4 my-36 space-y-16' id='testimonials'>
        <div className='text-center space-y-6'>
            <h3 className='text-md lg:text-lg xl:text-xl font-semibold text-gray-700'>Testimonials</h3>
            <h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900'>What our clients say</h2>
        </div>
        <div>
            <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
            >
                <CarouselContent className='px-1'>
                    {testimonialList.map((item, index) => (
                        <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                            <div className='flex flex-col items-start space-y-6'>
                                <div className='grid grid-cols-4 gap-6'>
                                    <div className='col-span-1'>
                                        <Image src={item.img} alt={`User-${item.name}`} height={48} width={48} className='w-12 h-12 object-cover rounded-full shadow-md shadow-zinc-800/60'/>
                                    </div>
                                    <div className='col-span-3'>
                                        <h4 className='text-lg font-bold text-gray-900'>{item.name}</h4>
                                        <span className='text-sm font-thin text-gray-600'>{item.designation}</span>
                                    </div>
                                </div>
                                <p className='text-md text-gray-700'>{item.comment}</p>
                            </div>

                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </section>
  )
}

export default Testimonials