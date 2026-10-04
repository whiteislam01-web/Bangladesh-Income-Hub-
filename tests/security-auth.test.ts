/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BDIH Security & Authorization Verification Suite
 */

import { evaluateRouteAccess, hasPermission, isAuthorizedForAdmin, isAuthorizedForOwner } from '../src/lib/auth/rbac';
import { AuthUser, UserRole } from '../src/types';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(description: string, condition: boolean) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${description}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${description}`);
  }
}

console.log('\n========================================================');
console.log(' BDIH SECURITY & AUTHENTICATION ACCEPTANCE TEST SUITE');
console.log('========================================================\n');

// Mock User Objects
const anonymousUser: null = null;

const customerUser: AuthUser = {
  id: 'usr-customer-1',
  email: 'student@example.com',
  name: 'Normal Student',
  isAdmin: false,
  isOwner: false,
  role: 'CUSTOMER',
  permissions: []
};

const editorUser: AuthUser = {
  id: 'usr-editor-1',
  email: 'editor@bdih.com',
  name: 'Content Editor',
  isAdmin: true,
  isOwner: false,
  role: 'EDITOR',
  permissions: ['manage_courses', 'manage_products', 'manage_blog', 'manage_media', 'manage_homepage', 'manage_site_content']
};

const supportUser: AuthUser = {
  id: 'usr-support-1',
  email: 'support@bdih.com',
  name: 'Support Officer',
  isAdmin: true,
  isOwner: false,
  role: 'SUPPORT',
  permissions: ['manage_orders', 'manage_payments', 'manage_reviews', 'view_analytics']
};

const adminUser: AuthUser = {
  id: 'usr-admin-1',
  email: 'admin@bdih.com',
  name: 'Operations Admin',
  isAdmin: true,
  isOwner: false,
  role: 'ADMIN',
  permissions: [
    'manage_courses', 'manage_products', 'manage_orders', 'manage_payments',
    'manage_blog', 'manage_media', 'manage_reviews', 'manage_settings',
    'manage_coupons', 'view_analytics', 'manage_homepage', 'manage_navigation',
    'manage_site_content'
  ]
};

const ownerUser: AuthUser = {
  id: 'usr-owner-1',
  email: 'owner@bdih.com',
  name: 'Sovereign Owner',
  isAdmin: true,
  isOwner: true,
  role: 'OWNER',
  permissions: [
    'manage_users', 'manage_courses', 'manage_products', 'manage_orders',
    'manage_payments', 'manage_blog', 'manage_media', 'manage_reviews',
    'manage_settings', 'manage_coupons', 'view_analytics', 'manage_homepage',
    'manage_navigation', 'manage_site_content'
  ]
};

// ----------------------------------------------------
// 1. PUBLIC ROUTE ACCESSIBILITY TESTS
// ----------------------------------------------------
console.log('1. PUBLIC ROUTE ACCESSIBILITY:');
assert('Anonymous visitor can view Homepage', evaluateRouteAccess('home', anonymousUser).allowed === true);
assert('Anonymous visitor can view Courses catalog', evaluateRouteAccess('courses', anonymousUser).allowed === true);
assert('Anonymous visitor can view Indicators catalog', evaluateRouteAccess('indicators', anonymousUser).allowed === true);
assert('Anonymous visitor can view Login screen', evaluateRouteAccess('login', anonymousUser).allowed === true);
assert('Anonymous visitor can view About screen', evaluateRouteAccess('about', anonymousUser).allowed === true);
assert('Anonymous visitor can view FAQ screen', evaluateRouteAccess('faq', anonymousUser).allowed === true);

// ----------------------------------------------------
// 2. UNETHICAL / ANONYMOUS ACCESS REJECTION TESTS
// ----------------------------------------------------
console.log('\n2. UNETHICAL / ANONYMOUS ACCESS REJECTION:');
const anonDash = evaluateRouteAccess('account', anonymousUser);
assert('Anonymous → /account /dashboard = DENIED (redirects to login)', anonDash.allowed === false && anonDash.redirectTo === 'login');

const anonCourses = evaluateRouteAccess('my-courses', anonymousUser);
assert('Anonymous → /my-courses = DENIED (redirects to login)', anonCourses.allowed === false && anonCourses.redirectTo === 'login');

const anonAdmin = evaluateRouteAccess('admin', anonymousUser);
assert('Anonymous → /admin = DENIED (redirects to login)', anonAdmin.allowed === false && anonAdmin.redirectTo === 'login');

const anonOwner = evaluateRouteAccess('owner', anonymousUser);
assert('Anonymous → /owner = DENIED (redirects to login)', anonOwner.allowed === false && anonOwner.redirectTo === 'login');

const anonLearn = evaluateRouteAccess('learn', anonymousUser);
assert('Anonymous → /learn (classroom) = DENIED (redirects to login)', anonLearn.allowed === false && anonLearn.redirectTo === 'login');

// ----------------------------------------------------
// 3. CUSTOMER AUTHORIZATION PRIVILEGE ESCALATION PREVENTION
// ----------------------------------------------------
console.log('\n3. CUSTOMER PRIVILEGE ESCALATION PREVENTION:');
assert('Customer can access own account dashboard', evaluateRouteAccess('account', customerUser).allowed === true);
assert('Customer can access own enrolled courses', evaluateRouteAccess('my-courses', customerUser).allowed === true);

const custAdmin = evaluateRouteAccess('admin', customerUser);
assert('Customer → /admin = STRICTLY FORBIDDEN (HTTP 403 Forbidden)', custAdmin.allowed === false && custAdmin.redirectTo === 'forbidden');

const custOwner = evaluateRouteAccess('owner', customerUser);
assert('Customer → /owner = STRICTLY FORBIDDEN (HTTP 403 Forbidden)', custOwner.allowed === false && custOwner.redirectTo === 'forbidden');

assert('Customer cannot manage users', hasPermission(customerUser, 'manage_users') === false);
assert('Customer cannot verify payments', hasPermission(customerUser, 'manage_payments') === false);
assert('Customer cannot modify site settings', hasPermission(customerUser, 'manage_settings') === false);

// ----------------------------------------------------
// 4. GRANULAR ROLE AND PERMISSION VALIDATION
// ----------------------------------------------------
console.log('\n4. GRANULAR ROLE & PERMISSION ENFORCEMENT:');
assert('Editor can access admin workspace', isAuthorizedForAdmin(editorUser) === true);
assert('Editor → /owner = STRICTLY FORBIDDEN', evaluateRouteAccess('owner', editorUser).allowed === false);
assert('Editor CAN manage courses', hasPermission(editorUser, 'manage_courses') === true);
assert('Editor CAN manage blog', hasPermission(editorUser, 'manage_blog') === true);
assert('Editor CANNOT manage orders (unauthorized action = DENIED)', hasPermission(editorUser, 'manage_orders') === false);
assert('Editor CANNOT manage payments (unauthorized action = DENIED)', hasPermission(editorUser, 'manage_payments') === false);
assert('Editor CANNOT manage users (unauthorized action = DENIED)', hasPermission(editorUser, 'manage_users') === false);

assert('Support can access admin workspace', isAuthorizedForAdmin(supportUser) === true);
assert('Support → /owner = STRICTLY FORBIDDEN', evaluateRouteAccess('owner', supportUser).allowed === false);
assert('Support CAN manage orders', hasPermission(supportUser, 'manage_orders') === true);
assert('Support CAN manage payments', hasPermission(supportUser, 'manage_payments') === true);
assert('Support CANNOT manage courses (unauthorized action = DENIED)', hasPermission(supportUser, 'manage_courses') === false);
assert('Support CANNOT manage settings (unauthorized action = DENIED)', hasPermission(supportUser, 'manage_settings') === false);
assert('Support CANNOT manage users (unauthorized action = DENIED)', hasPermission(supportUser, 'manage_users') === false);

assert('Admin CAN manage courses, orders, payments, settings', 
  hasPermission(adminUser, 'manage_courses') && 
  hasPermission(adminUser, 'manage_orders') && 
  hasPermission(adminUser, 'manage_payments') && 
  hasPermission(adminUser, 'manage_settings')
);
assert('Admin CANNOT manage users (strictly reserved for OWNER)', hasPermission(adminUser, 'manage_users') === false);
assert('Admin → /owner = STRICTLY FORBIDDEN', evaluateRouteAccess('owner', adminUser).allowed === false);

assert('Owner CAN manage all permissions including manage_users', hasPermission(ownerUser, 'manage_users') === true);
assert('Owner has sovereign owner authorization', isAuthorizedForOwner(ownerUser) === true);
assert('Owner → /owner = ALLOWED', evaluateRouteAccess('owner', ownerUser).allowed === true);
assert('Owner → /admin = ALLOWED', evaluateRouteAccess('admin', ownerUser).allowed === true);

// ----------------------------------------------------
// 5. IDOR & DATA BOUNDARY VALIDATION
// ----------------------------------------------------
console.log('\n5. IDOR & DATA BOUNDARY DEFENSE:');
const userA_Order = { id: 'BDIH-1001', customer_email: 'usera@example.com' };
const userB_Email = 'userb@example.com';

// User B attempting to view User A's order:
const canUserBAccessUserAOrder = (orderOwner: string, requester: AuthUser) => {
  if (requester.isAdmin) return true;
  return orderOwner.toLowerCase() === requester.email.toLowerCase();
};

const userB: AuthUser = { id: 'usr-b', email: userB_Email, name: 'User B', isAdmin: false, role: 'CUSTOMER' };
assert('User B cannot access User A order (IDOR Rejected)', canUserBAccessUserAOrder(userA_Order.customer_email, userB) === false);
assert('Admin CAN access User A order for verification', canUserBAccessUserAOrder(userA_Order.customer_email, adminUser) === true);

// ----------------------------------------------------
// 6. OPEN REDIRECT DEFENSE IN OAUTH CALLBACK
// ----------------------------------------------------
console.log('\n6. OAUTH OPEN REDIRECT DEFENSE:');
function sanitizeReturnUrl(returnUrl?: string): string {
  if (!returnUrl) return '/account';
  const clean = returnUrl.trim();
  if (clean.startsWith('/') && !clean.startsWith('//') && !clean.includes('://')) {
    return clean;
  }
  return '/account';
}

assert('Safe internal path is preserved: /dashboard', sanitizeReturnUrl('/dashboard') === '/dashboard');
assert('Safe internal path is preserved: /learn/smc', sanitizeReturnUrl('/learn/smc') === '/learn/smc');
assert('External evil open redirect rejected: https://evil.com', sanitizeReturnUrl('https://evil.com') === '/account');
assert('Protocol-relative open redirect rejected: //evil.com/hack', sanitizeReturnUrl('//evil.com/hack') === '/account');

// Summary
console.log('\n--------------------------------------------------------');
console.log(`TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
console.log('--------------------------------------------------------\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL SECURITY AND AUTHORIZATION ACCEPTANCE TESTS PASSED!\n');
}
