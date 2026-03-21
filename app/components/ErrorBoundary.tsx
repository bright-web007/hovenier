'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import * as Sentry from '@sentry/nextjs';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack
        }
      },
      tags: {
        section: 'react_error_boundary'
      }
    });
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback && this.state.error) {
        return <Fallback error={this.state.error} retry={this.retry} />;
      }
      
      return <DefaultErrorFallback error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, retry }: { error?: Error; retry: () => void }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Er is iets misgegaan
        </h2>
        
        <p className="text-gray-600 mb-6">
          We hebben een onverwachte fout gedetecteerd. Ons team is op de hoogte gesteld.
        </p>
        
        <div className="space-x-3">
          <button
            onClick={retry}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Opnieuw proberen
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Pagina herladen
          </button>
        </div>
        
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto text-red-600">
              {error.stack || error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default ErrorBoundary;