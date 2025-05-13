'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-6 max-w-sm mx-auto">
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
              <p className="text-sm text-red-600">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
