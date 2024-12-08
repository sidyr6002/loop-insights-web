// 'use client';

import React from 'react'
import { getProject } from '@/app/actions/projectActions'
import FeedbacksTable from '@/components/project/feedbacks/feebacks-table'
import ProjectHeader from '@/components/project/project-header'
import { TableStoreProvider } from '@/providers/table-store-provider';

interface ProjectFeedbacksPageParams {
    projectId: string
}

interface ProjectFeedbacksPageProps {
    params: ProjectFeedbacksPageParams
}  

const ProjectFeedbacksPage: React.FC<ProjectFeedbacksPageProps> = async ({params}) => {
    if (!params.projectId) {
        return <div className='w-full container mx-auto pt-4 flex-grow flex flex-col gap-4 overflow-auto'>
            <ProjectHeader projectTitle="Project" projectId="" projectURL="" />
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='text-3xl font-bold'>Project Id is not provided</h1>
            </div>
        </div>
    }

    const {project} = await getProject(params.projectId)

    if (!project) {
        return <div className='w-full container mx-auto pt-4 flex-grow flex flex-col gap-48 overflow-auto'>
            <ProjectHeader projectTitle="Project" projectId="" projectURL="" />
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='text-3xl font-bold text-red-600'>Project not found</h1>
                <p className='text-lg'>Project with ID: {params.projectId} not found.</p>
            </div>
        </div>
    }

    return (
      <TableStoreProvider>
        <div className='w-full container mx-auto pt-4 flex-grow flex flex-col gap-4 overflow-auto'>
            <ProjectHeader projectTitle={project.title} projectId={project.id} projectURL={project.url} />
            <FeedbacksTable projectId={project.id}/>
        </div>
      </TableStoreProvider>
    )
}

export default ProjectFeedbacksPage