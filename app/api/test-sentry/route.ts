import { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testType = searchParams.get('type');

  try {
    switch (testType) {
      case 'error':
        throw new Error('Test Sentry error handling - this is intentional');
        
      case 'warning':
        Sentry.captureMessage('Test Sentry warning message', 'warning');
        return Response.json({ 
          status: 'success', 
          message: 'Warning logged to Sentry'
        });
        
      case 'info':
        Sentry.captureMessage('Test Sentry info message', 'info');
        return Response.json({ 
          status: 'success', 
          message: 'Info logged to Sentry'
        });
        
      default:
        return Response.json({
          status: 'success',
          message: 'Sentry test endpoint active',
          availableTests: ['error', 'warning', 'info'],
          usage: 'Add ?type=error|warning|info to test different Sentry features'
        });
    }
  } catch (error) {
    // Let Sentry capture the error automatically
    Sentry.captureException(error);
    
    return Response.json({
      status: 'error',
      message: 'Error successfully captured by Sentry',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}