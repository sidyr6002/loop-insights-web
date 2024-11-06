import Features from '@/components/lading-page/features'
import Hero from '@/components/lading-page/hero'
import Pricing from '@/components/lading-page/pricing'
import Testimonials from '@/components/lading-page/testimonials'
import React from 'react'

function HomePage() {
  return (
    <div className='px-12 py-6'>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
    </div>
  )
}

export default HomePage