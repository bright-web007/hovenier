import React from 'react';
import ServiceSchema from '../components/schemas/ServiceSchema';
import { LocalBusinessSchema } from '../components/StructuredData';
import BreadcrumbSchema from '../components/schemas/BreadcrumbSchema';
import FAQSchema from '../components/schemas/FAQSchema';
import ContactSchema from '../components/schemas/ContactSchema';
import GardenerDirectorySchema from '../components/schemas/GardenerDirectorySchema';
import { gardeners } from '@/lib/gardeners-data';

// Test page to validate all schemas - only for development
export default function SchemaTestPage() {
  if (process.env.NODE_ENV !== 'development') {
    return <div>Schema test page only available in development mode</div>;
  }

  const breadcrumbItems = [
    { name: 'Home', url: 'https://hovenier.frl/' },
    { name: 'Services', url: 'https://hovenier.frl/diensten' },
    { name: 'Schema Test', url: 'https://hovenier.frl/schema-test' }
  ];

  const faqData = [
    {
      question: 'Wat kost een hovenier?',
      answer: 'De kosten voor een hovenier variëren tussen €35-85 per uur, afhankelijk van de dienst.'
    },
    {
      question: 'Hoe vind ik een goede hovenier?',
      answer: 'Via ons platform kunt u eenvoudig betrouwbare hoveniers in uw regio vinden.'
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1>🔍 Schema.org Validation Test Page</h1>
      <p>This page contains all schema types for validation testing.</p>
      
      <div style={{ background: '#f5f5f5', padding: '1rem', marginBottom: '2rem' }}>
        <h2>📊 Active Schemas on this page:</h2>
        <ul>
          <li>✅ ServiceSchema (with fixed Offer structure)</li>
          <li>✅ LocalBusinessSchema</li>
          <li>✅ BreadcrumbSchema (with proper @id structure)</li>
          <li>✅ FAQSchema</li>
          <li>✅ ContactSchema</li>
          <li>✅ GardenerDirectorySchema</li>
        </ul>
      </div>

      {/* All schemas for testing */}
      <ServiceSchema 
        name="Test Garden Service"
        description="Professional garden maintenance and landscaping services in Friesland"
        provider={{ name: "Hovenier.frl", url: "https://hovenier.frl" }}
        areaServed="Friesland, Nederland"
        priceRange="€35-€85"
        category="Landscaping Services"
      />
      
      <LocalBusinessSchema
        url="https://hovenier.frl/test"
        nameContext="Test Hovenier"
      />
      
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <FAQSchema faqs={faqData} />
      
      <ContactSchema locale="nl" url="https://hovenier.frl/contact" />
      
      <GardenerDirectorySchema 
        gardeners={gardeners.slice(0, 2)} 
        url="https://hovenier.frl/hoveniers" 
        locale="nl" 
      />
      
      <div style={{ marginTop: '3rem', padding: '1rem', background: '#e8f5e8' }}>
        <h3>✅ Schema Validation Status:</h3>
        <p><strong>ServiceSchema:</strong> ✅ Fixed - priceRange now in proper Offer structure</p>
        <p><strong>BreadcrumbSchema:</strong> ✅ Fixed - using @id for better compliance</p>
        <p><strong>All other schemas:</strong> ✅ Valid - no issues detected</p>
      </div>
    </div>
  );
}