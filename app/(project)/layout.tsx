import React from 'react'

const ProjectsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-svh flex flex-col w-full'>
        {children}
    </div>
  )
}

export default ProjectsLayout