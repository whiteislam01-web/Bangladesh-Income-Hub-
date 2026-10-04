/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getSupabaseConfigStatus } from '../lib/supabase';
import { isAuthorizedForAdmin, isAuthorizedForOwner, hasPermission } from '../lib/auth/rbac';
import { ForbiddenView } from './SecurityViews';
import { 
  LayoutDashboard, GraduationCap, TrendingUp, ShoppingBag, Folder, Settings, 
  Star, Users, HelpCircle, Edit, Plus, Trash2, CheckCircle, XCircle, DollarSign, 
  Wallet, ShieldCheck, Eye, PlayCircle, BookOpen, Clock, AlertTriangle, ArrowRight,
  ExternalLink, Download, Database, Lock
} from 'lucide-react';
import { Course, CourseModule, CourseLesson, Product, Category, FAQ, Review, BlogPost, SiteSettings, AdminTab } from '../types';

export const AdminPanel: React.FC = () => {
  const { 
    courses, addCourse, updateCourse, deleteCourse,
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, deleteCategory,
    orders, approveOrder, rejectOrder,
    entitlements, revokeEntitlement,
    reviews, updateReview,
    blogs, addBlog, deleteBlog,
    faqs, addFAQ, deleteFAQ,
    settings, updateSettings,
    adminTab, setAdminTab,
    currentUser, setView,
    formatPrice, t 
  } = useApp();

  const [activeTab, setActiveTabInternal] = useState<AdminTab>(adminTab || 'dashboard');
  const supabaseStatus = getSupabaseConfigStatus();

  // Deny-by-default access guard
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-slate-100 text-center">
        <div className="p-8 rounded-3xl bg-[#04081c]/90 border border-white/10 shadow-2xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">{t('Administrative Login Required', 'অ্যাডমিন লগইন প্রয়োজন')}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('You must be authenticated with verified staff or owner credentials to access this console.', 'এই প্যানেলে প্রবেশ করতে অ্যাডমিন একাউন্টে সাইন ইন করুন।')}
          </p>
          <button 
            onClick={() => setView('login')}
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg"
          >
            {t('Go to Login', 'লগইনে যান')}
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthorizedForAdmin(currentUser)) {
    return <ForbiddenView />;
  }

  const handleTabChange = (tab: AdminTab) => {
    setActiveTabInternal(tab);
    setAdminTab(tab);
  };

  // Metrics calculation
  const approvedOrders = orders.filter(o => o.paymentProofStatus === 'approved');
  const pendingOrders = orders.filter(o => o.paymentProofStatus === 'pending');
  const totalRevenueBDT = approvedOrders.reduce((acc, curr) => acc + curr.totalAmountBDT, 0);
  const totalRevenueUSD = approvedOrders.reduce((acc, curr) => acc + curr.totalAmountUSD, 0);

  // Modal / Form States
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title_en: '',
    title_bn: '',
    short_desc_en: '',
    short_desc_bn: '',
    full_desc_en: '',
    full_desc_bn: '',
    price_bdt: 6000,
    price_usd: 50,
    discount_bdt: 4500,
    discount_usd: 38,
    level: 'All Levels',
    duration_hours: 12,
    total_lessons: 10,
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    instructor_name: 'Engr. Tanvir Ahmed',
    instructor_role: 'Senior Market Analyst',
    instructor_bio: 'Funded trader and institutional SMC mentor.',
    is_published: true,
    is_featured: true,
    tags: ['SMC', 'Forex'],
    learning_outcomes_en: ['Understand institutional liquidity engineering'],
    learning_outcomes_bn: ['প্রাতিষ্ঠানিক লিকুইডিটি মডেল আয়ত্ত করা'],
    modules: [
      {
        id: 'mod-1',
        title_en: 'Module 1: Foundations',
        title_bn: 'মডিউল ১: প্রাথমিক ভিত্তি',
        order: 1,
        lessons: [
          {
            id: 'les-1',
            title_en: '1.1 Introduction',
            title_bn: '১.১ পরিচিতি',
            order: 1,
            duration_minutes: 30,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: true
          }
        ]
      }
    ]
  });

  // Product / Indicator Form State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProd, setNewProd] = useState<Partial<Product>>({
    title_en: '',
    title_bn: '',
    short_desc_en: '',
    short_desc_bn: '',
    full_desc_en: '',
    full_desc_bn: '',
    price_bdt: 3600,
    price_usd: 30,
    category: 'tradingview-indicators',
    type: 'indicator',
    platform: 'TradingView',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    is_featured: true,
    download_file_url: 'https://bdih.com/indicators/script.pine',
    license_type: 'Lifetime',
    tags: ['Indicator', 'TradingView']
  });

  // Settings State
  const [modSettings, setModSettings] = useState<SiteSettings>({ ...settings });

  // Course Save Handler
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(editingCourse);
      setEditingCourse(null);
    } else {
      const freshCourse: Course = {
        id: `course-${Date.now()}`,
        title_en: newCourse.title_en || 'Untitled Course',
        title_bn: newCourse.title_bn || 'নামহীন কোর্স',
        slug: (newCourse.title_en || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        short_desc_en: newCourse.short_desc_en || '',
        short_desc_bn: newCourse.short_desc_bn || '',
        full_desc_en: newCourse.full_desc_en || '',
        full_desc_bn: newCourse.full_desc_bn || '',
        price_bdt: Number(newCourse.price_bdt) || 6000,
        price_usd: Number(newCourse.price_usd) || 50,
        discount_bdt: newCourse.discount_bdt ? Number(newCourse.discount_bdt) : undefined,
        discount_usd: newCourse.discount_usd ? Number(newCourse.discount_usd) : undefined,
        level: newCourse.level || 'All Levels',
        duration_hours: Number(newCourse.duration_hours) || 10,
        total_lessons: Number(newCourse.total_lessons) || 8,
        thumbnail: newCourse.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
        instructor_name: newCourse.instructor_name || 'BDIH Instructor',
        instructor_role: newCourse.instructor_role || 'Market Analyst',
        instructor_bio: newCourse.instructor_bio || '',
        is_published: true,
        is_featured: true,
        tags: newCourse.tags || ['SMC'],
        learning_outcomes_en: newCourse.learning_outcomes_en || ['Mastering trading setups'],
        learning_outcomes_bn: newCourse.learning_outcomes_bn || ['ট্রেডিং সেটআপ আয়ত্ত করা'],
        modules: newCourse.modules || []
      };
      addCourse(freshCourse);
      setShowAddCourse(false);
    }
  };

  // Product Save Handler
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    } else {
      const freshProd: Product = {
        id: `prod-${Date.now()}`,
        title_en: newProd.title_en || 'Untitled Tool',
        title_bn: newProd.title_bn || 'নামহীন টুল',
        slug: (newProd.title_en || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        short_desc_en: newProd.short_desc_en || '',
        short_desc_bn: newProd.short_desc_bn || '',
        full_desc_en: newProd.full_desc_en || '',
        full_desc_bn: newProd.full_desc_bn || '',
        price_bdt: Number(newProd.price_bdt) || 3600,
        price_usd: Number(newProd.price_usd) || 30,
        discount_bdt: newProd.discount_bdt ? Number(newProd.discount_bdt) : undefined,
        discount_usd: newProd.discount_usd ? Number(newProd.discount_usd) : undefined,
        category: newProd.category || 'tradingview-indicators',
        type: newProd.type || 'indicator',
        platform: newProd.platform || 'TradingView',
        image: newProd.image || 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
        is_active: true,
        is_featured: true,
        download_file_url: newProd.download_file_url || 'https://bdih.com/downloads/tool.zip',
        license_type: newProd.license_type || 'Lifetime',
        tags: newProd.tags || ['Indicator']
      };
      addProduct(freshProd);
      setShowAddProduct(false);
    }
  };

  const [settingsSavedMessage, setSettingsSavedMessage] = useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(modSettings);
    setSettingsSavedMessage('BDIH Settings Saved Successfully!');
    setTimeout(() => setSettingsSavedMessage(null), 4000);
  };

  return (
    <div id="bdih_admin_cms_panel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-slate-100">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold">BDIH MASTER CONTROL DESK</span>
            <span className="text-slate-600">•</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              supabaseStatus.isConfigured 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {supabaseStatus.isConfigured ? 'Supabase Live' : 'Supabase Local Storage Mode'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Owner CMS & Verification Hub
          </h1>
        </div>

        {pendingOrders.length > 0 && (
          <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
            <Clock className="w-4 h-4 animate-spin" />
            <span>{pendingOrders.length} {t('Pending Payment Approvals', 'পেমেন্ট অনুমোদনের অপেক্ষায়')}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-[#04081c]/80 border border-white/10 rounded-2xl p-4 space-y-1.5">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'orders', label: 'Payment Approvals', icon: CheckCircle, badge: pendingOrders.length },
            { id: 'courses', label: 'Courses & LMS', icon: GraduationCap, badge: courses.length },
            { id: 'products', label: 'Indicators & Tools', icon: TrendingUp, badge: products.length },
            { id: 'entitlements', label: 'Student Entitlements', icon: ShieldCheck, badge: entitlements.length },
            { id: 'blogs', label: 'Blog & Articles', icon: BookOpen },
            { id: 'faqs', label: 'FAQs Desk', icon: HelpCircle },
            { id: 'reviews', label: 'Reviews & Proof', icon: Star },
            { id: 'settings', label: 'Payment & Site Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-sky-500 text-slate-950 font-black shadow-md' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                    isActive ? 'bg-slate-950 text-sky-400' : 'bg-sky-500/20 text-sky-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Right Main Management Canvas */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: DASHBOARD METRICS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Total Verified Revenue</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">৳{totalRevenueBDT.toLocaleString()}</div>
                  <span className="text-[11px] text-emerald-400 font-mono">(${totalRevenueUSD} USD)</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active Entitlements</span>
                  <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">{entitlements.length}</div>
                  <span className="text-[11px] text-slate-400">Unlocked Courses & Licenses</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Total Masterclasses</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{courses.length}</div>
                  <span className="text-[11px] text-slate-400">{products.length} Digital Indicators</span>
                </div>
              </div>

              {/* Quick Pending Approvals Table */}
              <div className="p-6 rounded-3xl bg-[#04081c]/80 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sky-400" />
                    <span>Recent Payment Submissions</span>
                  </h3>
                  <button onClick={() => handleTabChange('orders')} className="text-xs text-sky-400 hover:underline">
                    View All Orders →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-mono">{o.id}</strong>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300">{o.customerName} ({o.customerPhone})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          TrxID: <span className="text-sky-300 font-mono font-bold">{o.transactionId}</span> via <span className="uppercase text-amber-300">{o.gatewayName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-white">{formatPrice(o.totalAmountUSD, o.totalAmountBDT)}</span>
                        {o.paymentProofStatus === 'pending' ? (
                          <button
                            onClick={() => approveOrder(o.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                          >
                            Approve & Unlock ✓
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono text-emerald-400">✓ Approved</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAYMENT APPROVALS DESK */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white">Manual Payment Verification Desk</h2>
                  <p className="text-xs text-slate-400">Review bKash, Nagad, Rocket TrxIDs and approve to instantly unlock course and tool entitlements.</p>
                </div>
              </div>

              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                      <div>
                        <span className="text-lg font-bold font-mono text-white mr-2">{order.id}</span>
                        <span className="text-xs text-slate-400">{order.orderDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          order.paymentProofStatus === 'approved' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : order.paymentProofStatus === 'rejected'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {order.paymentProofStatus}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 block mb-0.5">Customer</span>
                        <strong className="text-white block truncate">{order.customerName}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">{order.customerEmail}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Gateway & TrxID</span>
                        <strong className="text-amber-300 uppercase block">{order.gatewayName}</strong>
                        <span className="text-sky-300 font-mono font-bold">{order.transactionId}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Sender Number</span>
                        <strong className="text-white font-mono">{order.senderPhone || order.customerPhone}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Total Amount</span>
                        <strong className="text-emerald-400 font-mono text-sm">{formatPrice(order.totalAmountUSD, order.totalAmountBDT)}</strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                      <strong>Items: </strong> {order.items.map(it => it.title_en).join(', ')}
                    </div>

                    {order.paymentProofStatus === 'pending' && (
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => rejectOrder(order.id)}
                          className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => approveOrder(order.id)}
                          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                        >
                          Approve Payment & Grant Entitlements ✓
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COURSES & LMS CMS */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white">Course Management & Curriculum</h2>
                  <p className="text-xs text-slate-400">Create new masterclasses, arrange modules, add video lesson URLs and resources.</p>
                </div>
                <button
                  onClick={() => { setEditingCourse(null); setShowAddCourse(true); }}
                  className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Masterclass</span>
                </button>
              </div>

              {/* Course Create/Edit Form */}
              {showAddCourse && (
                <form onSubmit={handleSaveCourse} className="p-6 rounded-3xl bg-[#04081c] border border-sky-400/30 space-y-4">
                  <h3 className="text-white font-bold text-sm uppercase font-mono">
                    {editingCourse ? 'Edit Masterclass' : 'New Masterclass Details'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Title (English)</label>
                      <input 
                        required
                        type="text" 
                        value={editingCourse ? editingCourse.title_en : newCourse.title_en}
                        onChange={e => editingCourse ? setEditingCourse({ ...editingCourse, title_en: e.target.value }) : setNewCourse({ ...newCourse, title_en: e.target.value })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Title (বাংলা)</label>
                      <input 
                        required
                        type="text" 
                        value={editingCourse ? editingCourse.title_bn : newCourse.title_bn}
                        onChange={e => editingCourse ? setEditingCourse({ ...editingCourse, title_bn: e.target.value }) : setNewCourse({ ...newCourse, title_bn: e.target.value })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Price (BDT ৳)</label>
                      <input 
                        required
                        type="number" 
                        value={editingCourse ? editingCourse.price_bdt : newCourse.price_bdt}
                        onChange={e => editingCourse ? setEditingCourse({ ...editingCourse, price_bdt: Number(e.target.value) }) : setNewCourse({ ...newCourse, price_bdt: Number(e.target.value) })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Discount Price (BDT ৳)</label>
                      <input 
                        type="number" 
                        value={editingCourse ? (editingCourse.discount_bdt || '') : (newCourse.discount_bdt || '')}
                        onChange={e => editingCourse ? setEditingCourse({ ...editingCourse, discount_bdt: Number(e.target.value) }) : setNewCourse({ ...newCourse, discount_bdt: Number(e.target.value) })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Duration (Hours)</label>
                      <input 
                        type="number" 
                        value={editingCourse ? editingCourse.duration_hours : newCourse.duration_hours}
                        onChange={e => editingCourse ? setEditingCourse({ ...editingCourse, duration_hours: Number(e.target.value) }) : setNewCourse({ ...newCourse, duration_hours: Number(e.target.value) })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Instructor Name</label>
                      <input 
                        type="text" 
                        value={editingCourse ? editingCourse.instructor_name : newCourse.instructor_name}
                        onChange={e => editingCourse ? setEditingCourse({ ...editingCourse, instructor_name: e.target.value }) : setNewCourse({ ...newCourse, instructor_name: e.target.value })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 text-xs font-semibold block mb-1">Short Description (English)</label>
                    <textarea 
                      rows={2}
                      value={editingCourse ? editingCourse.short_desc_en : newCourse.short_desc_en}
                      onChange={e => editingCourse ? setEditingCourse({ ...editingCourse, short_desc_en: e.target.value }) : setNewCourse({ ...newCourse, short_desc_en: e.target.value })}
                      className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setShowAddCourse(false); setEditingCourse(null); }}
                      className="px-4 py-2 bg-white/5 text-slate-300 rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl"
                    >
                      Save Course
                    </button>
                  </div>
                </form>
              )}

              {/* Course List */}
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="p-5 rounded-2xl bg-[#04081c]/70 border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={course.thumbnail} alt={course.title_en} className="w-16 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-white font-bold text-sm">{course.title_en}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {course.modules.length} Modules • {course.total_lessons} Lessons • {formatPrice(course.price_usd, course.price_bdt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingCourse(course); setShowAddCourse(true); }}
                        className="p-2 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="p-2 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INDICATORS & DIGITAL TOOLS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white">Indicators & Digital Products</h2>
                  <p className="text-xs text-slate-400">Manage TradingView PineScripts, MT5 EAs, Notion templates, and ebooks.</p>
                </div>
                <button
                  onClick={() => { setEditingProduct(null); setShowAddProduct(true); }}
                  className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Digital Tool</span>
                </button>
              </div>

              {/* Product Form */}
              {showAddProduct && (
                <form onSubmit={handleSaveProduct} className="p-6 rounded-3xl bg-[#04081c] border border-sky-400/30 space-y-4">
                  <h3 className="text-white font-bold text-sm uppercase font-mono">
                    {editingProduct ? 'Edit Tool' : 'New Digital Product Details'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Title (English)</label>
                      <input 
                        required
                        type="text" 
                        value={editingProduct ? editingProduct.title_en : newProd.title_en}
                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, title_en: e.target.value }) : setNewProd({ ...newProd, title_en: e.target.value })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Title (বাংলা)</label>
                      <input 
                        required
                        type="text" 
                        value={editingProduct ? editingProduct.title_bn : newProd.title_bn}
                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, title_bn: e.target.value }) : setNewProd({ ...newProd, title_bn: e.target.value })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Platform</label>
                      <select
                        value={editingProduct ? editingProduct.platform : newProd.platform}
                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, platform: e.target.value as any }) : setNewProd({ ...newProd, platform: e.target.value as any })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-mono"
                      >
                        <option value="TradingView">TradingView (PineScript)</option>
                        <option value="MT5">MetaTrader 5 (MQL5)</option>
                        <option value="MT4">MetaTrader 4 (MQL4)</option>
                        <option value="Notion">Notion Workspace</option>
                        <option value="PDF">PDF Ebook</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Price (BDT ৳)</label>
                      <input 
                        required
                        type="number" 
                        value={editingProduct ? editingProduct.price_bdt : newProd.price_bdt}
                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, price_bdt: Number(e.target.value) }) : setNewProd({ ...newProd, price_bdt: Number(e.target.value) })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Download File URL</label>
                      <input 
                        type="text" 
                        value={editingProduct ? (editingProduct.download_file_url || '') : (newProd.download_file_url || '')}
                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, download_file_url: e.target.value }) : setNewProd({ ...newProd, download_file_url: e.target.value })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-xs font-semibold block mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={editingProduct ? editingProduct.image : newProd.image}
                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, image: e.target.value }) : setNewProd({ ...newProd, image: e.target.value })}
                        className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setShowAddProduct(false); setEditingProduct(null); }}
                      className="px-4 py-2 bg-white/5 text-slate-300 rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {products.map(prod => (
                  <div key={prod.id} className="p-5 rounded-2xl bg-[#04081c]/70 border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={prod.image} alt={prod.title_en} className="w-16 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-400/20">
                            {prod.platform || 'Tool'}
                          </span>
                          <h4 className="text-white font-bold text-sm">{prod.title_en}</h4>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                          {formatPrice(prod.price_usd, prod.price_bdt)} • {prod.license_type || 'Lifetime'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingProduct(prod); setShowAddProduct(true); }}
                        className="p-2 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-2 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: STUDENT ENTITLEMENTS */}
          {activeTab === 'entitlements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white">Active Digital Entitlements</h2>
                  <p className="text-xs text-slate-400">View unlocked student permissions and active product license keys.</p>
                </div>
              </div>

              <div className="space-y-3">
                {entitlements.map(ent => (
                  <div key={ent.id} className="p-4 rounded-xl bg-[#04081c]/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                          ACTIVE ENTITLEMENT
                        </span>
                        <strong className="text-white">{ent.title}</strong>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Student: <span className="text-slate-200">{ent.userId}</span> • Key: <span className="text-sky-300">{ent.licenseKey || 'BDIH-ACTIVE'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => revokeEntitlement(ent.id)}
                      className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Revoke Access
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#04081c] border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Site Settings & Payment Gateway Numbers</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-slate-300 text-xs font-semibold block mb-1">bKash Personal Wallet</label>
                  <input 
                    type="text" 
                    value={modSettings.paymentBkashWallet}
                    onChange={e => setModSettings({ ...modSettings, paymentBkashWallet: e.target.value })}
                    className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-semibold block mb-1">Nagad Personal Wallet</label>
                  <input 
                    type="text" 
                    value={modSettings.paymentNagadWallet}
                    onChange={e => setModSettings({ ...modSettings, paymentNagadWallet: e.target.value })}
                    className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-semibold block mb-1">Rocket Wallet</label>
                  <input 
                    type="text" 
                    value={modSettings.paymentRocketWallet}
                    onChange={e => setModSettings({ ...modSettings, paymentRocketWallet: e.target.value })}
                    className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-semibold block mb-1">Exchange Rate (1 USD = X BDT)</label>
                  <input 
                    type="number" 
                    value={modSettings.exchangeRate}
                    onChange={e => setModSettings({ ...modSettings, exchangeRate: Number(e.target.value) })}
                    className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-semibold block mb-1">Bank Account Transfer Details</label>
                  <input 
                    type="text" 
                    value={modSettings.paymentBankAccount}
                    onChange={e => setModSettings({ ...modSettings, paymentBankAccount: e.target.value })}
                    className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-xs font-semibold block mb-1">Binance Pay ID / Crypto Wallet</label>
                  <input 
                    type="text" 
                    value={modSettings.paymentBinanceId || ''}
                    onChange={e => setModSettings({ ...modSettings, paymentBinanceId: e.target.value })}
                    className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-300 text-xs font-semibold block mb-1">Announcement Banner (English)</label>
                  <input 
                    type="text" 
                    value={modSettings.announcementText_en}
                    onChange={e => setModSettings({ ...modSettings, announcementText_en: e.target.value })}
                    className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-300 text-xs font-semibold block mb-1">Official Telegram Community Link</label>
                  <input 
                    type="text" 
                    value={modSettings.contactTelegramGroup}
                    onChange={e => setModSettings({ ...modSettings, contactTelegramGroup: e.target.value })}
                    className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Supabase Environment Status */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-sky-400" />
                    <h3 className="text-white text-xs font-bold font-mono">SUPABASE CONFIGURATION & MIGRATION STATUS</h3>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    supabaseStatus.isConfigured 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {supabaseStatus.isConfigured ? 'Connected' : 'Local Fallback'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {supabaseStatus.message}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-500 block mb-0.5">Project URL:</span>
                    <strong className={supabaseStatus.hasUrl && !supabaseStatus.isPlaceholder ? 'text-emerald-400' : 'text-amber-400'}>
                      {supabaseStatus.hasUrl && !supabaseStatus.isPlaceholder ? 'Configured' : 'Missing / Placeholder'}
                    </strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-500 block mb-0.5">Publishable Key:</span>
                    <strong className={supabaseStatus.hasAnonKey && !supabaseStatus.isPlaceholder ? 'text-emerald-400' : 'text-amber-400'}>
                      {supabaseStatus.hasAnonKey && !supabaseStatus.isPlaceholder ? 'Configured (Client Safe)' : 'Missing / Placeholder'}
                    </strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-500 block mb-0.5">Migration Schema:</span>
                    <strong className="text-sky-400">001_initial_bdih_schema.sql</strong>
                  </div>
                </div>
              </div>

              {settingsSavedMessage && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{settingsSavedMessage}</span>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
