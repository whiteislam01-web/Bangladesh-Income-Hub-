/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, Sliders, ArrowRight, PlayCircle, GraduationCap, TrendingUp, 
  BookOpen, Star, HelpCircle, Check, Award, Lock, Download, ShieldCheck, 
  Send, Mail, Phone, Calendar, Clock, Sparkles, ChevronDown, CheckCircle, 
  HardDriveDownload, User, ExternalLink, MessageCircle
} from 'lucide-react';
import { Course, Product, BlogPost } from '../types';
import { ProductCard } from './ProductCard';

/* ==========================================================================
   1. COURSES CATALOG VIEW
   ========================================================================== */
export const CoursesView: React.FC = () => {
  const { courses, setView, formatPrice, addToCart, t } = useApp();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');

  const filtered = courses.filter(c => {
    if (!c.is_published) return false;
    const matchesSearch = 
      c.title_en.toLowerCase().includes(search.toLowerCase()) ||
      c.title_bn.includes(search) ||
      c.short_desc_en.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || c.level === levelFilter || c.level === 'All Levels';
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-widest block">
          {t('Structured Education', 'স্ট্রাকচার্ড কোর্স কারিকুলাম')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('Institutional Trading Masterclasses', 'প্রাতিষ্ঠানিক ট্রেডিং মাস্টারক্লাস')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t(
            'Master Smart Money Concepts, institutional order flow, algorithmic execution, and prop-firm risk management. All masterclasses include step-by-step HD videos in Bangla, downloadable resources, and lifetime LMS access.',
            'সহজ বাংলায় রেকর্ডেড এইচডি ভিডিও, প্র্যাকটিস ফাইল ও নিয়মিত মেন্টর সাপোর্ট সহ সম্পূর্ণ কোর্সসমূহ। আজীবন এক্সেস এবং প্রপ ফার্ম পাস করার গাণিতিক কৌশল।'
          )}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-6 flex items-center gap-2.5 bg-[#04081c]/80 border border-white/10 rounded-xl px-4 py-2 focus-within:border-sky-400 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={t('Search masterclasses, topics, instructor...', 'কোর্স বা বিষয় খুঁজুন...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-6 flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-colors whitespace-nowrap cursor-pointer ${
                levelFilter === lvl 
                  ? 'bg-sky-500 text-slate-950 shadow-md' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {lvl === 'all' ? t('All Levels', 'সকল লেভেল') : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map(course => (
          <div 
            key={course.id}
            className="bg-[#04081c]/70 border border-white/10 hover:border-sky-400/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
          >
            <div>
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-[#020512]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-sky-400 border border-white/10 font-bold">
                  {course.level}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 border border-white/10">
                  {course.duration_hours}h • {course.total_lessons} {t('Lessons', 'ক্লাস')}
                </div>
              </div>

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
  );
};

/* ==========================================================================
   2. COURSE DETAILS VIEW (Full Curriculum & Syllabus)
   ========================================================================= */
export const CourseDetailsView: React.FC = () => {
  const { courses, activeSlug, setView, startLearningCourse, addToCart, hasAccessToCourse, formatPrice, lang, t } = useApp();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const course = courses.find(c => c.slug === activeSlug || c.id === activeSlug) || courses[0];
  if (!course) return null;

  const isEnrolled = hasAccessToCourse(course.id);
  const priceUsd = course.discount_usd || course.price_usd;
  const priceBdt = course.discount_bdt || course.price_bdt;

  const toggleModule = (id: string) => {
    setActiveModule(activeModule === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      
      {/* Top Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-400 font-mono">
        <button onClick={() => setView('courses')} className="hover:text-white transition-colors cursor-pointer">
          {t('Courses', 'কোর্সসমূহ')}
        </button>
        <span>/</span>
        <span className="text-sky-400 truncate max-w-sm">{t(course.title_en, course.title_bn)}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Full Content & Curriculum */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Header Block */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] font-mono font-bold uppercase">
                {course.level}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {course.duration_hours}h {t('total video', 'ভিডিও')} • {course.total_lessons} {t('lessons', 'ক্লাস')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {t(course.title_en, course.title_bn)}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
              {t(course.full_desc_en, course.full_desc_bn)}
            </p>
          </div>

          {/* What You Will Learn */}
          <div className="p-6 rounded-2xl bg-[#04081c]/60 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-400" />
              <span>{t('What You Will Learn', 'এই কোর্সে আপনি যা শিখবেন')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(lang === 'bn' ? course.learning_outcomes_bn : course.learning_outcomes_en).map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Interactive Curriculum Accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" />
                <span>{t('Course Curriculum & Modules', 'সম্পূর্ণ কোর্স সিলেবাস')}</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {course.modules.length} {t('Modules', 'মডিউল')} • {course.total_lessons} {t('Lessons', 'ক্লাস')}
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod) => {
                const isOpen = activeModule === mod.id || activeModule === null;
                return (
                  <div 
                    key={mod.id}
                    className="border border-white/10 rounded-2xl overflow-hidden bg-[#030616]"
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-4 text-left flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <div className="font-bold text-xs sm:text-sm text-white">
                        {t(mod.title_en, mod.title_bn)}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-mono">{mod.lessons.length} {t('lessons', 'ক্লাস')}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-3 space-y-1.5 border-t border-white/5 bg-[#02040d]">
                        {mod.lessons.map(lesson => (
                          <div 
                            key={lesson.id}
                            className="p-3 rounded-xl flex items-center justify-between text-xs hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <PlayCircle className="w-4 h-4 text-sky-400 shrink-0" />
                              <span className="text-slate-300 font-medium truncate">{t(lesson.title_en, lesson.title_bn)}</span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-3">
                              {lesson.is_free_preview && (
                                <button
                                  onClick={() => startLearningCourse(course.slug, lesson.id)}
                                  className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer"
                                >
                                  {t('Free Preview', 'ফ্রি প্রিভিউ')}
                                </button>
                              )}
                              <span className="text-[10px] font-mono text-slate-500">
                                {lesson.duration_minutes}m
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructor Bio Box */}
          <div className="p-6 rounded-2xl bg-[#04081c]/60 border border-white/10 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-0.5">
                {t('Masterclass Instructor', 'কোর্স ইন্সট্রাক্টর')}
              </span>
              <h4 className="text-white text-base font-bold">{course.instructor_name}</h4>
              <p className="text-[11px] text-slate-400 font-mono mb-2">{course.instructor_role}</p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{course.instructor_bio}</p>
            </div>
          </div>

        </div>

        {/* Right Sticky Card: Pricing & Enrollment Action */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="p-6 rounded-3xl bg-[#04081c]/90 border border-sky-400/25 shadow-2xl space-y-6">
            <div className="aspect-video rounded-2xl overflow-hidden relative">
              <img src={course.thumbnail} alt={course.title_en} className="w-full h-full object-cover" />
              <button 
                onClick={() => startLearningCourse(course.slug)}
                className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6 fill-slate-950 text-white" />
                </div>
              </button>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {formatPrice(priceUsd, priceBdt)}
                </span>
                {course.discount_bdt && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    {formatPrice(course.price_usd, course.price_bdt)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-400 font-mono font-semibold block">
                ✓ {t('Includes Lifetime Updates & Discord Community', 'লাইফটাইম এক্সেস ও মেন্টর সাপোর্ট')}
              </span>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              {isEnrolled ? (
                <button
                  onClick={() => startLearningCourse(course.slug)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform cursor-pointer flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{t('Continue Learning in LMS', 'কোর্সে প্রবেশ করুন')}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { addToCart(course, 'course'); setView('checkout'); }}
                    className="w-full py-4 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{t('Enroll with bKash / Nagad', 'বিকাশ / নগদে ভর্তি হোন')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => { addToCart(course, 'course'); setView('cart'); }}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors cursor-pointer"
                  >
                    {t('Add to Cart', 'কার্টে যুক্ত করুন')}
                  </button>
                </>
              )}
            </div>

            {/* Guarantees List */}
            <div className="border-t border-white/5 pt-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-400" />
                <span>{course.duration_hours}h {t('on-demand HD video lectures', 'অন-ডিমান্ড এইচডি ভিডিও')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-400" />
                <span>{t('Downloadable SMC Playbooks & Cheat Sheets', 'ডাউনলোডেবল চেকলিস্ট ও পিডিএফ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-400" />
                <span>{t('Mobile, Tablet & Desktop Friendly LMS', 'মোবাইল ও কম্পিউটারে দেখার সুবিধা')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-400" />
                <span>{t('BDIH Course Completion Certificate', 'কোর্স কমপ্লিশন সার্টিফিকেট')}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ==========================================================================
   3. INDICATORS VIEW (TradingView & MT4/MT5 Tools)
   ========================================================================== */
export const IndicatorsView: React.FC = () => {
  const { products, setView, t } = useApp();
  const [platformFilter, setPlatformFilter] = useState<'all' | 'TradingView' | 'MT5' | 'MT4'>('all');

  const indicators = products.filter(p => {
    if (!p.is_active || p.type !== 'indicator') return false;
    if (platformFilter === 'all') return true;
    return p.platform === platformFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      <div className="mb-10 space-y-3">
        <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-widest block">
          {t('Algorithmic Precision', 'অ্যালগরিদমিক সফটওয়্যার')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('Precision Trading Indicators & Scripts', 'ট্রেডিং ইন্ডিকেটরস ও স্ক্রিপ্টস')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t(
            'Proprietary tools for TradingView (Pine Script v5) and MetaTrader 5/4. Eliminate emotional charting mistakes with automated Order Block mapping, Fair Value Gap detection, and Session Killzone alerts.',
            'ট্রেডিংভিউ ও মেটাট্রেডারের জন্য তৈরি বিশেষ ইন্ডিকেটর যা চার্টে স্বয়ংক্রিয়ভাবে প্রাতিষ্ঠানিক অর্ডার ব্লক ও লিকুইডিটি চিহ্নিত করে দেয়।'
          )}
        </p>
      </div>

      {/* Platform Filter Buttons */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        {(['all', 'TradingView', 'MT5', 'MT4'] as const).map(plat => (
          <button
            key={plat}
            onClick={() => setPlatformFilter(plat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              platformFilter === plat 
                ? 'bg-sky-500 text-slate-950 font-black shadow-md' 
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {plat === 'all' ? t('All Platforms', 'সকল প্ল্যাটফর্ম') : plat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {indicators.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   4. DIGITAL PRODUCTS VIEW (Notion Templates, Ebooks, Utilities)
   ========================================================================== */
export const ProductsView: React.FC = () => {
  const { products, t } = useApp();
  const [typeFilter, setTypeFilter] = useState<'all' | 'template' | 'ebook' | 'software'>('all');

  const digitalTools = products.filter(p => {
    if (!p.is_active) return false;
    if (typeFilter === 'all') return true;
    return p.type === typeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      <div className="mb-10 space-y-3">
        <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-widest block">
          {t('Digital Toolkit', 'ডিজিটাল প্রোডাক্টস')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('Trading Operating Systems & Playbooks', 'ট্রেডিং টেমপ্লেটস, ইবুক ও সফটওয়্যার')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t(
            'High-utility Notion workspaces, prop-firm risk management calculators, SMC entry playbooks, and automated trading utilities.',
            'আপনার ট্রেডিং ডিসিপ্লিন ও রিস্ক নিয়ন্ত্রণে রাখার জন্য নোশন জার্নাল, ইবুক গাইড এবং স্বয়ংক্রিয় এমটি৫ ইউটিলিটি।'
          )}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        {[
          { id: 'all', label: t('All Products', 'সকল প্রোডাক্টস') },
          { id: 'template', label: t('Notion OS Templates', 'নোশন টেমপ্লেট') },
          { id: 'ebook', label: t('Ebooks & Playbooks', 'ইবুক ও প্লেবুক') },
          { id: 'software', label: t('Software Utilities', 'ট্রেডিং সফটওয়্যার') },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setTypeFilter(item.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              typeFilter === item.id 
                ? 'bg-sky-500 text-slate-950 font-black shadow-md' 
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {digitalTools.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   5. PRODUCT DETAILS VIEW
   ========================================================================== */
export const ProductDetailsView: React.FC = () => {
  const { products, activeSlug, setView, addToCart, formatPrice, hasAccessToProduct, t } = useApp();

  const product = products.find(p => p.slug === activeSlug || p.id === activeSlug) || products[0];
  if (!product) return null;

  const hasAccess = hasAccessToProduct(product.id);
  const priceUsd = product.discount_usd || product.price_usd;
  const priceBdt = product.discount_bdt || product.price_bdt;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-400 font-mono">
        <button onClick={() => setView('indicators')} className="hover:text-white transition-colors cursor-pointer">
          {product.type === 'indicator' ? t('Indicators', 'ইন্ডিকেটরস') : t('Products', 'প্রোডাক্টস')}
        </button>
        <span>/</span>
        <span className="text-sky-400 truncate max-w-sm">{t(product.title_en, product.title_bn)}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Media & Description */}
        <div className="lg:col-span-8 space-y-8">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 relative bg-[#030616]">
            <img src={product.image} alt={product.title_en} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] font-mono font-bold uppercase">
                {product.platform || 'Digital Tool'}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                {product.license_type || 'Lifetime Access'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t(product.title_en, product.title_bn)}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
              {t(product.full_desc_en, product.full_desc_bn)}
            </p>
          </div>

          {/* Access & Delivery Details */}
          <div className="p-6 rounded-2xl bg-[#04081c]/60 border border-white/10 space-y-3">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>{t('Instant Digital Delivery Instructions', 'ডিজিটাল ডেলিভারি ও ব্যবহার পদ্ধতি')}</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {t(
                product.access_instructions_en || 'Upon payment approval via bKash/Nagad/Rocket, this tool is instantly unlocked on your dashboard. You will receive direct file downloads, source code, and a step-by-step video installation guide.',
                product.access_instructions_bn || 'বিকাশ, নগদ বা রকেটে পেমেন্ট ভেরিফাই হওয়ার সাথে সাথে আপনার ড্যাশবোর্ডে ফাইল ডাউনলোড ও লাইসেন্স কি দৃশ্যমান হবে।'
              )}
            </p>
          </div>
        </div>

        {/* Right Sticky Card */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="p-6 rounded-3xl bg-[#04081c]/90 border border-sky-400/25 shadow-2xl space-y-6">
            <div>
              <span className="text-xs text-slate-400 font-mono uppercase tracking-widest block mb-1">
                {t('One-Time Purchase', 'এককালীন পেমেন্ট')}
              </span>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-3xl font-black text-white font-mono">
                  {formatPrice(priceUsd, priceBdt)}
                </span>
                {product.discount_bdt && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    {formatPrice(product.price_usd, product.price_bdt)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-400 font-mono font-semibold block">
                ✓ {t('No monthly subscription fees', 'কোনো মাসিক ফি নেই')}
              </span>
            </div>

            <div className="space-y-3">
              {hasAccess ? (
                <button
                  onClick={() => setView('my-products')}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('Download in My Products', 'ডাউনলোড ফাইলে যান')}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { addToCart(product, 'product'); setView('checkout'); }}
                    className="w-full py-4 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{t('Buy with bKash / Nagad', 'বিকাশ / নগদে কিনুন')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => { addToCart(product, 'product'); setView('cart'); }}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors cursor-pointer"
                  >
                    {t('Add to Cart', 'কার্টে রাখুন')}
                  </button>
                </>
              )}
            </div>

            <div className="border-t border-white/5 pt-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-400" />
                <span>{t('Verified authentic PineScript / MQL5 code', 'যাচাইকৃত আসল কোড')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-400" />
                <span>{t('Instant download link upon verification', 'ইনস্ট্যান্ট ডিজিটাল ডাউনলোড')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-sky-400" />
                <span>{t('Dedicated Telegram setup support desk', 'টেলিগ্রাম ইন্সটলেশন সাপোর্ট')}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ==========================================================================
   6. BLOG & EDUCATIONAL ARTICLES VIEW
   ========================================================================== */
export const BlogView: React.FC = () => {
  const { blogs, setView, t } = useApp();
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  if (activeBlog) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
        <button
          onClick={() => setActiveBlog(null)}
          className="mb-6 flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>{t('Back to all articles', 'সকল আর্টিকেলে ফিরে যান')}</span>
        </button>

        <div className="aspect-video w-full rounded-3xl overflow-hidden mb-8 border border-white/10">
          <img src={activeBlog.image} alt={activeBlog.title_en} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="text-sky-400">{activeBlog.category}</span>
            <span>•</span>
            <span>{activeBlog.date}</span>
            <span>•</span>
            <span>{activeBlog.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {t(activeBlog.title_en, activeBlog.title_bn)}
          </h1>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line border-t border-white/5 pt-8">
          {t(activeBlog.content_en, activeBlog.content_bn)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      <div className="mb-12 space-y-3">
        <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-widest block">
          {t('Knowledge Base', 'ফ্রি ট্রেডিং নলেজ')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('Trading Insights & Prop Firm Strategies', 'ট্রেডিং অ্যানালাইসিস ও স্ট্র্যাটেজি ব্লগ')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          {t(
            'In-depth guides on institutional market mechanics, avoiding retail liquidity traps, and passing prop firm evaluations.',
            'ফ্রি স্ট্র্যাটেজি গাইড, মার্কেট আউটলুক এবং প্রপ ফার্ম পাস করার কার্যকরী টিপস।'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map(blog => (
          <div 
            key={blog.id}
            onClick={() => setActiveBlog(blog)}
            className="bg-[#04081c]/70 border border-white/10 hover:border-sky-400/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group cursor-pointer"
          >
            <div>
              <div className="aspect-video w-full overflow-hidden">
                <img src={blog.image} alt={blog.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[10px] font-mono text-sky-400 uppercase tracking-widest mb-2">
                  <span>{blog.category}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 mb-3">
                  {t(blog.title_en, blog.title_bn)}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {t(blog.excerpt_en, blog.excerpt_bn)}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono mt-4">
              <span>{blog.author}</span>
              <span className="text-sky-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t('Read Guide', 'পড়ুন')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   7. ABOUT VIEW
   ========================================================================== */
export const AboutView: React.FC = () => {
  const { setView, t } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-100 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-widest block">
          {t('About BDIH', 'আমাদের পরিচিতি')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t('Pioneering Institutional Financial Education in Bangladesh', 'বাংলাদেশে আধুনিক স্মার্ট মানি ট্রেডিং এডুকেশন')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t(
            'Bangladesh Income Hub (BDIH) was established to replace subjective retail trading myths with institutional algorithmic principles, verified prop-firm passing blueprints, and high-performance digital tools.',
            'ভুলভাল রিটেইল ইন্ডিকেটরের ফাঁদ এড়িয়ে সঠিক প্রাতিষ্ঠানিক স্মার্ট মানি কনসেপ্টস (SMC) এবং নির্ভরযোগ্য সফটওয়্যার দিয়ে বাংলাদেশি তরুণদের আর্থিক স্বাবলম্বিতা অর্জনে সহায়তা করাই আমাদের লক্ষ্য।'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 text-center space-y-2">
          <div className="text-3xl font-black text-sky-400 font-mono">4,800+</div>
          <div className="text-white font-bold text-sm">{t('Students Enrolled', 'মোট শিক্ষার্থী')}</div>
          <p className="text-xs text-slate-400">{t('Across Dhaka, Chittagong, Sylhet and global diaspora.', 'সারা দেশে ও প্রবাসে ছড়িয়ে থাকা শিক্ষার্থী।')}</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 text-center space-y-2">
          <div className="text-3xl font-black text-emerald-400 font-mono">$340,000+</div>
          <div className="text-white font-bold text-sm">{t('Prop Firm Funding Passed', 'ফান্ডেড পাস মাইলফলক')}</div>
          <p className="text-xs text-slate-400">{t('Achieved by BDIH masterclass graduates in FTMO and FundedNext.', 'শিক্ষার্থীদের ভেরিফাইড ফান্ডিং অর্জন।')}</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 text-center space-y-2">
          <div className="text-3xl font-black text-amber-400 font-mono">100%</div>
          <div className="text-white font-bold text-sm">{t('Bangla LMS Curriculum', 'সহজ বাংলায় কারিকুলাম')}</div>
          <p className="text-xs text-slate-400">{t('Clear HD videos, PDFs, and lifetime Telegram mentor support.', 'এইচডি রেকর্ডেড ক্লাস ও সার্বক্ষণিক মেন্টর গাইড।')}</p>
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          onClick={() => setView('courses')}
          className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform cursor-pointer"
        >
          {t('Explore Our Courses', 'কোর্সসমূহ দেখুন')}
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   8. CONTACT VIEW
   ========================================================================== */
export const ContactView: React.FC = () => {
  const { settings, t } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-widest block">
          {t('Get in Touch', 'যোগাযোগ')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('Official Support & Community Desk', 'অফিসিয়াল সাপোর্ট ও হেল্প ডেস্ক')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {t(
            'Need help choosing a masterclass, verifying your bKash payment, or setting up indicators? We are here to assist you.',
            'কোর্স এনরোলমেন্ট, পেমেন্ট ভেরিফিকেশন বা ইন্ডিকেটর সেটআপ সংক্রান্ত যেকোনো প্রয়োজনে যোগাযোগ করুন।'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contact Channels */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#04081c]/80 border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">{t('Official Telegram Desk', 'টেলিগ্রাম কমিউনিটি ও সাপোর্ট')}</h3>
              <p className="text-xs text-slate-400 mt-1 mb-2">{t('Fastest reply for students and traders.', 'সবচেয়ে দ্রুত উত্তরের জন্য সরাসরি টেলিগ্রামে নক দিন।')}</p>
              <a href={settings.contactTelegram} target="_blank" rel="noreferrer" className="text-xs text-sky-400 font-bold hover:underline font-mono">
                {settings.ownerTelegramUsername || '@bdih_official'} →
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#04081c]/80 border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">{t('Email Support', 'ইমেইল সাপোর্ট')}</h3>
              <p className="text-xs text-slate-400 mt-1 mb-2">{t('For invoice queries, receipts and partnerships.', 'ইনভয়েস ও পার্টনারশিপ সংক্রান্ত তথ্য।')}</p>
              <a href={`mailto:${settings.contactEmail}`} className="text-xs text-sky-400 font-mono hover:underline">
                {settings.contactEmail}
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#04081c]/80 border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">{t('Verification Help Hours', 'সাপোর্ট সময়')}</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {settings.customTimeText || 'প্রতিদিন সকাল ০৯:০০ - রাত ১১:০০ টা'}
              </p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#04081c]/80 border border-white/10">
          <h3 className="text-white font-bold text-base mb-4">{t('Send a Direct Query', 'মেসেজ পাঠান')}</h3>
          
          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-white font-bold text-sm">{t('Message Sent Successfully!', 'মেসেজ পাঠানো হয়েছে!')}</div>
              <p className="text-xs text-slate-300">{t('Our mentor team will reply via email or Telegram shortly.', 'আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">{t('Your Name', 'আপনার নাম')}</label>
                <input 
                  required
                  type="text" 
                  placeholder="Kazi Farhan"
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">{t('Email Address', 'ইমেইল অ্যাড্রেস')}</label>
                <input 
                  required
                  type="email" 
                  placeholder="farhan@example.com"
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">{t('Telegram Username or Phone (optional)', 'টেলিগ্রাম বা মোবাইল নাম্বার')}</label>
                <input 
                  type="text" 
                  placeholder="@your_username or 017xxxxxxxx"
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">{t('Your Message', 'আপনার বার্তা')}</label>
                <textarea 
                  required
                  rows={4}
                  placeholder={t('Tell us which course or indicator you need help with...', 'আপনার প্রশ্ন বা জিজ্ঞাসা লিখুন...')}
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                {t('Submit Query', 'মেসেজ পাঠান')}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
