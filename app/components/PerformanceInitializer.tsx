'use client';

import { useEffect } from 'react';

export default function PerformanceInitializer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateAvailableNotification();
              }
            });
          });
        } catch {
          // Keep startup silent when registration fails.
        }
      };

      window.addEventListener('load', registerServiceWorker, { once: true });
    }

    function handleOnline() {
      const offlineBanner = document.getElementById('offline-banner');
      if (offlineBanner) {
        offlineBanner.style.display = 'none';
      }
    }

    function handleOffline() {
      showOfflineBanner();
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null;
}

function showUpdateAvailableNotification() {
  // Create a subtle notification that an update is available
  const notification = document.createElement('div');
  notification.id = 'update-notification';
  notification.className = 'fixed bottom-4 left-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm';
  notification.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        <span class="text-sm font-medium">Update beschikbaar</span>
      </div>
      <button id="update-btn" class="bg-green-500 hover:bg-green-400 px-3 py-1 rounded text-sm font-medium ml-4">
        Vernieuwen
      </button>
      <button id="close-update" class="ml-3 text-green-200 hover:text-white">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;

  document.body.appendChild(notification);

  // Handle update button click
  const updateBtn = notification.querySelector('#update-btn');
  updateBtn?.addEventListener('click', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
      });
    }
  });

  // Handle close button
  const closeBtn = notification.querySelector('#close-update');
  closeBtn?.addEventListener('click', () => {
    notification.remove();
  });

  // Auto remove after 10 seconds
  setTimeout(() => {
    if (document.getElementById('update-notification')) {
      notification.remove();
    }
  }, 10000);
}

function showOfflineBanner() {
  // Don't show if already exists
  if (document.getElementById('offline-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'offline-banner';
  banner.className = 'fixed top-0 left-0 right-0 bg-yellow-600 text-white p-3 text-center z-50';
  banner.innerHTML = `
    <div class="flex items-center justify-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
      <span class="text-sm font-medium">Je bent offline. Sommige functies werken mogelijk niet.</span>
    </div>
  `;

  document.body.appendChild(banner);

  // Adjust body padding to account for banner
}
