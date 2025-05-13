import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const feeds = await prisma.rssFeed.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: feeds
    });
  } catch (error) {
    console.error('Feeds API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feeds' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, url, category } = body;

    if (!name || !url || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const feed = await prisma.rssFeed.create({
      data: {
        name,
        url,
        category
      }
    });

    return NextResponse.json({
      success: true,
      data: feed
    });
  } catch (error) {
    console.error('Feeds API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create feed' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, active } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing feed ID' },
        { status: 400 }
      );
    }

    const feed = await prisma.rssFeed.update({
      where: { id },
      data: { active }
    });

    return NextResponse.json({
      success: true,
      data: feed
    });
  } catch (error) {
    console.error('Feeds API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update feed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing feed ID' },
        { status: 400 }
      );
    }

    await prisma.rssFeed.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('Feeds API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete feed' },
      { status: 500 }
    );
  }
}
