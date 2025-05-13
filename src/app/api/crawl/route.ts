import { NextResponse } from 'next/server';
import { crawlAllNews } from '@/lib/crawler';

export async function POST() {
  try {
    const result = await crawlAllNews();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in /api/crawl endpoint:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
