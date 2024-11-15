import React from 'react'

const StripeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-svh bg-zinc-300 flex items-center justify-center p-4 sm:p-9 lg:p-16">
        {children}
    </div>
  )
}

export default StripeLayout