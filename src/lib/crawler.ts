import { PrismaClient, News, Prisma } from '@prisma/client';
import { XMLParser } from 'fast-xml-parser';

const prisma = new PrismaClient();
const parser = new XMLParser();

interface NewsItem {
  title: string;
  description: string;
  link: string;
  publishedAt: string;
  source: string;
}

async function fetchNewsFromRSS(url: string, source: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}`);
    }
    const xmlText = await response.text();
    const data = parser.parse(xmlText);
    
    // Handle RSS feed structure
    let items: any[] = [];
    if (data?.rss?.channel?.item) {
      items = Array.isArray(data.rss.channel.item) 
        ? data.rss.channel.item 
        : [data.rss.channel.item];
      console.log(`Found ${items.length} items from ${url}`);
    } else {
      console.warn(`Unexpected RSS structure from ${url}`);
      return [];
    }

    console.log(`Processing ${items.length} items from ${source}`);

    // Map RSS items to our NewsItem interface
    const newsItems: NewsItem[] = items.map(item => ({
      title: item.title || 'No Title',
      description: item.description?.replace(/<[^>]*>/g, '') || // Remove HTML tags
                  item['content:encoded']?.replace(/<[^>]*>/g, '') || '',
      link: item.link || item.guid || '',
      publishedAt: item.pubDate || new Date().toISOString(),
      source: source
    })).filter(item => item.link && item.title !== 'No Title');

    return newsItems;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return [];
  }
}

export async function crawlAllNews() {
  try {
    let totalSaved = 0;

    // Get active RSS feeds from database
    const feeds = await prisma.rssFeed.findMany({
      where: {
        active: true
      }
    });

    if (feeds.length === 0) {
      console.log('No active RSS feeds found');
      return { success: true, count: 0 };
    }

    for (const feed of feeds) {
      console.log(`\nProcessing feed: ${feed.name} (${feed.url})`);
      const newsItems = await fetchNewsFromRSS(feed.url, feed.name);
      console.log(`Retrieved ${newsItems.length} news items from ${feed.name}`);
      
      for (const item of newsItems) {
        try {
          const result = await prisma.news.upsert({
            where: { link: item.link },
            update: {}, // Don't update if exists
            create: {
              title: item.title,
              description: item.description,
              link: item.link,
              publishedAt: new Date(item.publishedAt),
              source: item.source,
            },
          });
          console.log(`Saved/Updated news: "${item.title.substring(0, 50)}..."`);
          totalSaved++;
        } catch (error) {
          console.error(`Error saving news item:`, error);
          console.error('Failed item:', JSON.stringify(item, null, 2));
        }
      }
    }

    return { success: true, count: totalSaved };
  } catch (error) {
    console.error('Error in crawlAllNews:', error);
    return { success: false, error: String(error) };
  }
}

interface FilterParams {
  startDate?: string;
  endDate?: string;
  keyword?: string;
  skip?: number;
  limit?: number;
}

export async function getFilteredNews(params: FilterParams): Promise<[News[], number]> {
  const { startDate, endDate, keyword, skip = 0, limit = 20 } = params;
  
  const where: Prisma.NewsWhereInput = {};
  
  if (startDate || endDate) {
    where.publishedAt = {};
    if (startDate) {
      where.publishedAt.gte = new Date(startDate);
    }
    if (endDate) {
      where.publishedAt.lte = new Date(endDate);
    }
  }
  
  if (keyword) {
    where.title = {
      contains: keyword
    };
  }
  
  const [news, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: {
        publishedAt: 'desc'
      },
      skip,
      take: limit
    }),
    prisma.news.count({ where })
  ]);
  
  return [news, total];
}
