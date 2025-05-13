import { crawlAllNews } from './crawler';

let crawlInterval: NodeJS.Timeout;

export function startAutoCrawler() {
  // Initial crawl
  console.log('Starting auto crawler...');
  crawlAllNews().then(result => {
    console.log(`Initial crawl completed: ${result.count} items saved`);
  });

  // Set up 5-minute interval
  crawlInterval = setInterval(async () => {
    console.log('Running scheduled crawl...');
    try {
      const result = await crawlAllNews();
      console.log(`Scheduled crawl completed: ${result.count} items saved`);
    } catch (error) {
      console.error('Error in scheduled crawl:', error);
    }
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
}

export function stopAutoCrawler() {
  if (crawlInterval) {
    clearInterval(crawlInterval);
    console.log('Auto crawler stopped');
  }
}
