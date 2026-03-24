/**
 * Integration Tests for Next.js App Router Runtime Issues
 * 
 * These tests catch server/client boundary violations that Jest alone cannot detect.
 * They test against actual Next.js build output and runtime behavior.
 */

import { execSync } from 'child_process';
import fetch from 'node-fetch';

describe('Next.js App Router Integration Tests', () => {
  let serverProcess: any;
  const baseURL = 'http://localhost:3000';
  
  beforeAll(async () => {
    // Build the application
    console.log('Building Next.js application...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Start the server (you'd need to implement proper server management)
    // For now, assume dev server is running
  }, 30000);

  afterAll(() => {
    // Clean up server process
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  describe('Server Component Violations', () => {
    test('kosten page should not return 500 errors due to onClick handlers', async () => {
      const response = await fetch(`${baseURL}/nl/kosten`);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('text/html');
      
      const html = await response.text();
      // Should not contain Next.js error messages
      expect(html).not.toContain('Event handlers cannot be passed to Client Component props');
      expect(html).not.toContain('Application error: a server-side exception has occurred');
    });

    test('all service cost pages should load without Server Component violations', async () => {
      const costPages = [
        '/nl/kosten',
        '/nl/kosten/tuinonderhoud', 
        '/nl/kosten/groendak',
        '/nl/kosten/tuin-aanleggen'
      ];

      for (const page of costPages) {
        const response = await fetch(`${baseURL}${page}`);
        expect(response.status).toBe(200);
        
        const html = await response.text();
        expect(html).not.toContain('Event handlers cannot be passed to Client Component props');
      }
    });
  });

  describe('Client Component Boundaries', () => {
    test('interactive elements should be properly wrapped in Client Components', async () => {
      const response = await fetch(`${baseURL}/nl/kosten`);
      const html = await response.text();
      
      // Check that calculator CTA and FAQ are present (indicating Client Components work)
      expect(html).toContain('Vraag gratis offerte aan');
      expect(html).toContain('Wat kost een hovenier');
    });
  });
});