import { getFeedbacks } from '@/app/actions/feedbackActions'
import { feedbackColumns } from '@/components/project/feedbacks/columns'
import FeedbacksTable from '@/components/project/feedbacks/feebacks-table'
import ProjectHeader from '@/components/project/project-header'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface ProjectFeedbacksPageParams {
    projectId: string
}

interface ProjectFeedbacksPageProps {
    params: ProjectFeedbacksPageParams
}  

const ProjectFeedbacksPage: React.FC<ProjectFeedbacksPageProps> = async ({params}) => {
    if (!params.projectId)
        return <div>Project not found</div>
      
    // const searchParams = useSearchParams()  

    const project = await prisma.project.findUnique({
        where: {
            id: params.projectId,
        }
    })

    if (!project)
        return <div>Project not found</div>
      
    // const page = parseInt(searchParams.get('page') ?? '1')
    // const pageSize = parseInt(searchParams.get('pageSize') ?? '10')

    // const feedbacks = await getFeedbacks({projectId: params.projectId, page, pageSize})

    return (
        <div className='w-full container mx-auto pt-4 flex-grow flex flex-col gap-4 overflow-auto'>
            <ProjectHeader projectTitle={project.title} projectId={project.id} projectURL={project.url} />
            <FeedbacksTable projectId={params.projectId}/>
        </div>
    )
}

export default ProjectFeedbacksPage