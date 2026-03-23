/**
 * @deprecated This component is deprecated. Use LocalBusinessSchema from '../StructuredData' instead.
 * 
 * This old component has been replaced by a centralized business configuration system
 * that ensures consistent LocalBusiness schema across all pages.
 * 
 * Old usage:
 * import LocalBusinessSchema from '../components/schemas/LocalBusinessSchema'
 * 
 * New usage:
 * import { LocalBusinessSchema } from '../components/StructuredData'
 * import { getBusinessConfig } from '@/lib/business-config'
 * 
 * For service pages, use:
 * <LocalBusinessSchema 
 *   serviceType="groendak" // or "stratenmaker", "tuinonderhoud", etc.
 *   url="https://hovenier.frl/page-url"
 * />
 * 
 * For general pages, use:
 * <LocalBusinessSchema 
 *   url="https://hovenier.frl/page-url"
 *   nameContext="Custom Context"  // optional
 *   services={["Custom", "Services"]}  // optional
 * />
 */

export default function LocalBusinessSchemaDeprecated() {
  console.warn('LocalBusinessSchema from schemas/LocalBusinessSchema.tsx is deprecated. Use LocalBusinessSchema from StructuredData.tsx instead.');
  return null;
}