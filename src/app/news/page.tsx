'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ErrorBoundary } from '@/components/error-boundary';
import { Loading, TableRowsLoading } from '@/components/loading';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  link: string;
  publishedAt: string;
  source: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  totalPages: number;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyword, setKeyword] = useState('');
  const [crawling, setCrawling] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    totalPages: 1
  });

  const fetchNews = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (keyword) params.append('keyword', keyword);
      params.append('page', page.toString());

      const response = await fetch(`/api/news?${params.toString()}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch news');
      }
      
      if (result.success) {
        setNews(result.data);
        setPagination(result.pagination);
      } else {
        throw new Error(result.error || 'Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const triggerCrawl = async () => {
    setCrawling(true);
    try {
      const response = await fetch('/api/crawl', { method: 'POST' });
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to crawl news');
      }
      
      if (result.success) {
        alert(`Successfully crawled ${result.count} news items`);
        fetchNews(1); // Refresh the news list from first page
      } else {
        throw new Error(result.error || 'Failed to crawl news');
      }
    } catch (error) {
      console.error('Error triggering crawl:', error);
      alert(error instanceof Error ? error.message : 'Failed to trigger crawl');
    } finally {
      setCrawling(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchNews(1);
    }
  };

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setKeyword('');
    fetchNews(1);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Pagi';
    if (hour < 15) return 'Siang';
    if (hour < 18) return 'Sore';
    return 'Malam';
  };

  const copyReport = () => {
    const timeOfDay = getTimeOfDay();
    const dateRange = startDate && endDate 
      ? `${format(new Date(startDate), 'dd/MM/yyyy')} - ${format(new Date(endDate), 'dd/MM/yyyy')}`
      : format(new Date(), 'dd/MM/yyyy');

    let report = `Assalamualaikum wr.wb,\n`;
    report += `Selamat ${timeOfDay},\n\n`;
    report += `Melaporkan Monitoring Berita Informasi terkait "${keyword || 'Semua Berita'}" Pada Tanggal ${dateRange} dengan hasil:\n\n`;

    news.forEach((item, index) => {
      report += `${index + 1}. ${format(new Date(item.publishedAt), 'dd/MM/yyyy')}, ${item.title}, ${item.link}\n`;
    });

    report += `\nKesimpulan:\n`;
    report += `Jumlah Berita Tentang "${keyword || 'Semua Berita'}" Berjumlah ${pagination.total}\n\n`;
    report += `Demikian Yang dapat dilaporkan Terimakasih.`;

    navigator.clipboard.writeText(report).then(() => {
      alert('Laporan berhasil disalin ke clipboard!');
    }).catch(() => {
      alert('Gagal menyalin laporan ke clipboard');
    });
  };

  useEffect(() => {
    fetchNews(1);
  }, []);

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="relative h-[200px] mb-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800">
            <div className="h-full flex flex-col justify-center px-8">
              <h1 className="text-4xl font-bold text-white mb-2">News Crawler</h1>
              <p className="text-gray-200">Berita terkini dari berbagai sumber</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tanggal Mulai</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tanggal Akhir</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Kata Kunci</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Cari berita..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => fetchNews(1)} 
                    disabled={loading}
                    className="whitespace-nowrap"
                  >
                    {loading ? 'Mencari...' : 'Filter'}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={resetFilters} disabled={loading} variant="secondary">
                Reset Filter
              </Button>
              <Button 
                onClick={triggerCrawl} 
                variant="outline"
                disabled={crawling}
              >
                {crawling ? 'Crawling...' : 'Crawl Berita Baru'}
              </Button>
              <Button
                onClick={copyReport}
                variant="outline"
                disabled={loading || news.length === 0}
              >
                Salin Laporan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-gray-600">
          {pagination.total > 0 ? (
            <p>
              Menampilkan {(pagination.page - 1) * 20 + 1} - {Math.min(pagination.page * 20, pagination.total)} dari total {pagination.total} berita
            </p>
          ) : (
            <p>Tidak ada berita ditemukan</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={() => fetchNews(pagination.page)}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* News Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Judul & Deskripsi</TableHead>
                  <TableHead className="w-1/6">Sumber</TableHead>
                  <TableHead className="w-1/6">Tanggal</TableHead>
                  <TableHead className="w-1/6">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRowsLoading />
                ) : news.length > 0 ? (
                  news.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{item.source}</TableCell>
                      <TableCell>
                        {format(new Date(item.publishedAt), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Buka
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      Tidak ada berita ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchNews(pagination.page - 1)}
                  disabled={pagination.page === 1 || loading}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchNews(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages || loading}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}
