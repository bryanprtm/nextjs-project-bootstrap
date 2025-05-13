'use client';

import { useEffect } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Start auto-crawler when app loads
    fetch('/api/auto-crawler')
      .then(res => res.json())
      .then(data => {
        console.log('Auto-crawler status:', data.message);
      })
      .catch(error => {
        console.error('Failed to start auto-crawler:', error);
      });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link 
                  href="/" 
                  className="text-xl font-bold"
                >
                  News Crawler
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link 
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/news"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  News
                </Link>
                <Link 
                  href="/analytics"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  Analytics
                </Link>
                <Link 
                  href="/feeds"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  RSS Feeds
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
