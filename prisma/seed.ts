import { Feedback, PrismaClient } from '@prisma/client';
import Chance from 'chance';

const prisma = new PrismaClient();
const chance = new Chance();

const projectId = '7ad87ef0-c075-4480-a53e-875cb67f5044';

const generateFeedbackData = async () => {
  const feedbackData: Omit<Feedback, 'id'>[] = [];

  for (let i = 0; i < 600; i++) {
    const createdAt = new Date(chance.date({ year: 2024 }));
    const updatedAt = new Date(createdAt.getTime() + chance.integer({ min: 1, max: 1000000 }));

    feedbackData.push({
      userName: chance.name(),
      userEmail: chance.email(),
      rating: chance.integer({ min: 1, max: 5 }),
      feedback: chance.sentence(),
      createdAt,
      updatedAt,
      projectId,
    });
  }

  await prisma.feedback.createMany({
    data: feedbackData,
  });

  console.log(`[generateFeedbackData] Generated 600 feedback data`);
};

// Run the seed scrip

generateFeedbackData()
  .catch((e) => {
    console.error('[Seed Script Error]:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
