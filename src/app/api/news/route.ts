import { NextResponse } from 'next/server';
import { getFilteredNews } from '@/lib/crawler';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const keyword = searchParams.get('keyword');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const skip = (page - 1) * limit;

    const [news, total] = await getFilteredNews({
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      keyword: keyword || undefined,
      skip,
      limit
    });

    return NextResponse.json({ 
      success: true, 
      data: news,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error in /api/news endpoint:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
