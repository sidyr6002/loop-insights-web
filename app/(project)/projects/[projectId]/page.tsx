import FeedbacksTable from '@/components/project/feedbacks/feebacks-table'
import ProjectHeader from '@/components/project/project-header'
import prisma from '@/lib/prisma'
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

    return (
        <div className='w-full container mx-auto pt-4 flex-grow flex flex-col gap-4 overflow-auto'>
            <ProjectHeader projectTitle={project.title} projectId={project.id} projectURL={project.url} />
            <FeedbacksTable projectId={project.id}/>
        </div>
    )
}

export default ProjectFeedbacksPage