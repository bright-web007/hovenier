import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^(\+31|0)\s?[1-9]\s?[0-9]{8}$/; // Dutch phone format
const postcodeRegex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i; // Dutch postcode format

// Base schemas for reusable fields
export const baseSchemas = {
  name: z.string()
    .min(2, 'Naam moet minimaal 2 karakters bevatten')
    .max(100, 'Naam mag niet langer dan 100 karakters zijn')
    .regex(/^[a-zA-Z\s\u00C0-\u017F]+$/, 'Naam mag alleen letters bevatten'),
  
  email: z.string()
    .email('Voer een geldig e-mailadres in')
    .min(5, 'E-mailadres is te kort')
    .max(254, 'E-mailadres is te lang'),
  
  phone: z.string()
    .regex(phoneRegex, 'Voer een geldig Nederlands telefoonnummer in (bijv. 06 12345678)'),
  
  postcode: z.string()
    .regex(postcodeRegex, 'Voer een geldige Nederlandse postcode in (bijv. 1234 AB)'),
  
  message: z.string()
    .min(10, 'Bericht moet minimaal 10 karakters bevatten')
    .max(2000, 'Bericht mag niet langer dan 2000 karakters zijn'),
  
  gemeente: z.string()
    .min(1, 'Selecteer een gemeente'),
  
  dienst: z.string()
    .min(1, 'Selecteer een dienst')
    .refine((val) => [
      'tuinonderhoud', 'tuinontwerp', 'tuin-aanleggen', 
      'stratenmaker', 'groendak', 'overig'
    ].includes(val), 'Selecteer een geldige dienst'),
  
  honeypot: z.string()
    .max(0, 'Suspicious activity detected'), // Should always be empty
  
  turnstileToken: z.string()
    .min(1, 'Verificatie is vereist'),
};

// New Lead Form Schema
export const newLeadFormSchema = z.object({
  naam: baseSchemas.name,
  email: baseSchemas.email,
  telefoon: baseSchemas.phone,
  gemeente: baseSchemas.gemeente,
  dienst: baseSchemas.dienst,
  bericht: z.string()
    .min(10, 'Beschrijf uw wensen (minimaal 10 karakters)')
    .max(1000, 'Bericht mag niet langer dan 1000 karakters zijn'),
  postcode: baseSchemas.postcode.optional(),
  bedrijf: z.string()
    .max(100, 'Bedrijfsnaam mag niet langer dan 100 karakters zijn')
    .optional(),
  honeypot: baseSchemas.honeypot,
  turnstileToken: baseSchemas.turnstileToken,
  privacy: z.boolean()
    .refine(val => val === true, 'U moet akkoord gaan met de privacyverklaring'),
});

// Contact Form Schema  
export const contactFormSchema = z.object({
  name: baseSchemas.name,
  email: baseSchemas.email,
  phone: baseSchemas.phone.optional(),
  subject: z.string()
    .min(5, 'Onderwerp moet minimaal 5 karakters bevatten')
    .max(100, 'Onderwerp mag niet langer dan 100 karakters zijn'),
  message: baseSchemas.message,
  company: z.string()
    .max(100, 'Bedrijfsnaam mag niet langer dan 100 karakters zijn')
    .optional(),
  honeypot: baseSchemas.honeypot,
  turnstileToken: baseSchemas.turnstileToken,
  privacy: z.boolean()
    .refine(val => val === true, 'U moet akkoord gaan met de privacyverklaring'),
});

// Generic Lead Form Schema (for simpler forms)
export const leadFormSchema = z.object({
  name: baseSchemas.name,
  email: baseSchemas.email,
  message: baseSchemas.message,
  honeypot: baseSchemas.honeypot,
  turnstileToken: baseSchemas.turnstileToken.optional(), // Some forms might not have Turnstile
  privacy: z.boolean()
    .refine(val => val === true, 'U moet akkoord gaan met de privacyverklaring'),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: baseSchemas.email,
  name: baseSchemas.name.optional(),
  honeypot: baseSchemas.honeypot,
  privacy: z.boolean()
    .refine(val => val === true, 'U moet akkoord gaan met de privacyverklaring'),
});

// Type exports for forms
export type NewLeadFormData = z.infer<typeof newLeadFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type LeadFormData = z.infer<typeof leadFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;

// Validation utility functions
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true as const,
      data: result.data,
      errors: null,
    };
  }
  
  return {
    success: false as const,
    data: null,
    errors: result.error.format(),
  };
};

// Helper to extract field errors for form display
export const getFieldError = (errors: any, fieldName: string): string | null => {
  if (!errors || !errors[fieldName]) return null;
  
  const fieldErrors = errors[fieldName];
  if (Array.isArray(fieldErrors._errors) && fieldErrors._errors.length > 0) {
    return fieldErrors._errors[0];
  }
  
  return null;
};

// Helper to check if form has any errors
export const hasFormErrors = (errors: any): boolean => {
  if (!errors) return false;
  
  return Object.keys(errors).some(key => {
    if (key === '_errors') return errors[key].length > 0;
    return errors[key] && typeof errors[key] === 'object';
  });
};

// Clean form data (remove empty strings, trim whitespace)
export const cleanFormData = (data: Record<string, any>): Record<string, any> => {
  const cleaned: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed !== '') {
        cleaned[key] = trimmed;
      }
    } else if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value;
    }
  }
  
  return cleaned;
};

// Dutch service options for validation
export const SERVICE_OPTIONS = [
  'tuinonderhoud',
  'tuinontwerp', 
  'tuin-aanleggen',
  'stratenmaker',
  'groendak',
  'overig'
] as const;