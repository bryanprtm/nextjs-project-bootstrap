import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get the date range for the last 7 days
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const [
      totalNews,
      sourceStats,
      dailyStats,
      recentTrends
    ] = await Promise.all([
      // Total news count
      prisma.news.count(),

      // News count by source
      prisma.news.groupBy({
        by: ['source'],
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        }
      }),

      // Daily news count for the last 7 days
      prisma.news.groupBy({
        by: ['publishedAt'],
        where: {
          publishedAt: {
            gte: lastWeek
          }
        },
        _count: {
          id: true
        },
        orderBy: {
          publishedAt: 'asc'
        }
      }),

      // Recent news for trend analysis
      prisma.news.findMany({
        where: {
          publishedAt: {
            gte: lastWeek
          }
        },
        orderBy: {
          publishedAt: 'desc'
        },
        take: 100
      })
    ]);

    // Process daily stats into a more usable format
    const dailyNewsCounts = dailyStats.map(stat => ({
      date: stat.publishedAt,
      count: stat._count.id
    }));

    // Process source stats
    const sourceNewsCounts = sourceStats.map(stat => ({
      source: stat.source,
      count: stat._count.id
    }));

    // Extract common words from titles for trend analysis
    const commonWords = recentTrends
      .map(news => news.title.toLowerCase().split(' '))
      .flat()
      .filter(word => word.length > 3) // Filter out short words
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    // Sort words by frequency
    const trends = Object.entries(commonWords)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    return NextResponse.json({
      success: true,
      data: {
        totalNews,
        sourceStats: sourceNewsCounts,
        dailyStats: dailyNewsCounts,
        trends
      }
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
