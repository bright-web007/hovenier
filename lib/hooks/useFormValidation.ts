import { useState, useCallback } from 'react';
import { z } from 'zod';
import { validateForm as validateWithSchema, getFieldError, hasFormErrors, cleanFormData, type FormErrors } from '../validation';

interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (errors: FormErrors) => void;
  validateOnChange?: boolean;
  cleanData?: boolean;
}

interface FormValidationState {
  errors: FormErrors;
  isValid: boolean;
  isValidating: boolean;
  hasSubmitted: boolean;
}

export function useFormValidation<T>({
  schema,
  onSuccess,
  onError,
  validateOnChange = false,
  cleanData = true,
}: UseFormValidationOptions<T>) {
  const [validationState, setValidationState] = useState<FormValidationState>({
    errors: null,
    isValid: true,
    isValidating: false,
    hasSubmitted: false,
  });

  // Validate individual field
  const validateField = useCallback((fieldName: string, value: unknown) => {
    try {
      // For individual field validation, create a full object with current value
      // and validate just that field from the full validation result
      const testObject = { [fieldName]: value };
      const result = schema.safeParse(testObject);
      
      if (result.success || !result.error.issues) {
        // Clear error for this field
        setValidationState(prev => ({
          ...prev,
          errors: prev.errors ? {
            ...prev.errors,
            [fieldName]: undefined
          } : null,
        }));
        return null;
      } 
      
      // Find issues specific to this field
      const fieldIssues = result.error.issues.filter(issue => 
        issue.path.includes(fieldName)
      );
      
      if (fieldIssues.length === 0) {
        // No issues for this field, clear any previous errors
        setValidationState(prev => ({
          ...prev,
          errors: prev.errors ? {
            ...prev.errors,
            [fieldName]: undefined
          } : null,
        }));
        return null;
      }
      
      const fieldError = fieldIssues[0].message;
      
      // Set error for this field
      setValidationState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [fieldName]: { _errors: [fieldError] }
        },
      }));
      return fieldError;
      
    } catch {
      // If validation fails completely, ignore for individual field validation
      return null;
    }
  }, [schema]);

  // Validate entire form
  const validate = useCallback((data: Record<string, unknown>) => {
    setValidationState(prev => ({ ...prev, isValidating: true }));
    
    const processedData = cleanData ? cleanFormData(data) : data;
    const result = validateWithSchema(schema, processedData);
    
    setValidationState(prev => ({
      ...prev,
      errors: result.errors,
      isValid: result.success,
      isValidating: false,
    }));

    return result;
  }, [schema, cleanData]);

  // Handle form submission
  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    setValidationState(prev => ({ 
      ...prev, 
      hasSubmitted: true,
      isValidating: true 
    }));
    
    const result = validate(data);
    
    if (result.success) {
      try {
        await onSuccess?.(result.data);
      } catch {
        // Silent error handling
      }
    } else {
      onError?.(result.errors);
    }
    
    setValidationState(prev => ({ ...prev, isValidating: false }));
    
    return result;
  }, [validate, onSuccess, onError]);

  // Handle field change with optional validation
  const handleFieldChange = useCallback((fieldName: string, value: unknown) => {
    if (validateOnChange || validationState.hasSubmitted) {
      validateField(fieldName, value);
    }
  }, [validateField, validateOnChange, validationState.hasSubmitted]);

  // Get error for specific field
  const getError = useCallback((fieldName: string): string | null => {
    return getFieldError(validationState.errors, fieldName);
  }, [validationState.errors]);

  // Check if specific field has error
  const hasError = useCallback((fieldName: string): boolean => {
    return getError(fieldName) !== null;
  }, [getError]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setValidationState(prev => ({
      ...prev,
      errors: null,
      isValid: true,
    }));
  }, []);

  // Clear specific field error
  const clearFieldError = useCallback((fieldName: string) => {
    setValidationState(prev => ({
      ...prev,
      errors: prev.errors ? {
        ...prev.errors,
        [fieldName]: undefined
      } : null,
    }));
  }, []);

  return {
    // State
    errors: validationState.errors,
    isValid: validationState.isValid,
    isValidating: validationState.isValidating,
    hasSubmitted: validationState.hasSubmitted,
    hasAnyErrors: hasFormErrors(validationState.errors),

    // Methods  
    validateField,
    validateForm: validate,
    handleSubmit,
    handleFieldChange,
    getError,
    hasError,
    clearErrors,
    clearFieldError,
  };
}

// Hook specifically for form input handling with validation
export function useValidatedInput(
  name: string,
  initialValue: string = '',
  validator?: (value: string) => string | null
) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback((val: string) => {
    if (!validator) return null;
    
    const err = validator(val);
    setError(err);
    return err;
  }, [validator]);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    if (touched && validator) {
      validate(newValue);
    }
  }, [touched, validator, validate]);

  const handleBlur = useCallback(() => {
    setTouched(true);
    if (validator) {
      validate(value);
    }
  }, [validator, validate, value]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    value,
    error,
    touched,
    hasError: error !== null,
    setValue,
    handleChange,
    handleBlur,
    clearError,
    validate: () => validate(value),
    
    // Props object for easy spreading onto inputs
    inputProps: {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleChange(e.target.value),
      onBlur: handleBlur,
      'aria-invalid': error !== null,
      'aria-describedby': error ? `${name}-error` : undefined,
    }
  };
}