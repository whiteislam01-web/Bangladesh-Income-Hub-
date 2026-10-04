/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserRole, UserPermission, AuthUser } from '../../types';

export const ROLE_PERMISSIONS: Record<UserRole, UserPermission[]> = {
  OWNER: [
    'manage_users',
    'manage_courses',
    'manage_products',
    'manage_orders',
    'manage_payments',
    'manage_blog',
    'manage_media',
    'manage_reviews',
    'manage_settings',
    'manage_coupons',
    'view_analytics',
    'manage_homepage',
    'manage_navigation',
    'manage_site_content',
  ],
  ADMIN: [
    'manage_courses',
    'manage_products',
    'manage_orders',
    'manage_payments',
    'manage_blog',
    'manage_media',
    'manage_reviews',
    'manage_settings',
    'manage_coupons',
    'view_analytics',
    'manage_homepage',
    'manage_navigation',
    'manage_site_content',
  ],
  EDITOR: [
    'manage_courses',
    'manage_products',
    'manage_blog',
    'manage_media',
    'manage_homepage',
    'manage_site_content',
  ],
  SUPPORT: [
    'manage_orders',
    'manage_payments',
    'manage_reviews',
    'view_analytics',
  ],
  CUSTOMER: [],
};

/**
 * Returns list of permissions granted to a role
 */
export function getRolePermissions(role: UserRole): UserPermission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if user holds a specific permission (Deny-by-default)
 */
export function hasPermission(user: AuthUser | null | undefined, permission: UserPermission): boolean {
  if (!user || !user.role) return false;
  if (user.role === 'OWNER') return true;

  const perms = user.permissions || ROLE_PERMISSIONS[user.role] || [];
  return perms.includes(permission);
}

/**
 * Check if user is authorized for general administrative access
 */
export function isAuthorizedForAdmin(user: AuthUser | null | undefined): boolean {
  if (!user || !user.role) return false;
  return user.role === 'OWNER' || user.role === 'ADMIN' || user.role === 'EDITOR' || user.role === 'SUPPORT';
}

/**
 * Check if user is authorized for sovereign owner access
 */
export function isAuthorizedForOwner(user: AuthUser | null | undefined): boolean {
  if (!user || !user.role) return false;
  return user.role === 'OWNER';
}

/**
 * Evaluates route access requirements against user session
 */
export function evaluateRouteAccess(
  pathOrView: string,
  user: AuthUser | null | undefined
): { allowed: boolean; redirectTo?: string; reason?: 'unauthenticated' | 'unauthorized' } {
  const normalized = pathOrView.toLowerCase().replace(/^\//, '');

  // 1. PUBLIC ROUTES — anyone can view
  const publicRoutes = [
    '',
    'home',
    'about',
    'contact',
    'faq',
    'blog',
    'blog-details',
    'courses',
    'course-details',
    'products',
    'product-details',
    'indicators',
    'signals',
    'shop',
    'login',
    'signup',
    'forgot-password',
    'reset-password',
    'privacy',
    'terms',
    'refund',
    'cart',
    'checkout',
    'order-tracking',
    'forbidden',
    'auth-error',
  ];

  if (publicRoutes.includes(normalized) || publicRoutes.some(p => p && normalized.startsWith(p + '/'))) {
    return { allowed: true };
  }

  // 2. OWNER ROUTES — strictly require role === 'OWNER'
  if (normalized === 'owner' || normalized.startsWith('owner/')) {
    if (!user) {
      return { allowed: false, redirectTo: 'login', reason: 'unauthenticated' };
    }
    if (user.role !== 'OWNER') {
      return { allowed: false, redirectTo: 'forbidden', reason: 'unauthorized' };
    }
    return { allowed: true };
  }

  // 3. ADMIN ROUTES — require staff role (OWNER, ADMIN, EDITOR, SUPPORT)
  if (normalized === 'admin' || normalized.startsWith('admin/')) {
    if (!user) {
      return { allowed: false, redirectTo: 'login', reason: 'unauthenticated' };
    }
    if (!isAuthorizedForAdmin(user)) {
      return { allowed: false, redirectTo: 'forbidden', reason: 'unauthorized' };
    }
    return { allowed: true };
  }

  // 4. AUTHENTICATED USER ROUTES (Dashboard, My Courses, My Products, Account, LMS learning)
  const authenticatedRoutes = [
    'dashboard',
    'account',
    'my-courses',
    'my-products',
    'downloads',
    'orders',
    'profile',
    'settings',
    'notifications',
    'learn',
  ];

  if (authenticatedRoutes.includes(normalized) || authenticatedRoutes.some(p => normalized.startsWith(p + '/'))) {
    if (!user) {
      return { allowed: false, redirectTo: 'login', reason: 'unauthenticated' };
    }
    return { allowed: true };
  }

  // Default: if unknown route, allow or let app handle 404
  return { allowed: true };
}
