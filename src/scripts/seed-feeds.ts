import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const feeds = [
    {
      name: 'CNN Indonesia',
      url: 'https://www.cnnindonesia.com/nasional/rss',
      category: 'news'
    },
    {
      name: 'Detik News',
      url: 'https://rss.detik.com/index.php/detikcom',
      category: 'news'
    },
    {
      name: 'Tempo News',
      url: 'https://rss.tempo.co/nasional',
      category: 'news'
    }
  ];

  console.log('Seeding RSS feeds...');
  
  for (const feed of feeds) {
    await prisma.rss_feed.create({
      data: feed
    });
    console.log(`Added feed: ${feed.name}`);
  }

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
