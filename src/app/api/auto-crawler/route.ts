import { NextResponse } from 'next/server';
import { startAutoCrawler, stopAutoCrawler } from '@/lib/auto-crawler';

let crawlerStarted = false;

export async function GET() {
  try {
    if (!crawlerStarted) {
      startAutoCrawler();
      crawlerStarted = true;
      return NextResponse.json({
        success: true,
        message: 'Auto crawler started'
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Auto crawler is already running'
      });
    }
  } catch (error) {
    console.error('Error starting auto crawler:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to start auto crawler' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    stopAutoCrawler();
    crawlerStarted = false;
    return NextResponse.json({
      success: true,
      message: 'Auto crawler stopped'
    });
  } catch (error) {
    console.error('Error stopping auto crawler:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to stop auto crawler' },
      { status: 500 }
    );
  }
}
