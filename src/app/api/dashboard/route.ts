import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { startOfDay } from 'date-fns';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Database connected successfully');

    console.log('Fetching total news count...');
    const totalNews = await prisma.news.count();
    console.log('Total news count:', totalNews);

    // Get today's news count
    const todayStart = startOfDay(new Date());
    const todayNews = await prisma.news.count({
      where: {
        publishedAt: {
          gte: todayStart
        }
      }
    });

    // Get active sources count
    const activeSources = await prisma.rssFeed.count({
      where: {
        active: true
      }
    });

    // Get recent news with descriptions
    const recentNews = await prisma.news.findMany({
      orderBy: {
        publishedAt: 'desc'
      },
      take: 5,
      select: {
        title: true,
        source: true,
        publishedAt: true,
        link: true
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalNews,
        todayNews,
        activeSources,
        recentNews
      }
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    let errorMessage = 'Failed to fetch dashboard data';
    
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      errorMessage = `Database error: ${error.message}`;
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
