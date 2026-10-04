/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Centralized re-export from the new infrastructure/data-access layer
export {
  supabaseClient as supabase,
  isSupabaseReady as isSupabaseConfigured,
  validateClientSupabaseConfig,
  getSupabaseConfigStatus,
  signInWithGoogle as signInWithGoogleOAuth,
  signInWithPassword as signInWithEmail,
  signUpWithPassword as signUpWithEmail,
  signOut,
  getCurrentSession as getSupabaseSession,
  mapSessionToAuthUser,
  createOrderRecord as saveOrderToSupabase,
  processOrderApproval as approveOrderInSupabase,
  persistCourseProgress as saveCourseProgressToSupabase,
  fetchOrdersFromSupabase as fetchUserOrders,
  fetchUserEntitlements,
  verifyCourseEntitlement,
  verifyProductEntitlement,
  persistSiteSettings
} from '../lib/supabase';
