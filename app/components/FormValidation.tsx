import React from 'react';

interface ErrorMessageProps {
  error: string | null;
  fieldName: string;
  className?: string;
}

export function ErrorMessage({ error, fieldName, className = '' }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div 
      id={`${fieldName}-error`}
      className={`text-red-600 text-sm mt-1 ${className}`}
      role="alert"
      aria-live="polite"
    >
      {error}
    </div>
  );
}

interface FormFieldProps {
  children: React.ReactNode;
  error?: string | null | undefined;
  fieldName: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export function FormField({ 
  children, 
  error, 
  fieldName, 
  label, 
  required = false,
  className = ''
}: FormFieldProps) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label 
          htmlFor={fieldName}
          className={`form-label ${error ? 'text-red-600' : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      <ErrorMessage error={error || null} fieldName={fieldName} />
    </div>
  );
}

interface FormErrorSummaryProps {
  errors: any;
  title?: string;
  className?: string;
}

export function FormErrorSummary({ 
  errors, 
  title = "Er zijn fouten opgetreden:",
  className = ''
}: FormErrorSummaryProps) {
  if (!errors) return null;

  const errorList: string[] = [];
  
  const collectErrors = (obj: any, prefix = '') => {
    Object.keys(obj).forEach(key => {
      if (key === '_errors' && Array.isArray(obj[key])) {
        errorList.push(...obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        collectErrors(obj[key], prefix ? `${prefix}.${key}` : key);
      }
    });
  };

  collectErrors(errors);

  if (errorList.length === 0) return null;

  return (
    <div 
      className={`bg-red-50 border border-red-200 rounded-md p-4 mb-4 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg 
            className="h-5 w-5 text-red-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {errorList.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading spinner component for forms
export function FormLoadingSpinner({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <svg 
      className={`animate-spin ${sizeClasses[size]} text-current`}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}