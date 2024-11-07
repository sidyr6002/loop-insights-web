import { feedbackColumns } from '@/components/project/feedbacks/columns'
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

export const feedbackData = [
    {
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      rating: 5,
      feedback: 'Excellent service! Very satisfied with the product.',
      createdAt: new Date('2024-01-01T12:00:00'),
    },
    {
      userName: 'Jane Smith',
      userEmail: 'jane.smith@example.com',
      rating: 4,
      feedback: 'Great product, but could use some improvements in the user interface.',
      createdAt: new Date('2024-01-02T09:00:00'),
    },
    {
      userName: 'Alice Johnson',
      userEmail: 'alice.johnson@example.com',
      rating: 3,
      feedback: 'The product works, but the setup process was a bit difficult.',
      createdAt: new Date('2024-01-03T11:30:00'),
    },
    {
      userName: 'Bob Brown',
      userEmail: 'bob.brown@example.com',
      rating: 2,
      feedback: 'The product does not meet my expectations. Needs more features.',
      createdAt: new Date('2024-01-04T15:00:00'),
    },
    {
      userName: 'Eve White',
      userEmail: 'eve.white@example.com',
      rating: 1,
      feedback: 'Very disappointed. The product stopped working after a week.',
      createdAt: new Date('2024-01-05T08:00:00'),
    },
    {
      userName: 'Charlie Green',
      userEmail: 'charlie.green@example.com',
      rating: 5,
      feedback: 'Fantastic experience. I love the features and ease of use.',
      createdAt: new Date('2024-01-06T10:00:00'),
    },
    {
      userName: 'David Lee',
      userEmail: 'david.lee@example.com',
      rating: 4,
      feedback: 'Good product, but the setup instructions could be clearer.',
      createdAt: new Date('2024-03-07T09:45:00'),
    },
    {
      userName: 'Sophia Harris',
      userEmail: 'sophia.harris@example.com',
      rating: 3,
      feedback: 'Decent, but I feel it could be more user-friendly.',
      createdAt: new Date('2024-01-08T14:30:00'),
    },
    {
      userName: 'Michael Clark',
      userEmail: 'michael.clark@example.com',
      rating: 5,
      feedback: 'Absolutely amazing! Exceeded all my expectations.',
      createdAt: new Date('2024-01-09T16:00:00'),
    },
    {
      userName: 'Olivia Lewis',
      userEmail: 'olivia.lewis@example.com',
      rating: 2,
      feedback: 'Not what I expected. It needs more functionality.',
      createdAt: new Date('2024-01-10T12:00:00'),
    },
    {
      userName: 'Liam Young',
      userEmail: 'liam.young@example.com',
      rating: 4,
      feedback: 'Very good, but I had some minor issues with installation.',
      createdAt: new Date('2024-01-11T10:15:00'),
    },
    {
      userName: 'Amelia Walker',
      userEmail: 'amelia.walker@example.com',
      rating: 3,
      feedback: 'The performance is okay, but the UI is quite clunky.',
      createdAt: new Date('2024-01-12T08:30:00'),
    },
    {
      userName: 'James Scott',
      userEmail: 'james.scott@example.com',
      rating: 5,
      feedback: 'Highly recommended! It works flawlessly and is easy to use.',
      createdAt: new Date('2024-01-13T11:00:00'),
    },
    {
      userName: 'Lucas King',
      userEmail: 'lucas.king@example.com',
      rating: 2,
      feedback: 'Not worth the price. I expected better quality.',
      createdAt: new Date('2024-01-14T13:00:00'),
    },
    {
      userName: 'Mia Martinez',
      userEmail: 'mia.martinez@example.com',
      rating: 4,
      feedback: 'Great value for money. I would buy again!',
      createdAt: new Date('2024-01-15T09:30:00'),
    },
  ];
  
  

const ProjectFeedbacksPage: React.FC<ProjectFeedbacksPageProps> = async ({params}) => {
    if (!params.projectId)
        return <div>Project not found</div>

    const project = await prisma.project.findUnique({
        where: {
            id: params.projectId
        },
        include: {
            feedbacks: true
        }
    })

    if (!project)
        return <div>Project not found</div>

    return (
        <div className='w-full max-w-6xl mx-auto flex-grow flex flex-col gap-4'>
            <ProjectHeader projectTitle={project.title} projectDescription={project.description} />
            <FeedbacksTable columns={feedbackColumns} data={feedbackData}/>
        </div>
    )
}

export default ProjectFeedbacksPage