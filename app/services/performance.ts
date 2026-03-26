// Performance optimization utilities for Core Web Vitals
// Implements best practices for LCP, CLS, INP improvements

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload Google Fonts (using link preconnect instead of local fonts)
  
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com', 
    'https://www.google-analytics.com',
    'https://challenges.cloudflare.com'
  ];

  preconnectDomains.forEach(domain => {
    const existingLink = document.querySelector(`link[href="${domain}"][rel="preconnect"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
}

// Lazy load images with intersection observer
export function setupImageLazyLoading() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Find all lazy images
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// Optimize loading of third-party scripts
export function loadThirdPartyScript(src: string, defer = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = defer;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

// Measure Core Web Vitals
export function measureCoreWebVitals() {
  if (typeof window === 'undefined') return;

  // Track CLS (Cumulative Layout Shift)
  let clsValue = 0;
  let clsEntries: any[] = [];

  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const layoutShiftEntry = entry as any; // Cast to avoid TS error since hadRecentInput exists on layout-shift entries
      if (!layoutShiftEntry.hadRecentInput) {
        const firstSessionEntry = clsEntries[0];
        const lastSessionEntry = clsEntries[clsEntries.length - 1];

        if (clsEntries.length === 0 || entry.startTime - lastSessionEntry.startTime < 1000) {
          clsEntries.push(entry);
        } else {
          clsValue = Math.max(clsValue, clsEntries.reduce((sum, e) => sum + (e as any).value, 0));
          clsEntries = [entry];
        }
      }
    }

    clsValue = Math.max(clsValue, clsEntries.reduce((sum, e) => sum + (e as any).value, 0));
    
    console.log('CLS:', clsValue);
    
    // Send to analytics if consent given
    if (window.gtag && checkAnalyticsConsent()) {
      window.gtag('event', 'web-vital', {
        event_category: 'performance',
        event_label: 'CLS',
        value: Math.round(clsValue * 1000)
      });
    }
  });

  observer.observe({ type: 'layout-shift', buffered: true });

  // Track LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    const lcpValue = lastEntry.startTime;
    
    console.log('LCP:', lcpValue);
    
    if (window.gtag && checkAnalyticsConsent()) {
      window.gtag('event', 'web-vital', {
        event_category: 'performance',
        event_label: 'LCP',
        value: Math.round(lcpValue)
      });
    }
  });

  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

  // Track FID (First Input Delay) / INP (Interaction to Next Paint)
  const fidObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const firstEntry = entries[0] as any; // Cast to avoid TS error
    const fidValue = firstEntry.processingStart - firstEntry.startTime;
    
    console.log('FID:', fidValue);
    
    if (window.gtag && checkAnalyticsConsent()) {
      window.gtag('event', 'web-vital', {
        event_category: 'performance',
        event_label: 'FID',
        value: Math.round(fidValue)
      });
    }
  });

  fidObserver.observe({ type: 'first-input', buffered: true });
}

// Check analytics consent (imported function)
function checkAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie_consent_preferences');
    if (consent) {
      const preferences = JSON.parse(consent);
      return preferences.analytics === true;
    }
  } catch (error) {
    console.warn('Error checking analytics consent:', error);
  }
  
  return false;
}

// Critical CSS inlining (for above-the-fold content)
export const criticalCSS = `
  /* Critical styles for above-the-fold content */
  .hero-section {
    min-height: 70vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #2d5016 0%, #3d601d 100%);
  }
  
  .hero-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    color: white;
    line-height: 1.1;
  }
  
  .hero-subtitle {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    color: rgba(255,255,255,0.9);
    margin-top: 1rem;
  }
  
  .btn-primary {
    background: #4f7829;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    transition: background 0.3s ease;
  }
  
  .btn-primary:hover {
    background: #3a5a1e;
  }
  
  /* Prevent layout shift */
  .image-placeholder {
    background: #f0f4e8;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
  
  /* Loading states */
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// Resource hints component
export function generateResourceHints() {
  return `
    <!-- DNS prefetch -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//www.google-analytics.com" />
    
    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    
    <!-- Prefetch next page resources -->
    <link rel="prefetch" href="/diensten/tuinonderhoud" />
    <link rel="prefetch" href="/regio/leeuwarden" />
    
    <!-- Critical CSS inline -->
    <style>${criticalCSS}</style>
  `;
}

// Initialize performance optimizations
export function initializePerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      setupImageLazyLoading();
      measureCoreWebVitals();
    });
  } else {
    preloadCriticalResources();
    setupImageLazyLoading();
    measureCoreWebVitals();
  }

  // Service worker registration for caching
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  }
}

export default {
  preloadCriticalResources,
  setupImageLazyLoading,
  loadThirdPartyScript,
  measureCoreWebVitals,
  initializePerformanceOptimizations,
  generateResourceHints
};
