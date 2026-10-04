/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, TrendingUp, ShieldCheck, ArrowRight, Stars, Send, Sparkles, 
  BookOpen, PlayCircle, HardDriveDownload, Check, Users, Award, Star, Lock
} from 'lucide-react';
import { Course, Product } from '../types';

export const HomeView: React.FC = () => {
  const { 
    courses, 
    products, 
    reviews, 
    setView, 
    startLearningCourse,
    addToCart,
    formatPrice, 
    settings, 
    t 
  } = useApp();

  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredCourses = courses.filter(c => c.is_published && c.is_featured).slice(0, 3);
  const featuredIndicators = products.filter(p => p.is_active && (p.type === 'indicator' || p.is_featured)).slice(0, 3);
  const featuredReviews = reviews.filter(r => r.approved && r.is_featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setEmailInput('');
      setTimeout(() => setNewsletterSubscribed(false), 6000);
    }
  };

  return (
    <div id="bdih_home_view" className="w-full bg-transparent text-slate-100">
      
      {/* =========================================================================
          1. CINEMATIC HERO SECTION
          ========================================================================= */}
      <section id="hero_section" className="relative w-full pt-12 pb-20 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Premium Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start justify-start max-w-2xl">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-400 text-[10px] font-bold uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t('BDIH DIGITAL EDUCATION & INDICATORS', 'বিডিআইএইচ ডিজিটাল ট্রেডিং এডুকেশন')}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-slate-300 text-[10px] font-mono tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('INSTITUTIONAL SMC METHODOLOGY', 'স্মার্ট মানি কনসেপ্টস')}</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-sans">
                {t(settings.heroTitle_en, settings.heroTitle_bn)}
              </h1>

              {/* Subheadline */}
              <p className="text-slate-300 text-sm sm:text-base mt-5 max-w-xl leading-relaxed">
                {t(settings.heroSubtitle_en, settings.heroSubtitle_bn)}
              </p>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
                <button 
                  onClick={() => setView('courses')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-slate-950" />
                  <span>{t('Explore Masterclasses', 'কোর্সসমূহ দেখুন')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => setView('indicators')}
                  className="w-full sm:w-auto px-7 py-4 bg-[#07112a]/80 hover:bg-[#0c1c45] text-white rounded-xl border border-white/10 hover:border-sky-500/30 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  <span>{t('Precision Indicators', 'ট্রেডিং ইন্ডিকেটরস')}</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-6 border-t border-white/5 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>{t('bKash / Nagad Instant Access', 'বিকাশ ও নগদ পেমেন্ট')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>{t('TradingView & MT5 Tools', 'ট্রেডিংভিউ ও এমটি৫')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>{t('Lifetime LMS Updates', 'লাইফটাইম এক্সেস')}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Layered Floating Glass Indicators & LMS Widget */}
            <div className="lg:col-span-5 relative w-full h-[480px] hidden lg:block select-none pointer-events-none">
              
              {/* Card 1: Live SMC Indicator Radar */}
              <div className="absolute top-[5%] right-2 w-80 backdrop-blur-2xl bg-[#040a20]/80 border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-bold text-slate-200 font-mono tracking-wider">BDIH RADAR ACTIVE</span>
                  </div>
                  <span className="text-[9px] font-mono text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded border border-sky-400/20">
                    EURUSD • 15M
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-white font-extrabold text-sm tracking-tight">Institutional Order Block (Bullish)</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Mitigation Fill at 1.0842 • 1:6 RR Potential</div>
                </div>
                {/* SVG Visual Candle Grid */}
                <div className="mt-3 w-full h-10 flex items-center justify-between gap-1 px-1">
                  {[20, 35, 15, 60, 40, 85, 55, 95, 75, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/5 rounded-sm flex items-end h-full">
                      <div 
                        className={`w-full rounded-sm ${i >= 7 ? 'bg-emerald-400' : 'bg-sky-500/40'}`} 
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Masterclass Active Curriculum Tracker */}
              <div className="absolute top-[48%] left-0 w-72 backdrop-blur-2xl bg-[#030718]/90 border border-sky-400/20 rounded-2xl p-4.5 shadow-[0_25px_55px_rgba(0,0,0,0.7)] pointer-events-auto">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-sky-400" />
                  <span className="text-[10px] font-bold text-sky-300 font-mono uppercase tracking-wider">Course Curriculum</span>
                </div>
                <div className="text-white text-xs font-bold font-sans">
                  Smart Money Concepts (SMC) Masterclass
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-slate-300">
                    <span>14 Video Modules</span>
                    <span className="text-emerald-400 font-bold">18.5h Content</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full w-[65%]" />
                  </div>
                </div>
              </div>

              {/* Card 3: Prop Firm Passing Verified Proof */}
              <div className="absolute bottom-[3%] right-6 w-68 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.5)] pointer-events-auto">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white text-xs font-bold">$100,000 FTMO Passed</strong>
                    <span className="text-[10px] text-slate-400 font-mono">BDIH Student Milestone</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CORE PILLARS OF BDIH (Education + Indicators + Digital Tools)
          ========================================================================= */}
      <section className="py-16 border-y border-white/5 bg-[#030614]/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sky-400 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
              {t('Three Core Pillars', 'বিডিআইএইচের ৩টি মূল সেবা')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('Everything You Need for Market Edge', 'ট্রেডিংয়ে স্বাবলম্বী হওয়ার পূর্ণাঙ্গ ইকোসিস্টেম')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: Courses */}
            <div 
              onClick={() => setView('courses')}
              className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-sky-400/40 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                {t('1. Online Masterclasses', '১. অনলাইন মাস্টারক্লাস')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {t(
                  'Structured step-by-step video curriculums in Bangla covering Smart Money Concepts, institutional order flow, and prop-firm risk management.',
                  'সহজ বাংলায় রেকর্ডেড এইচডি ভিডিও লেকচার, মডিউলভিত্তিক সিলেবাস এবং প্রপ ফার্ম পাস করার গাণিতিক রিস্ক ম্যানেজমেন্ট।'
                )}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                <span>{t('Browse Courses', 'কোর্সসমূহ দেখুন')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 2: Indicators */}
            <div 
              onClick={() => setView('indicators')}
              className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-sky-400/40 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                {t('2. Precision Indicators', '২. প্রিসিশন ইন্ডিকেটরস')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {t(
                  'Proprietary TradingView PineScript and MetaTrader 4/5 tools that automatically map Order Blocks, Fair Value Gaps, and Session Killzones.',
                  'ট্রেডিংভিউ ও মেটাট্রেডারের জন্য কাস্টম স্ক্রিপ্ট যা স্বয়ংক্রিয়ভাবে চার্টে অর্ডার ব্লক, এফভিজি ও সেশন কিলজোন ড্র করে।'
                )}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                <span>{t('View Indicator Suite', 'ইন্ডিকেটরসমূহ দেখুন')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 3: Digital Tools */}
            <div 
              onClick={() => setView('products')}
              className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-sky-400/40 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <HardDriveDownload className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                {t('3. Digital Products & Tools', '৩. ডিজিটাল টুলস ও রিসোর্স')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {t(
                  'Notion trading journals, automated MT5 risk management EAs, cheat sheets, and high-resolution institutional entry PDF playbooks.',
                  'নোশন ট্রেডিং জার্নাল, ড্র-ডাউন প্রটেক্টর রোবট, স্ট্র্যাটেজি চিটশিট এবং হাই-কোয়ালিটি ডিজিটাল প্লেবুকস।'
                )}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                <span>{t('Explore Digital Products', 'ডিজিটাল প্রোডাক্টস')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED COURSES SHOWCASE
          ========================================================================= */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-sky-400 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
                {t('Certified Curriculums', 'সার্টিফায়েড কোর্স')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t('Flagship Online Masterclasses', 'জনপ্রিয় অনলাইন ট্রেডিং মাস্টারক্লাস')}
              </h2>
            </div>
            <button 
              onClick={() => setView('courses')}
              className="mt-4 md:mt-0 text-sky-400 hover:text-sky-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t('View All Courses', 'সকল কোর্স দেখুন')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div 
                key={course.id}
                className="bg-[#04081c]/70 border border-white/10 hover:border-sky-400/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-[#020512]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-sky-400 border border-white/10 font-bold">
                      {course.level}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 border border-white/10">
                      {course.duration_hours}h • {course.total_lessons} {t('Lessons', 'ক্লাস')}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 
                      onClick={() => setView('course-details', course.slug)}
                      className="text-base font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 cursor-pointer mb-2"
                    >
                      {t(course.title_en, course.title_bn)}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {t(course.short_desc_en, course.short_desc_bn)}
                    </p>

                    <div className="text-[11px] text-slate-400 border-t border-white/5 pt-3 flex items-center justify-between">
                      <span className="truncate">{course.instructor_name}</span>
                      <span className="text-amber-400 font-bold flex items-center gap-1 font-mono">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.9</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 pt-0 border-t border-white/5 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-white font-mono">
                      {formatPrice(course.discount_usd || course.price_usd, course.discount_bdt || course.price_bdt)}
                    </span>
                    {course.discount_bdt && (
                      <span className="text-xs text-slate-400 line-through font-mono ml-2">
                        {formatPrice(course.price_usd, course.price_bdt)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setView('course-details', course.slug)}
                      className="px-3.5 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      {t('Syllabus', 'সিলেবাস')}
                    </button>
                    <button
                      onClick={() => { addToCart(course, 'course'); setView('checkout'); }}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold rounded-lg shadow-md transition-colors cursor-pointer"
                    >
                      {t('Enroll', 'এনরোল')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PRECISION INDICATORS & DIGITAL TOOLS SHOWCASE
          ========================================================================= */}
      <section className="py-20 border-t border-white/5 bg-[#030615]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-sky-400 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
                {t('Algorithmic Tools', 'ট্রেডিং সফটওয়্যার')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t('Proprietary TradingView & MT5 Indicators', 'ট্রেডিংভিউ ও মেটাট্রেডার ইন্ডিকেটরস')}
              </h2>
            </div>
            <button 
              onClick={() => setView('indicators')}
              className="mt-4 md:mt-0 text-sky-400 hover:text-sky-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t('View All Indicators', 'সকল ইন্ডিকেটর দেখুন')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredIndicators.map((product) => (
              <div 
                key={product.id}
                className="bg-[#04081c]/70 border border-white/10 hover:border-sky-400/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-sky-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-sky-400 border border-sky-400/30 font-bold">
                      {product.platform || 'TradingView'}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 border border-white/10">
                      {product.license_type || 'Lifetime License'}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 
                      onClick={() => setView('product-details', product.slug)}
                      className="text-base font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 cursor-pointer mb-2"
                    >
                      {t(product.title_en, product.title_bn)}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {t(product.short_desc_en, product.short_desc_bn)}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-white/5 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-white font-mono">
                      {formatPrice(product.discount_usd || product.price_usd, product.discount_bdt || product.price_bdt)}
                    </span>
                    {product.discount_bdt && (
                      <span className="text-xs text-slate-400 line-through font-mono ml-2">
                        {formatPrice(product.price_usd, product.price_bdt)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setView('product-details', product.slug)}
                      className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      {t('Details', 'বিস্তারিত')}
                    </button>
                    <button
                      onClick={() => { addToCart(product, 'product'); setView('checkout'); }}
                      className="px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 text-xs font-extrabold rounded-lg shadow-md transition-all cursor-pointer"
                    >
                      {t('Get Tool', 'কিনুন')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. STUDENT TESTIMONIALS & TRUST PROOF
          ========================================================================= */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sky-400 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
              {t('Verified Student Success', 'শিক্ষার্থীদের মতামত')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('Trusted by 4,800+ Funded Traders', '৪,৮০০+ ট্রেডার ও লার্নারদের আস্থা')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((rev) => (
              <div 
                key={rev.id}
                className="p-6 rounded-2xl bg-[#04081c]/60 border border-white/10 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                    "{t(rev.comment_en, rev.comment_bn)}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <h4 className="text-white text-xs font-bold">{rev.author}</h4>
                    <span className="text-[10px] text-sky-400 font-mono block">{t(rev.role_en, rev.role_bn)}</span>
                  </div>
                  {rev.country && (
                    <span className="text-[10px] text-slate-400 font-mono">{rev.country}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. TELEGRAM VIP COMMUNITY CTA
          ========================================================================= */}
      <section className="py-16 border-t border-white/10 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#071435] to-blue-950/60 border border-sky-400/30 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-[10px] font-mono font-bold uppercase">
                <Send className="w-3 h-3" />
                <span>{t('FREE COMMUNITY ACCESS', 'ফ্রি টেলিগ্রাম গ্রুপ')}</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {t('Join 4,800+ Bangladeshi Traders in Our Telegram Desk', 'আমাদের অফিসিয়াল টেলিগ্রাম কমিউনিটিতে যুক্ত হোন')}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(
                  'Get daily market outlooks, institutional killzone updates, free cheat sheets, and ask questions directly to our mentor desk.',
                  'প্রতিদিনের মার্কেট আউটলুক, লাইভ চার্ট অ্যানালাইসিস এবং ট্রেডিং সংক্রান্ত যেকোনো প্রশ্নের উত্তর পেতে আজই যুক্ত হোন।'
                )}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={settings.contactTelegramGroup}
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition-transform flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>{t('Join Telegram Channel', 'টেলিগ্রাম চ্যানেলে যোগ দিন')}</span>
                </a>
                
                <button
                  onClick={() => setView('courses')}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors"
                >
                  {t('Explore Masterclasses', 'কোর্সসমূহ দেখুন')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
