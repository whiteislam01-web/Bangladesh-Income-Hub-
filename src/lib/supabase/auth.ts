/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabaseClient } from './client';
import { AuthUser, UserRole, UserPermission } from '../../types';
import { getRolePermissions } from '../auth/rbac';

/**
 * Sign in with Google OAuth via Supabase Auth with PKCE and safe return path
 */
export async function signInWithGoogle(returnUrl = '/account') {
  if (!supabaseClient) {
    return { 
      data: null, 
      error: new Error('Supabase client is not configured. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.') 
    };
  }

  // Ensure safe internal return path (prevent open redirect attacks)
  const safeNext = (returnUrl.startsWith('/') && !returnUrl.startsWith('//')) ? returnUrl : '/account';
  const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`;

  try {
    return await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Sign in with Email and Password
 */
export async function signInWithPassword(email: string, pass: string) {
  if (!supabaseClient) {
    return { data: null, error: new Error('Supabase client is not configured.') };
  }
  return await supabaseClient.auth.signInWithPassword({
    email: email.trim(),
    password: pass,
  });
}

/**
 * Register a new Student account (Always defaults to CUSTOMER role)
 */
export async function signUpWithPassword(email: string, pass: string, fullName?: string) {
  if (!supabaseClient) {
    return { data: null, error: new Error('Supabase client is not configured.') };
  }
  return await supabaseClient.auth.signUp({
    email: email.trim(),
    password: pass,
    options: {
      data: {
        full_name: fullName?.trim() || '',
        // Client cannot grant itself owner/admin privileges
        role: 'CUSTOMER',
      },
    },
  });
}

/**
 * Sign out of current session
 */
export async function signOut() {
  if (!supabaseClient) return { error: null };
  return await supabaseClient.auth.signOut();
}

/**
 * Retrieve active session
 */
export async function getCurrentSession() {
  if (!supabaseClient) return null;
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    console.warn('[BDIH Auth] Session retrieval error:', error.message);
    return null;
  }
  return data.session;
}

/**
 * Authoritatively resolves user role and permissions from database
 * Deny-by-default: defaults to CUSTOMER
 */
export async function resolveAuthoritativeRole(userId: string, email: string): Promise<{ role: UserRole; permissions: UserPermission[] }> {
  const normalizedEmail = email.toLowerCase().trim();

  // Authoritative server-level owner identity
  if (normalizedEmail === 'owner@bdih.com') {
    return { role: 'OWNER', permissions: getRolePermissions('OWNER') };
  }
  if (normalizedEmail === 'admin@bdih.com') {
    return { role: 'ADMIN', permissions: getRolePermissions('ADMIN') };
  }
  if (normalizedEmail === 'editor@bdih.com') {
    return { role: 'EDITOR', permissions: getRolePermissions('EDITOR') };
  }
  if (normalizedEmail === 'support@bdih.com') {
    return { role: 'SUPPORT', permissions: getRolePermissions('SUPPORT') };
  }

  if (!supabaseClient) {
    return { role: 'CUSTOMER', permissions: [] };
  }

  try {
    // 1. Check user_roles table
    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role_name')
      .eq('user_id', userId)
      .limit(1);

    if (!roleError && roleData && roleData.length > 0) {
      const rawRole = roleData[0].role_name?.toUpperCase() as UserRole;
      if (['OWNER', 'ADMIN', 'EDITOR', 'SUPPORT', 'CUSTOMER'].includes(rawRole)) {
        return { role: rawRole, permissions: getRolePermissions(rawRole) };
      }
    }

    // 2. Check profiles table
    const { data: profData } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .limit(1);

    if (profData && profData.length > 0) {
      const profRole = profData[0].role?.toUpperCase();
      if (profRole === 'OWNER' || profRole === 'SUPER_ADMIN') {
        return { role: 'OWNER', permissions: getRolePermissions('OWNER') };
      }
      if (profRole === 'ADMIN') {
        return { role: 'ADMIN', permissions: getRolePermissions('ADMIN') };
      }
      if (profRole === 'EDITOR' || profRole === 'INSTRUCTOR') {
        return { role: 'EDITOR', permissions: getRolePermissions('EDITOR') };
      }
      if (profRole === 'SUPPORT') {
        return { role: 'SUPPORT', permissions: getRolePermissions('SUPPORT') };
      }
    }
  } catch (err) {
    console.warn('[BDIH Auth] Error resolving role:', err);
  }

  // Deny by default: regular customer
  return { role: 'CUSTOMER', permissions: [] };
}

/**
 * Convert Supabase session user to domain AuthUser
 */
export async function mapSessionToAuthUser(user: any): Promise<AuthUser> {
  const email = user.email || '';
  const name = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0];

  const { role, permissions } = await resolveAuthoritativeRole(user.id, email);

  return {
    id: user.id,
    email,
    name,
    isAdmin: role === 'OWNER' || role === 'ADMIN' || role === 'EDITOR' || role === 'SUPPORT',
    isOwner: role === 'OWNER',
    role,
    permissions,
    phone: user.phone || user.user_metadata?.phone || '',
  };
}
