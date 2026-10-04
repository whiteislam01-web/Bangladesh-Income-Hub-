/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  isPlaceholder: boolean;
  hasUrl: boolean;
  hasAnonKey: boolean;
  urlError?: string;
  keyError?: string;
  missing: string[];
  message: string;
}

/**
 * Validates Supabase environment variables on client startup
 * Reports clear diagnostic information without exposing sensitive values.
 */
export function validateClientSupabaseConfig(): SupabaseConfigStatus {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

  const missing: string[] = [];
  if (!url) missing.push('VITE_SUPABASE_URL');
  if (!anonKey) missing.push('VITE_SUPABASE_ANON_KEY');

  const isPlaceholder = 
    url.includes('placeholder') || 
    url.includes('your-project') || 
    anonKey.includes('placeholder') ||
    anonKey.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

  let urlError: string | undefined;
  if (url && !isPlaceholder) {
    try {
      const parsed = new URL(url);
      if (!parsed.protocol.startsWith('http')) {
        urlError = 'VITE_SUPABASE_URL must begin with https:// or http://';
      }
    } catch {
      urlError = 'VITE_SUPABASE_URL is not a valid URL format';
    }
  }

  let keyError: string | undefined;
  if (anonKey && !isPlaceholder && anonKey.length < 20) {
    keyError = 'VITE_SUPABASE_ANON_KEY appears too short to be a valid Supabase key';
  }

  const isConfigured = missing.length === 0 && !isPlaceholder && !urlError && !keyError;

  let message = 'Supabase environment is active and connected.';
  if (missing.length > 0) {
    message = `Missing required environment variables: ${missing.join(', ')}. Running in offline/local storage fallback mode.`;
  } else if (isPlaceholder) {
    message = 'Supabase environment variables contain placeholder values. Please set real credentials in your deployment environment.';
  } else if (urlError || keyError) {
    message = `Configuration validation error: ${urlError || keyError}.`;
  }

  return {
    isConfigured,
    isPlaceholder,
    hasUrl: Boolean(url),
    hasAnonKey: Boolean(anonKey),
    urlError,
    keyError,
    missing,
    message
  };
}
