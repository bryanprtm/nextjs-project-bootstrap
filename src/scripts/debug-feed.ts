const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function debugCreateFeed() {
  try {
    console.log('Attempting to create feed...');
    
    const feed = await prisma.rssFeed.create({
      data: {
        name: 'Test Feed',
        url: 'https://test.com/feed',
        category: 'test',
      },
    });
    
    console.log('Feed created successfully:', feed);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Detailed error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error('Unknown error:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

debugCreateFeed();
