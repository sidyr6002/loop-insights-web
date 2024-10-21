
import Header from '@/components/header'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen w-full max-w-screen-xl mx-auto flex flex-col'>
        <Header />
        <main className='flex-grow'>
          {children}
        </main>
    </div>
  )
}

export default MainLayout