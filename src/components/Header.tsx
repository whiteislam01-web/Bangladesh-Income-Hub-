/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe, ShoppingCart, User, LogOut, Lock, Menu, X, LayoutDashboard, 
  GraduationCap, TrendingUp, Sparkles, BookOpen, ShieldCheck, ChevronDown
} from 'lucide-react';
import { bihAudio } from '../utils/audio';

export const Header: React.FC = () => {
  const { 
    lang, setLang, 
    currency, setCurrency, 
    currentView, setView, 
    cart, 
    currentUser, loginAsAdmin, loginAsDemoStudent, logout, 
    settings, t, tKey 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNav = (view: any, slug?: string) => {
    try { bihAudio.playTransitionSwoosh(); } catch {}
    setView(view, slug);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const navLinks = [
    { key: 'home', view: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { key: 'courses', view: 'courses', labelEn: 'Courses', labelBn: 'কোর্সসমূহ' },
    { key: 'indicators', view: 'indicators', labelEn: 'Indicators', labelBn: 'ইন্ডিকেটরস' },
    { key: 'products', view: 'products', labelEn: 'Products', labelBn: 'প্রোডাক্টস' },
    { key: 'blog', view: 'blog', labelEn: 'Blog', labelBn: 'ব্লগ' },
    { key: 'about', view: 'about', labelEn: 'About', labelBn: 'আমাদের সম্পর্কে' },
  ];

  return (
    <header id="bdih_site_header" className="sticky top-0 z-50 w-full bg-[#020512]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      {/* Announcement Bar */}
      {settings.showAnnouncement && (
        <div 
          onClick={() => handleNav('courses')}
          className="w-full bg-gradient-to-r from-blue-900/60 via-sky-900/40 to-blue-950/60 hover:from-blue-800/70 text-slate-200 text-[11px] font-medium py-2 px-4 text-center select-none border-b border-white/5 cursor-pointer transition-colors"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="truncate">{t(settings.announcementText_en, settings.announcementText_bn)}</span>
            <span className="text-sky-400 font-bold ml-1">→</span>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo & Monogram */}
        <div 
          id="bdih_branding_logo"
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-blue-600/30 border border-sky-400/40 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.25)] transition-transform group-hover:scale-105">
            <span className="text-white font-black text-sm tracking-wider font-mono">BDIH</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm tracking-tight leading-none group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
              <span>BANGLADESH</span>
              <span className="text-sky-400 font-extrabold">INCOME HUB</span>
            </span>
            <span className="text-[9px] text-slate-400 font-medium tracking-wide mt-1">
              {settings.taglineText || 'জ্ঞান ও প্রযুক্তিতে ট্রেডিংয়ে অর্থনৈতিক মুক্তি'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.key}
                onClick={() => handleNav(item.view)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive 
                    ? 'text-sky-400 bg-sky-500/10 font-bold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(item.labelEn, item.labelBn)}
              </button>
            );
          })}
        </nav>

        {/* Global Action items: Currency, Lang, Cart, Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">

          {/* Currency Toggle (BDT ৳ / USD $) */}
          <button
            onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}
            className="px-2.5 py-1.5 bg-white/[0.03] hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/30 rounded-lg text-[10px] font-mono font-bold text-slate-300 hover:text-sky-300 transition-all cursor-pointer"
            title={currency === 'BDT' ? 'Switch to USD ($)' : 'Switch to BDT (৳)'}
          >
            {currency === 'BDT' ? '৳ BDT' : '$ USD'}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="p-2 bg-white/[0.03] hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/30 rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1"
            title={lang === 'en' ? 'বাংলা সংস্করণ' : 'English Version'}
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-bold uppercase">{lang}</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => handleNav('cart')}
            className="relative p-2 bg-white/[0.03] hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/30 rounded-lg text-slate-200 hover:text-sky-400 transition-all cursor-pointer"
            title="Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sky-500 text-slate-950 font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account Portal Dropdown */}
          <div className="relative">
            {currentUser ? (
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-lg text-xs font-semibold text-sky-300 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-sky-400/80" />
              </button>
            ) : (
              <button
                onClick={() => handleNav('login')}
                className="px-3.5 py-1.5 bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-xs rounded-lg shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
              >
                {t('Login', 'লগইন')}
              </button>
            )}

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && currentUser && (
              <div className="absolute right-0 mt-2 w-64 bg-[#050a1c] border border-white/10 rounded-2xl p-2.5 shadow-2xl z-50 space-y-1">
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <div className="text-white font-bold text-xs truncate">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">{currentUser.email}</div>
                  <span className="inline-block mt-1 text-[9px] uppercase px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                    {currentUser.isAdmin ? 'Owner / Admin' : 'Enrolled Student'}
                  </span>
                </div>

                <button
                  onClick={() => handleNav('my-courses')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t('My Enrolled Courses', 'আমার কোর্সসমূহ')}</span>
                </button>

                <button
                  onClick={() => handleNav('my-products')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t('My Indicators & Products', 'আমার প্রোডাক্টস ও ইন্ডিকেটর')}</span>
                </button>

                <button
                  onClick={() => handleNav('account')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t('Orders & Account', 'অর্ডার ও প্রোফাইল')}</span>
                </button>

                {currentUser.isAdmin && (
                  <button
                    onClick={() => handleNav('admin')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-amber-400 hover:bg-amber-400/10 flex items-center gap-2 font-bold cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{t('Admin Management CMS', 'অ্যাডমিন সিএমএস')}</span>
                  </button>
                )}

                <div className="border-t border-white/5 pt-1">
                  <button
                    onClick={() => { logout(); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('Log Out', 'লগ আউট')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white/[0.03] hover:bg-white/10 border border-white/10 rounded-lg text-slate-200 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#04081a]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-5 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <button
                key={`m-${item.key}`}
                onClick={() => handleNav(item.view)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  currentView === item.view 
                    ? 'text-sky-400 bg-sky-500/10' 
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {t(item.labelEn, item.labelBn)}
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-3 flex flex-col space-y-2">
            <button
              onClick={() => handleNav('my-courses')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>{t('My Enrolled Courses', 'আমার কোর্সসমূহ')}</span>
            </button>
            <button
              onClick={() => handleNav('my-products')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>{t('My Indicators & Products', 'আমার প্রোডাক্টস')}</span>
            </button>
            {currentUser?.isAdmin && (
              <button
                onClick={() => handleNav('admin')}
                className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-400 hover:bg-amber-400/10 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('Admin Management CMS', 'অ্যাডমিন সিএমএস')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
