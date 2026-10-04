/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, AlertTriangle, ArrowLeft, Home, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ForbiddenView: React.FC = () => {
  const { currentUser, setView, logout, t } = useApp();

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-slate-100 text-center">
      <div className="p-8 rounded-3xl bg-[#04081c]/90 border border-rose-500/20 shadow-2xl space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
            HTTP 403 — ACCESS FORBIDDEN
          </span>
          <h1 className="text-xl font-bold text-white mt-3">
            {t('Administrative Permission Required', 'অ্যাডমিন এক্সেস সীমাবদ্ধ')}
          </h1>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {t(
              'Your current account does not hold the authoritative permissions required to access this console. This route is deny-by-default and enforced server-side.',
              'আপনার একাউন্টে এই সেকশনে প্রবেশের অনুমোদন নেই।'
            )}
          </p>
          {currentUser && (
            <div className="mt-3 py-1.5 px-3 bg-white/[0.03] border border-white/5 rounded-xl text-[11px] font-mono text-slate-300">
              User: <span className="text-white">{currentUser.email}</span> • Role: <span className="text-amber-400 font-bold">{currentUser.role}</span>
            </div>
          )}
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => setView('home')}
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>{t('Return to Safe Homepage', 'হোমপেজে ফিরে যান')}</span>
          </button>

          <button
            onClick={async () => {
              await logout();
              setView('login');
            }}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-xl border border-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{t('Sign in with Staff / Owner Account', 'অন্য একাউন্টে সাইন ইন করুন')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const AuthErrorView: React.FC<{ error?: string }> = ({ error }) => {
  const { setView, t } = useApp();

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-slate-100 text-center">
      <div className="p-8 rounded-3xl bg-[#04081c]/90 border border-amber-500/20 shadow-2xl space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            OAUTH AUTHENTICATION ISSUE
          </span>
          <h1 className="text-xl font-bold text-white mt-3">
            {t('Authentication Incomplete', 'সাইন-ইন সম্পন্ন হয়নি')}
          </h1>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {error || t(
              'The OAuth verification code could not be verified by the server. Please verify your Google Client credentials and Supabase Redirect URLs.',
              'গুগল সাইন-ইন যাচাই করা যায়নি। দয়া করে পুনরায় চেষ্টা করুন।'
            )}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setView('login')}
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('Back to Login Screen', 'লগইনে ফিরে যান')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
