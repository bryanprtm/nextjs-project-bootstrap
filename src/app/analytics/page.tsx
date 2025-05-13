'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/error-boundary';
import { Loading } from '@/components/loading';

interface SourceStat {
  source: string;
  count: number;
}

interface Trend {
  word: string;
  count: number;
}

interface AnalyticsData {
  totalNews: number;
  sourceStats: SourceStat[];
  trends: Trend[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analytics');
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch analytics');
      }
      
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading && !data) {
    return <Loading />;
  }

  if (error || !data) {
    return (
      <div className="container mx-auto p-6">
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          <p>{error || 'Failed to load analytics data'}</p>
          <button 
            onClick={fetchAnalytics}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="relative h-[200px] mb-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800">
            <div className="h-full flex flex-col justify-center px-8">
              <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
              <p className="text-gray-200">Analisis dan tren berita</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Total News */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium">Total Berita</h3>
              <p className="text-2xl font-bold mt-1">{data.totalNews}</p>
            </CardContent>
          </Card>

          {/* Top Source */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium">Sumber Terbanyak</h3>
              <p className="text-2xl font-bold mt-1 capitalize">
                {data.sourceStats[0]?.source || 'N/A'}
              </p>
              <p className="text-sm mt-1">
                {data.sourceStats[0]?.count || 0} artikel
              </p>
            </CardContent>
          </Card>

          {/* Top Trend */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium">Kata Kunci Terpopuler</h3>
              <p className="text-2xl font-bold mt-1">
                {data.trends[0]?.word || 'N/A'}
              </p>
              <p className="text-sm mt-1">
                Muncul {data.trends[0]?.count || 0} kali
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Source Statistics */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Statistik Sumber Berita</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.sourceStats.map((stat) => (
                <div
                  key={stat.source}
                  className="p-4 rounded-lg bg-gray-50"
                >
                  <h3 className="text-sm font-medium capitalize">{stat.source}</h3>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-sm text-gray-500">artikel</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Kata Kunci Terpopuler</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.trends.map((trend) => (
                <div
                  key={trend.word}
                  className="p-4 rounded-lg bg-gray-50"
                >
                  <h3 className="text-sm font-medium">{trend.word}</h3>
                  <p className="text-2xl font-bold">{trend.count}</p>
                  <p className="text-sm text-gray-500">kemunculan</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}
