import { Feedback } from '@prisma/client';
import Chance from 'chance';
import prisma from './prisma';

const chance = new Chance();

const projectId = '047ed6f7-5bdc-4b34-bdeb-953fc78a8bad';

const generateFeedbackData = async (count: number) => {
  const feedbackData: Omit<Feedback, 'id'>[] = [];
  
  for (let i = 0; i < count; i++) {
    const createdAt = new Date(chance.date({ year: 2024 }));
    const updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 1, max: 1000000 }));
    
    feedbackData.push({
      userName: chance.name(),
      userEmail: chance.email(),
      rating: chance.integer({ min: 1, max: 5 }),
      feedback: chance.sentence(), 
      createdAt,
      updatedAt,
      projectId
    });
  }

  await prisma.feedback.createMany({
    data: feedbackData,
  });
  
  console.log(`[generateFeedbackData] Generated ${count} feedback data`);
};

generateFeedbackData(600).catch((error) => console.error("[generateFeedbackData] Error: ", error)).then(() => prisma.$disconnect());