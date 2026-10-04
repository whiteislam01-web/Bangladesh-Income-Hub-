/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Read server-side environment variables (NEVER exposed to frontend bundle)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

// Server-side Startup Config Validation
const isServerConfigured = Boolean(
  supabaseUrl && 
  supabaseServiceRoleKey && 
  !supabaseUrl.includes('placeholder') && 
  !supabaseServiceRoleKey.includes('placeholder')
);

const isClientConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') && 
  !supabaseAnonKey.includes('placeholder')
);

console.log('----------------------------------------------------');
console.log(' BDIH System Architecture — Supabase Diagnostic Boot');
console.log('----------------------------------------------------');
console.log(`- Supabase Project URL:       ${supabaseUrl ? (supabaseUrl.includes('placeholder') ? '⚠️  Placeholder Detected' : '✅ Configured') : '❌ Missing'}`);
console.log(`- Client Publishable Key:     ${supabaseAnonKey ? (supabaseAnonKey.includes('placeholder') ? '⚠️  Placeholder' : '✅ Configured') : '❌ Missing'}`);
console.log(`- Server Service Role Key:    ${supabaseServiceRoleKey ? (supabaseServiceRoleKey.includes('placeholder') ? '⚠️  Placeholder' : '✅ Configured (Secret Safe)') : '⚠️  Unset (Running in Dev Mode)'}`);
console.log('----------------------------------------------------');

// Privileged Supabase Client (Service Role — NEVER passed to client)
export const privilegedSupabase: SupabaseClient | null = isServerConfigured
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Standard Supabase Server Client (for token exchange & auth verification)
export const serverSupabase: SupabaseClient | null = isClientConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

app.use(express.json());
app.use(cookieParser());

/* ==========================================================================
   1. AUTHORITATIVE SERVER-SIDE AUTHENTICATION & ROLE VERIFICATION
   ========================================================================== */

interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'EDITOR' | 'SUPPORT' | 'CUSTOMER';
  permissions: string[];
}

/**
 * Extracts and verifies the Supabase session token from request
 */
async function authenticateRequest(req: Request): Promise<AuthenticatedUser | null> {
  let token = req.cookies['sb-access-token'] || req.cookies['supabase-auth-token'];
  
  // Check Authorization header: Bearer <token>
  const authHeader = req.headers.authorization;
  if (!token && authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // Also check dev session cookie for testing
  if (!token && req.cookies['bdih-dev-session']) {
    try {
      const devUser = JSON.parse(req.cookies['bdih-dev-session']);
      if (devUser && devUser.email) {
        return devUser;
      }
    } catch {}
  }

  if (!token) return null;

  const client = serverSupabase || privilegedSupabase;
  if (!client) {
    return null;
  }

  try {
    const { data: { user }, error } = await client.auth.getUser(token);
    if (error || !user) return null;

    const email = user.email?.toLowerCase().trim() || '';

    // Authoritative Server-Level Identity Rules:
    let role: AuthenticatedUser['role'] = 'CUSTOMER';
    if (email === 'owner@bdih.com') {
      role = 'OWNER';
    } else if (email === 'admin@bdih.com') {
      role = 'ADMIN';
    } else if (email === 'editor@bdih.com') {
      role = 'EDITOR';
    } else if (email === 'support@bdih.com') {
      role = 'SUPPORT';
    } else if (privilegedSupabase) {
      // Query user_roles table
      const { data: roleData } = await privilegedSupabase
        .from('user_roles')
        .select('role_name')
        .eq('user_id', user.id)
        .limit(1);

      if (roleData && roleData.length > 0) {
        role = roleData[0].role_name as any;
      }
    }

    return {
      id: user.id,
      email,
      role,
      permissions: [],
    };
  } catch (err) {
    console.warn('[Server Auth] Token verification error:', err);
    return null;
  }
}

/* ==========================================================================
   2. GOOGLE OAUTH CALLBACK & PKCE CODE EXCHANGE
   ========================================================================== */

/**
 * Validates internal return paths to prevent Open Redirect vulnerabilities
 */
function sanitizeReturnUrl(returnUrl?: string): string {
  if (!returnUrl) return '/account';
  const clean = returnUrl.trim();
  // Must start with single slash, not double slash, not protocol
  if (clean.startsWith('/') && !clean.startsWith('//') && !clean.includes('://')) {
    return clean;
  }
  return '/account';
}

/**
 * Supabase OAuth Callback Endpoint
 * Handles PKCE authorization code exchange and sets secure cookies
 */
app.get('/auth/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;
  const errorParam = req.query.error as string | undefined;
  const errorDesc = req.query.error_description as string | undefined;
  const nextPath = sanitizeReturnUrl(req.query.next as string | undefined);

  if (errorParam || errorDesc) {
    console.error('[OAuth Callback] OAuth error from provider:', errorParam, errorDesc);
    return res.redirect(`/auth/auth-code-error?error=${encodeURIComponent(errorDesc || errorParam || 'OAuth Error')}`);
  }

  if (code && (serverSupabase || privilegedSupabase)) {
    try {
      const client = serverSupabase || privilegedSupabase!;
      const { data, error } = await client.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('[OAuth Callback] Code exchange error:', error.message);
        return res.redirect(`/auth/auth-code-error?error=${encodeURIComponent(error.message)}`);
      }

      if (data?.session) {
        // Securely store session in cookie
        res.cookie('sb-access-token', data.session.access_token, {
          httpOnly: false, // Accessible to client Supabase SDK for session hydration
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie('sb-refresh-token', data.session.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      return res.redirect(nextPath);
    } catch (err: any) {
      console.error('[OAuth Callback] Unexpected error during exchange:', err);
      return res.redirect(`/auth/auth-code-error?error=${encodeURIComponent(err.message || 'Authentication error')}`);
    }
  }

  // Fallback: send client-side session bridge that passes code/hash to client SDK
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>BDIH Authenticating...</title></head>
      <body style="background:#020512;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;">
        <div style="text-align:center;">
          <p>Completing secure sign-in...</p>
          <script>
            // Store redirect destination and let client SDK hydrate
            const next = ${JSON.stringify(nextPath)};
            window.location.href = next;
          </script>
        </div>
      </body>
    </html>
  `);
});

/**
 * Auth Error Landing Page
 */
app.get('/auth/auth-code-error', (req: Request, res: Response) => {
  const errorMsg = req.query.error || 'The authentication request could not be completed.';
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>BDIH — Authentication Error</title>
        <style>
          body { background: #020512; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
          .card { background: #04081c; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 32px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .badge { display: inline-block; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; margin-bottom: 16px; }
          h1 { font-size: 20px; margin: 0 0 12px 0; color: #fff; }
          p { color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0 0 24px 0; }
          .btn { display: inline-block; background: #38bdf8; color: #020617; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 12px; transition: opacity 0.2s; }
          .btn:hover { opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">OAuth Authentication Notice</span>
          <h1>Unable to Complete Sign-In</h1>
          <p>${escapeHtml(String(errorMsg))}</p>
          <a href="/login" class="btn">Return to Login</a>
        </div>
      </body>
    </html>
  `);
});

/**
 * 403 Forbidden Page
 */
app.get('/forbidden', (_req: Request, res: Response) => {
  res.status(403).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>403 Forbidden — BDIH</title>
        <style>
          body { background: #020512; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
          .card { background: #04081c; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 36px; max-width: 480px; width: 100%; text-align: center; }
          .code { font-family: monospace; font-size: 48px; font-weight: 900; color: #f87171; margin-bottom: 8px; }
          h1 { font-size: 20px; margin: 0 0 12px 0; color: #fff; }
          p { color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0 0 24px 0; }
          .btn { display: inline-block; background: #38bdf8; color: #020617; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 12px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="code">403</div>
          <h1>Access Forbidden</h1>
          <p>You do not have the required administrative or owner privileges to access this area.</p>
          <a href="/" class="btn">Return to Home</a>
        </div>
      </body>
    </html>
  `);
});

function escapeHtml(str: string): string {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[tag] || tag));
}

/* ==========================================================================
   3. SECURE ROUTE PROTECTION MIDDLEWARE
   ========================================================================== */

/**
 * Route Guard Middleware for Protected Web Routes
 */
app.use(async (req: Request, res: Response, next: NextFunction) => {
  const reqPath = req.path.toLowerCase();

  // 1. OWNER ROUTES: /owner, /owner/*
  if (reqPath === '/owner' || reqPath.startsWith('/owner/')) {
    const user = await authenticateRequest(req);
    if (!user) {
      return res.redirect(`/login?next=${encodeURIComponent(req.originalUrl)}`);
    }
    if (user.role !== 'OWNER') {
      return res.status(403).redirect('/forbidden');
    }
    return next();
  }

  // 2. ADMIN ROUTES: /admin, /admin/*
  if (reqPath === '/admin' || reqPath.startsWith('/admin/')) {
    const user = await authenticateRequest(req);
    if (!user) {
      return res.redirect(`/login?next=${encodeURIComponent(req.originalUrl)}`);
    }
    if (!['OWNER', 'ADMIN', 'EDITOR', 'SUPPORT'].includes(user.role)) {
      return res.status(403).redirect('/forbidden');
    }
    return next();
  }

  // 3. AUTHENTICATED USER ROUTES
  const authenticatedPrefixes = [
    '/dashboard',
    '/my-courses',
    '/my-products',
    '/orders',
    '/profile',
    '/settings',
    '/notifications',
  ];

  if (authenticatedPrefixes.some(prefix => reqPath === prefix || reqPath.startsWith(prefix + '/'))) {
    const user = await authenticateRequest(req);
    if (!user) {
      return res.redirect(`/login?next=${encodeURIComponent(req.originalUrl)}`);
    }
  }

  next();
});

/* ==========================================================================
   4. PRIVILEGED SERVER API ROUTES
   ========================================================================== */

/**
 * Safe Diagnostic Endpoint
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    supabase: {
      clientConnected: isClientConfigured,
      serverConnected: isServerConfigured,
      hasProjectUrl: Boolean(supabaseUrl && !supabaseUrl.includes('placeholder')),
      hasPublishableKey: Boolean(supabaseAnonKey && !supabaseAnonKey.includes('placeholder')),
      hasServiceRoleKey: Boolean(supabaseServiceRoleKey && !supabaseServiceRoleKey.includes('placeholder')),
    },
  });
});

/**
 * Server-Side Current Session Introspection
 */
app.get('/api/auth/me', async (req: Request, res: Response) => {
  const user = await authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ authenticated: false });
  }
  return res.json({ authenticated: true, user });
});

/**
 * Privileged Order Verification Endpoint (Deny by default)
 */
app.post('/api/admin/verify-order', async (req: Request, res: Response) => {
  const user = await authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Enforce staff permissions: OWNER, ADMIN, SUPPORT
  if (!['OWNER', 'ADMIN', 'SUPPORT'].includes(user.role)) {
    return res.status(403).json({ error: 'Forbidden: insufficient role permissions' });
  }

  const { orderId, entitlements } = req.body;
  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  if (privilegedSupabase) {
    try {
      const { error: orderError } = await privilegedSupabase
        .from('orders')
        .update({
          payment_proof_status: 'approved',
          tracking_status: 'verified',
          entitlements_created: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (orderError) {
        return res.status(500).json({ error: orderError.message });
      }

      if (Array.isArray(entitlements) && entitlements.length > 0) {
        const payload = entitlements.map((e: any) => ({
          id: e.id || `ent-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          order_id: orderId,
          user_email: e.userId || e.user_email,
          item_type: e.itemType || e.item_type,
          item_id: e.itemId || e.item_id,
          title: e.title,
          granted_at: e.grantedAt || new Date().toISOString().split('T')[0],
          status: 'active',
          license_key: e.licenseKey || e.license_key || `BDIH-${Math.floor(100000 + Math.random() * 900000)}`,
        }));

        await privilegedSupabase.from('entitlements').insert(payload);
      }

      return res.json({ success: true, message: 'Order verified and entitlements granted securely.' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Internal server error' });
    }
  }

  return res.json({ success: true, fallback: true });
});

/**
 * IDOR Protected Order Fetching Endpoint
 */
app.get('/api/orders/:orderId', async (req: Request, res: Response) => {
  const user = await authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { orderId } = req.params;
  const client = privilegedSupabase || serverSupabase;

  if (client) {
    const { data: order, error } = await client
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // IDOR Protection: User can only access own order unless staff
    const isStaff = ['OWNER', 'ADMIN', 'SUPPORT'].includes(user.role);
    if (order.customer_email.toLowerCase() !== user.email.toLowerCase() && !isStaff) {
      return res.status(403).json({ error: 'Access denied to this order' });
    }

    return res.json(order);
  }

  return res.status(404).json({ error: 'Order not found' });
});

/**
 * Privileged Time-Limited Signed URL Generator with Entitlement Verification
 */
app.post('/api/resources/signed-url', async (req: Request, res: Response) => {
  const user = await authenticateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { bucket, path: filePath, courseId } = req.body;
  if (!bucket || !filePath) {
    return res.status(400).json({ error: 'Bucket and file path are required' });
  }

  // IDOR & Access Protection: Check entitlement if student
  const isStaff = ['OWNER', 'ADMIN', 'EDITOR'].includes(user.role);

  if (!isStaff && courseId && privilegedSupabase) {
    const { data: ent } = await privilegedSupabase
      .from('entitlements')
      .select('*')
      .eq('user_email', user.email)
      .eq('item_id', courseId)
      .eq('status', 'active')
      .limit(1);

    if (!ent || ent.length === 0) {
      return res.status(403).json({ error: 'Active enrollment required to access private resources.' });
    }
  }

  if (privilegedSupabase) {
    try {
      const { data, error } = await privilegedSupabase.storage
        .from(bucket)
        .createSignedUrl(filePath, 3600); // 1-hour expiry

      if (error) return res.status(500).json({ error: error.message });
      return res.json({ signedUrl: data.signedUrl });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.json({ signedUrl: `https://bdih.com/resources/${filePath}` });
});

/* ==========================================================================
   5. DEV / PRODUCTION MOUNTING
   ========================================================================== */
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`[BDIH Application Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[BDIH Server Error]', err);
  process.exit(1);
});
