import React from 'react'
import { Button } from '../ui/button'

function Hero() {
  return (
    <div className='w-full grid grid-cols-7 my-28 lg:my-36'>
        <div className='col-span-7 xl:col-span-4 flex flex-col justify-center items-center xl:items-start gap-y-8 lg:gap-y-9'>
            <h2 className='text-lg lg:text-xl xl:text-2xl font-semibold text-center xl:text-left text-gray-700'>Transform Your User Feedback Experience</h2>
            <h1 className='text-4xl lg:text-5xl text-center xl:text-left xl:text-6xl font-bold text-gray-900'>
                Feedback Widgets for {' '} <br className='hidden lg:block'/>
                <span className='text-blue-600 lg:text-zinc-400/40 relative'>
                    Your Application
                    <span className='hidden lg:block lg:absolute top-0 left-0 translate-x-0.5 -translate-y-0.5 text-blue-600 z-20'>Your Application</span>
                </span> 
            </h1>
            <p className='text-sm lg:text-md xl:text-lg text-center xl:text-left text-gray-600'>
                Effortlessly gather, manage, and analyze user feedback with our intuitive and customizable widgets, all in one place.
            </p>
            <div className='flex space-x-4 mt-6'>
                <Button className='rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300'>Get Started</Button>
                <Button className='rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-300'>View on GitHub</Button>
            </div>
        </div>
        <div className='hidden xl:block xl:col-span-3 bg-green-500'>
            Col2
        </div>
    </div>
  )
}

export default Hero