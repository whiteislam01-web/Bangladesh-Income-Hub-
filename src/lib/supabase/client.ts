/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { validateClientSupabaseConfig } from './validation';

const configStatus = validateClientSupabaseConfig();

// Read only from client environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

// Log startup diagnostics once
if (!configStatus.isConfigured) {
  console.info(`[BDIH Supabase Layer] Notice: ${configStatus.message}`);
} else {
  console.info('[BDIH Supabase Layer] Connected to Supabase environment successfully.');
}

/**
 * Client-side Supabase instance using publishable anon key ONLY.
 * Never pass service_role / secret keys here.
 */
export const supabaseClient: SupabaseClient | null = configStatus.isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const isSupabaseReady = (): boolean => Boolean(supabaseClient && configStatus.isConfigured);
export const getSupabaseConfigStatus = () => configStatus;
