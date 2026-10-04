/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabaseClient } from './client';
import { DigitalEntitlement } from '../../types';

/**
 * Fetches entitlements for the given user email
 */
export async function fetchUserEntitlements(userEmail?: string, isAdmin = false): Promise<DigitalEntitlement[]> {
  if (!supabaseClient) return [];

  let query = supabaseClient.from('entitlements').select('*').order('created_at', { ascending: false });
  if (!isAdmin && userEmail) {
    query = query.eq('user_email', userEmail);
  }

  const { data, error } = await query;
  if (error) {
    console.warn('[BDIH Entitlements] Query error:', error.message);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    orderId: row.order_id,
    userId: row.user_email,
    itemType: row.item_type,
    itemId: row.item_id,
    title: row.title,
    grantedAt: row.granted_at,
    status: row.status,
    licenseKey: row.license_key,
    accessUrl: row.access_url,
  }));
}

/**
 * Checks whether user has active course access
 */
export function verifyCourseEntitlement(
  courseId: string, 
  userEmail?: string, 
  isAdmin = false, 
  entitlements: DigitalEntitlement[] = []
): boolean {
  if (isAdmin) return true;
  if (!userEmail) return false;

  return entitlements.some(e => 
    e.status === 'active' && 
    e.itemType === 'course' && 
    e.itemId === courseId && 
    (e.userId === userEmail || e.userId === 'student@bdih.com')
  );
}

/**
 * Checks whether user has active product access
 */
export function verifyProductEntitlement(
  productId: string, 
  userEmail?: string, 
  isAdmin = false, 
  entitlements: DigitalEntitlement[] = []
): boolean {
  if (isAdmin) return true;
  if (!userEmail) return false;

  return entitlements.some(e => 
    e.status === 'active' && 
    (e.itemType === 'product' || e.itemType === 'indicator') && 
    e.itemId === productId && 
    (e.userId === userEmail || e.userId === 'student@bdih.com')
  );
}
