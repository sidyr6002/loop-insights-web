import React from 'react'
import { FaBolt, FaChartBar, FaChartLine, FaPalette, FaStopwatch, FaTools } from 'react-icons/fa'
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
    <div className='w-full flex flex-col my-36 space-y-16'>
        <div className='text-center space-y-6'>
            <h2 className='text-xl font-semibold text-gray-700'>Features</h2>
            <div className='flex flex-col items-center space-y-9'>
                <h3 className='text-4xl font-bold text-gray-900'>The premier choice for developers and businesses alike</h3>
                <p className='text-lg max-w-3xl text-gray-600'>With robust security features, real-time backup, and user-friendly interfaces, gives you the peace of mind that comes with reliable and efficient data management</p>
            </div>
        </div>
        <div className='w-full grid grid-cols-3 gap-6'>
            {featuresInfo.map((feature, index) => (
                <div key={index} className='span-col-1 flex flex-col items-center gap-y-6'>
                    <feature.icon className='w-9 h-9 fill-blue-600 hover:fill-zinc-800'/>
                    <div className='text-center space-y-6'>
                        <h4 className='text-lg font-semibold text-gray-700'>{feature.title}</h4>
                        <p className='text-md max-w-xs text-gray-500'>{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Features