'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface RssFeed {
  id: number;
  name: string;
  url: string;
  category: string;
  active: boolean;
  createdAt: string;
}

export default function FeedsPage() {
  const [feeds, setFeeds] = useState<RssFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchFeeds = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/feeds');
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch feeds');
      }
      
      if (result.success) {
        setFeeds(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch feeds');
      }
    } catch (error) {
      console.error('Error fetching feeds:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addFeed = async () => {
    if (!name || !url || !category) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/feeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, url, category }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to add feed');
      }
      
      if (result.success) {
        setName('');
        setUrl('');
        setCategory('');
        fetchFeeds();
      } else {
        throw new Error(result.error || 'Failed to add feed');
      }
    } catch (error) {
      console.error('Error adding feed:', error);
      setError(error instanceof Error ? error.message : 'Failed to add feed');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFeed = async (id: number, active: boolean) => {
    try {
      const response = await fetch('/api/feeds', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, active: !active }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update feed');
      }
      
      if (result.success) {
        fetchFeeds();
      } else {
        throw new Error(result.error || 'Failed to update feed');
      }
    } catch (error) {
      console.error('Error updating feed:', error);
      alert(error instanceof Error ? error.message : 'Failed to update feed');
    }
  };

  const deleteFeed = async (id: number) => {
    if (!confirm('Are you sure you want to delete this feed?')) {
      return;
    }

    try {
      const response = await fetch(`/api/feeds?id=${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete feed');
      }
      
      if (result.success) {
        fetchFeeds();
      } else {
        throw new Error(result.error || 'Failed to delete feed');
      }
    } catch (error) {
      console.error('Error deleting feed:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete feed');
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  if (loading && !feeds.length) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="relative h-[120px] mb-6 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800">
            <div className="h-full flex flex-col justify-center px-8">
              <h1 className="text-3xl font-bold text-white">RSS Feeds</h1>
              <p className="text-sm text-gray-300">Kelola sumber berita RSS</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={fetchFeeds}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Add Feed Form */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama</label>
                <Input
                  type="text"
                  placeholder="Nama sumber"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">URL</label>
                <Input
                  type="url"
                  placeholder="URL RSS feed"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <Input
                  type="text"
                  placeholder="Kategori"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                onClick={addFeed}
                disabled={submitting || !name || !url || !category}
                size="sm"
              >
                {submitting ? 'Menambahkan...' : 'Tambah Feed'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feeds Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRowsLoading />
                ) : feeds.length > 0 ? (
                  feeds.map((feed) => (
                    <TableRow key={feed.id}>
                      <TableCell className="font-medium">{feed.name}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        <a 
                          href={feed.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {feed.url}
                        </a>
                      </TableCell>
                      <TableCell>{feed.category}</TableCell>
                      <TableCell>
                        <Button
                          variant={feed.active ? "default" : "secondary"}
                          size="sm"
                          onClick={() => toggleFeed(feed.id, feed.active)}
                        >
                          {feed.active ? 'Aktif' : 'Nonaktif'}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {format(new Date(feed.createdAt), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteFeed(feed.id)}
                        >
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Tidak ada RSS feed
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}
