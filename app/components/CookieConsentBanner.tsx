'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { updateAnalyticsConsent } from './GoogleAnalytics';
import styles from './CookieConsentBanner.module.css';

interface CookieConsentProps {
  locale?: string;
}

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

type ConsentSnapshot = {
  consentGiven: boolean;
  preferences: ConsentPreferences;
};

const SERVER_CONSENT_SNAPSHOT: ConsentSnapshot = {
  consentGiven: false,
  preferences: defaultPreferences,
};

let currentConsentSnapshot: ConsentSnapshot = SERVER_CONSENT_SNAPSHOT;

function arePreferencesEqual(left: ConsentPreferences, right: ConsentPreferences) {
  return (
    left.necessary === right.necessary &&
    left.analytics === right.analytics &&
    left.marketing === right.marketing &&
    left.preferences === right.preferences
  );
}

function getCurrentConsentSnapshot(): ConsentSnapshot {
  const nextSnapshot: ConsentSnapshot = {
    consentGiven: Boolean(localStorage.getItem('cookie_consent_given')),
    preferences: parseStoredPreferences(localStorage.getItem('cookie_consent_preferences')),
  };

  if (
    currentConsentSnapshot.consentGiven === nextSnapshot.consentGiven &&
    arePreferencesEqual(currentConsentSnapshot.preferences, nextSnapshot.preferences)
  ) {
    return currentConsentSnapshot;
  }

  currentConsentSnapshot = nextSnapshot;
  return currentConsentSnapshot;
}

function subscribeToConsentStore(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === 'cookie_consent_given' ||
      event.key === 'cookie_consent_preferences'
    ) {
      currentConsentSnapshot = getCurrentConsentSnapshot();
      onStoreChange();
    }
  };

  const handleConsentChange = () => {
    currentConsentSnapshot = getCurrentConsentSnapshot();
    onStoreChange();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener('cookie-consent-changed', handleConsentChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('cookie-consent-changed', handleConsentChange);
  };
}

function parseStoredPreferences(value: string | null): ConsentPreferences {
  if (!value) {
    return defaultPreferences;
  }

  try {
    const parsed = JSON.parse(value) as Partial<ConsentPreferences>;
    return {
      necessary: true,
      analytics: parsed.analytics ?? false,
      marketing: parsed.marketing ?? false,
      preferences: parsed.preferences ?? false,
    };
  } catch {
    return defaultPreferences;
  }
}

const CookieConsentBanner: React.FC<CookieConsentProps> = ({ locale = 'nl' }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pendingPreferences, setPendingPreferences] = useState<ConsentPreferences | null>(null);

  const storedConsent = useSyncExternalStore(
    subscribeToConsentStore,
    getCurrentConsentSnapshot,
    () => SERVER_CONSENT_SNAPSHOT
  );

  const preferences = pendingPreferences ?? storedConsent.preferences;
  const showBanner = !dismissed && !storedConsent.consentGiven;

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    saveConsent(allAccepted);
    initializeServices(allAccepted);
    setDismissed(true);
  };

  const handleDeclineAll = () => {
    const onlyNecessary: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    saveConsent(onlyNecessary);
    initializeServices(onlyNecessary);
    setDismissed(true);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    initializeServices(preferences);
    setDismissed(true);
  };

  const saveConsent = (prefs: ConsentPreferences) => {
    localStorage.setItem('cookie_consent_given', 'true');
    localStorage.setItem('cookie_consent_preferences', JSON.stringify(prefs));
    localStorage.setItem('cookie_consent_timestamp', new Date().toISOString());
    
    // Set consent cookie for server-side access
    document.cookie = `cookie_consent=${JSON.stringify(prefs)}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new Event('cookie-consent-changed'));
  };

  const initializeServices = (prefs: ConsentPreferences) => {
    // Update Google Analytics consent state for the lightweight loader.
    updateAnalyticsConsent(prefs.analytics);
    window.dispatchEvent(new CustomEvent('marketing-consent-changed', {
      detail: { granted: prefs.marketing },
    }));
    
    // Initialize other services based on consent
    console.log('Cookie consent preferences updated:', prefs);
  };

  const handlePreferenceChange = (type: keyof ConsentPreferences, value: boolean) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    setPendingPreferences((prev) => ({
      ...prev,
      ...(prev ?? preferences),
      [type]: value
    }));
  };

  const translations = {
    nl: {
      title: 'Cookie Voorkeuren',
      description: 'We gebruiken cookies om uw ervaring te verbeteren en onze diensten te analyseren. U kunt uw voorkeuren hieronder aanpassen.',
      acceptAll: 'Alles Accepteren',
      declineAll: 'Alleen Noodzakelijke',
      savePreferences: 'Voorkeuren Opslaan',
      customize: 'Aanpassen',
      backToBasic: 'Terug',
      necessary: 'Noodzakelijke Cookies',
      analytics: 'Analytische Cookies',
      marketing: 'Marketing Cookies', 
      preferences: 'Voorkeur Cookies',
      necessaryDesc: 'Deze cookies zijn nodig voor de basisfunctionaliteit van de website.',
      analyticsDesc: 'Helpen ons te begrijpen hoe bezoekers onze website gebruiken via Google Analytics.',
      marketingDesc: 'Gebruikt voor gerichte reclame en het volgen van conversies.',
      preferencesDesc: 'Onthouden uw voorkeuren zoals taal en regio-instellingen.',
      cookiePolicy: 'Cookie Beleid',
      privacyPolicy: 'Privacy Beleid'
    },
    en: {
      title: 'Cookie Preferences',
      description: 'We use cookies to improve your experience and analyze our services. You can adjust your preferences below.',
      acceptAll: 'Accept All',
      declineAll: 'Only Necessary',
      savePreferences: 'Save Preferences',
      customize: 'Customize',
      backToBasic: 'Back',
      necessary: 'Necessary Cookies',
      analytics: 'Analytics Cookies',
      marketing: 'Marketing Cookies',
      preferences: 'Preference Cookies',
      necessaryDesc: 'These cookies are required for basic website functionality.',
      analyticsDesc: 'Help us understand how visitors use our website via Google Analytics.',
      marketingDesc: 'Used for targeted advertising and conversion tracking.',
      preferencesDesc: 'Remember your preferences like language and region settings.',
      cookiePolicy: 'Cookie Policy',
      privacyPolicy: 'Privacy Policy'
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.nl;

  if (!showBanner) return null;

  return (
    <div className={styles.cookieConsentOverlay}>
      <div className={styles.cookieConsentBanner}>
        <div className={styles.cookieConsentContent}>
          {!showDetails ? (
            // Basic consent banner
            <div className={styles.cookieConsentBasic}>
              <div className={styles.cookieConsentText}>
                <h3 className={styles.cookieConsentTitle}>{t.title}</h3>
                <p className={styles.cookieConsentDescription}>{t.description}</p>
              </div>
              <div className={styles.cookieConsentActions}>
                <button 
                  onClick={handleAcceptAll}
                  className={`${styles.cookieConsentBtn} ${styles.cookieConsentBtnPrimary}`}
                >
                  {t.acceptAll}
                </button>
                <button 
                  onClick={handleDeclineAll}
                  className={`${styles.cookieConsentBtn} ${styles.cookieConsentBtnSecondary}`}
                >
                  {t.declineAll}
                </button>
                <button 
                  onClick={() => setShowDetails(true)}
                  className={`${styles.cookieConsentBtn} ${styles.cookieConsentBtnOutline}`}
                >
                  {t.customize}
                </button>
              </div>
              <div className={styles.cookieConsentLinks}>
                <Link href="/privacy-beleid" className={styles.cookieConsentLink}>{t.privacyPolicy}</Link>
                <span>•</span>
                <Link href="/cookie-beleid" className={styles.cookieConsentLink}>{t.cookiePolicy}</Link>
              </div>
            </div>
          ) : (
            // Detailed preferences
            <div className={styles.cookieConsentDetails}>
              <div className={styles.cookieConsentHeader}>
                <h3 className={styles.cookieConsentTitle}>{t.title}</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className={styles.cookieConsentBack}
                >
                  ← {t.backToBasic}
                </button>
              </div>
              <div className={styles.cookieConsentCategories}>
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <label className="cookie-category-label">
                      <input 
                        type="checkbox" 
                        checked={preferences.necessary}
                        disabled={true}
                        className="cookie-category-checkbox"
                      />
                      <span className="cookie-category-name">{t.necessary}</span>
                      <span className="cookie-category-required">(Vereist)</span>
                    </label>
                  </div>
                  <p className="cookie-category-description">{t.necessaryDesc}</p>
                </div>
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <label className="cookie-category-label">
                      <input 
                        type="checkbox" 
                        checked={preferences.analytics}
                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                        className="cookie-category-checkbox"
                      />
                      <span className="cookie-category-name">{t.analytics}</span>
                    </label>
                  </div>
                  <p className="cookie-category-description">{t.analyticsDesc}</p>
                </div>
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <label className="cookie-category-label">
                      <input 
                        type="checkbox" 
                        checked={preferences.marketing}
                        onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                        className="cookie-category-checkbox"
                      />
                      <span className="cookie-category-name">{t.marketing}</span>
                    </label>
                  </div>
                  <p className="cookie-category-description">{t.marketingDesc}</p>
                </div>
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <label className="cookie-category-label">
                      <input 
                        type="checkbox" 
                        checked={preferences.preferences}
                        onChange={(e) => handlePreferenceChange('preferences', e.target.checked)}
                        className="cookie-category-checkbox"
                      />
                      <span className="cookie-category-name">{t.preferences}</span>
                    </label>
                  </div>
                  <p className="cookie-category-description">{t.preferencesDesc}</p>
                </div>
              </div>
              <div className={styles.cookieConsentActions}>
                <button 
                  onClick={handleSavePreferences}
                  className={`${styles.cookieConsentBtn} ${styles.cookieConsentBtnPrimary}`}
                >
                  {t.savePreferences}
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className={`${styles.cookieConsentBtn} ${styles.cookieConsentBtnSecondary}`}
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
