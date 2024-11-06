import Header from '@/components/header'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='min-h-screen container mx-auto flex flex-col'>
        <Header type="home" />
        <div className='flex-grow'>
          {children}
        </div>
    </main>
  )
}

export default HomeLayout