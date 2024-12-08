import React from 'react'
import { FaBolt, FaChartBar, FaChartLine, FaStopwatch, FaTools } from 'react-icons/fa'
import { FaGears } from 'react-icons/fa6'

const featuresInfo = [
    {
        title: 'Effortless Integration',
        description: 'Add our widget to your website with just a single script library link. No complicated setups, just straightforward results.',
        icon: FaTools
    },
    {
        title: 'Real-Time Feedback',
        description: 'Receive instant feedback from users as they interact with your website. Stay ahead of issues and understand user sentiment in real time.',
        icon: FaStopwatch
    },
    {
        title: 'Customizable Widgets',
        description: "Tailor the feedback widgets to match your site's design and branding. Seamlessly blend functionality with your unique aesthetic.",
        icon: FaGears
    },
    {
        title: 'Detailed Analytics',
        description: 'Transform raw feedback into actionable insights with our powerful analytics tools. Identify trends, monitor satisfaction, and drive continuous improvement.',
        icon: FaChartLine
    },
    {
        title: 'Centralized Dashboard',
        description : 'Dashboard All your feedback in one place. Our intuitive dashboard allows you to easily view, sort, and manage feedback from every corner of your site.',
        icon: FaChartBar
    },
    {
        title: 'Light and fast',
        description: 'The package is designed to be as light and fast as possible. It is also compatible with all major web browsers.',
        icon: FaBolt
    }
]

function Features() {
  return (
    <section className='w-full my-36 space-y-16' id='features'>
        <div className='text-center space-y-6'>
            <h3 className='text-md lg:text-lg xl:text-xl font-semibold text-gray-700'>Features</h3>
            <div className='flex flex-col items-center space-y-9'>
                <h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900'>The premier choice for developers and businesses alike</h2>
                <p className='text-sm lg:text-md xl:text-lg max-w-3xl text-gray-600'>With robust security features, real-time backup, and user-friendly interfaces, gives you the peace of mind that comes with reliable and efficient data management</p>
            </div>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuresInfo.map((feature, index) => (
                <div key={index} className='span-col-1 flex flex-col items-center gap-y-2 sm:gap-y-6 sm:bg-gray-50 p-6 sm:p-8 cursor-pointer sm:rounded-2xl sm:shadow-md sm:shadow-neutral-400/40 sm:hover:bg-transparent sm:hover:shadow-none transition ease-out group'>
                    <feature.icon className='w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 fill-blue-600 lg:group-hover:animate-tilt lg:transition-transform lg:duration-500'/>
                    <div className='text-center space-y-6'>
                        <h4 className='text-sm lg:text-md xl:text-lg font-semibold text-zinc-700'>{feature.title}</h4>
                        <p className='text-xs lg:text-sm xl:text-md max-w-xs text-zinc-500'>{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Features