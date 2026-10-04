/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Course, CourseLesson, Product, Category, Order, Review, BlogPost, FAQ, SiteSettings, 
  Language, Currency, ViewType, AdminTab, DigitalEntitlement, CourseProgress, AuthUser, UserRole 
} from '../types';
import { 
  INITIAL_COURSES, INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_REVIEWS, 
  INITIAL_BLOGS, INITIAL_FAQS, INITIAL_SITE_SETTINGS 
} from '../data';
import { 
  supabase, 
  isSupabaseConfigured, 
  signInWithGoogleOAuth, 
  signInWithEmail, 
  signUpWithEmail, 
  signOut,
  mapSessionToAuthUser,
  saveOrderToSupabase,
  approveOrderInSupabase,
  saveCourseProgressToSupabase
} from '../utils/supabase';
import { getRolePermissions, isAuthorizedForAdmin, isAuthorizedForOwner } from '../lib/auth/rbac';

interface AppContextProps {
  // Global State & Navigation
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  currentView: ViewType;
  setView: (view: ViewType, slug?: string, extraId?: string) => void;
  activeSlug?: string;
  activeLessonId?: string;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  authReturnUrl?: string;
  setAuthReturnUrl: (url: string | undefined) => void;

  // Courses & LMS State
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  courseProgress: Record<string, CourseProgress>;
  startLearningCourse: (courseSlug: string, lessonId?: string) => void;
  markLessonCompleted: (courseId: string, lessonId: string) => void;
  getCourseProgressPercent: (courseId: string) => number;
  hasAccessToCourse: (courseId: string) => boolean;

  // Digital Products & Indicators State
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  hasAccessToProduct: (productId: string) => boolean;

  // Digital Entitlements
  entitlements: DigitalEntitlement[];
  grantEntitlement: (entitlement: DigitalEntitlement) => void;
  revokeEntitlement: (id: string) => void;

  // Categories & Content State
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;

  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  approveOrder: (orderId: string) => void;
  rejectOrder: (orderId: string) => void;

  reviews: Review[];
  addReview: (review: Review) => void;
  updateReview: (review: Review) => void;

  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;
  updateBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;

  faqs: FAQ[];
  addFAQ: (faq: FAQ) => void;
  updateFAQ: (faq: FAQ) => void;
  deleteFAQ: (id: string) => void;

  settings: SiteSettings;
  updateSettings: (settings: SiteSettings) => void;

  // Shopping Cart
  cart: { item: Product | Course; itemType: 'course' | 'product'; quantity: number }[];
  addToCart: (item: Product | Course, itemType?: 'course' | 'product') => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => { usd: number; bdt: number };

  // Auth User Space & Supabase RBAC
  currentUser: AuthUser | null;
  isSupabaseActive: boolean;
  loginAsDemoStudent: () => void;
  loginAsAdmin: () => void;
  loginAsOwner: () => void;
  setCurrentUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
  loginWithGoogle: (returnUrl?: string) => Promise<{ error: any }>;
  loginWithEmailPassword: (email: string, pass: string) => Promise<{ error: any }>;
  signUpWithEmailPassword: (email: string, pass: string, name?: string) => Promise<{ error: any }>;

  // Formatting & Localization
  formatPrice: (usd: number, bdt: number) => string;
  t: (en: string, bn: string) => string;
  tKey: (key: string, fallbackEn?: string, fallbackBn?: string) => string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('BDT'); // Default to Bangladesh Taka BDT
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activeSlug, setActiveSlug] = useState<string | undefined>(undefined);
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(undefined);
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [authReturnUrl, setAuthReturnUrl] = useState<string | undefined>(undefined);

  // Core Data Lists with localStorage Hydration
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_courses_v2');
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_products_v2');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_categories_v2');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_orders_v2');
      return saved ? JSON.parse(saved) : [
        {
          id: 'BDIH-98421',
          customerName: 'Kazi Farhan',
          customerEmail: 'student@bdih.com',
          customerPhone: '01712345678',
          telegramUsername: '@farhan_bd',
          gatewayName: 'bkash',
          transactionId: '9AKL894J92',
          senderPhone: '01712345678',
          paymentProofStatus: 'approved',
          items: [
            {
              id: 'item-1',
              productId: 'course-smc-mastery',
              title_en: 'Smart Money Concepts (SMC) & Institutional Order Flow Masterclass',
              title_bn: 'স্মার্ট মানি কনসেপ্টস (SMC) ও প্রাতিষ্ঠানিক অর্ডার ফ্লো মাস্টারক্লাস',
              price_usd: 55,
              price_bdt: 6600,
              quantity: 1,
              itemType: 'course'
            }
          ],
          totalAmountBDT: 6600,
          totalAmountUSD: 55,
          orderDate: '2026-10-01',
          trackingStatus: 'verified',
          entitlementsCreated: true
        }
      ];
    } catch {
      return [];
    }
  });

  const [entitlements, setEntitlements] = useState<DigitalEntitlement[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_entitlements_v2');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ent-1',
          orderId: 'BDIH-98421',
          userId: 'student@bdih.com',
          itemType: 'course',
          itemId: 'course-smc-mastery',
          title: 'Smart Money Concepts (SMC) & Institutional Order Flow Masterclass',
          grantedAt: '2026-10-01',
          status: 'active'
        }
      ];
    } catch {
      return [];
    }
  });

  const [courseProgress, setCourseProgress] = useState<Record<string, CourseProgress>>(() => {
    try {
      const saved = localStorage.getItem('bdih_course_progress_v2');
      return saved ? JSON.parse(saved) : {
        'course-smc-mastery': {
          userId: 'student@bdih.com',
          courseId: 'course-smc-mastery',
          completedLessonIds: ['les-1-1'],
          lastLessonId: 'les-1-2',
          progressPercent: 10,
          updatedAt: '2026-10-02'
        }
      };
    } catch {
      return {};
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_reviews_v2');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_blogs_v2');
      return saved ? JSON.parse(saved) : INITIAL_BLOGS;
    } catch {
      return INITIAL_BLOGS;
    }
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_faqs_v2');
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch {
      return INITIAL_FAQS;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('bdih_settings_v2');
      return saved ? JSON.parse(saved) : INITIAL_SITE_SETTINGS;
    } catch {
      return INITIAL_SITE_SETTINGS;
    }
  });

  const [cart, setCart] = useState<{ item: Product | Course; itemType: 'course' | 'product'; quantity: number }[]>(() => {
    try {
      const saved = localStorage.getItem('bdih_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Current Authenticated User — NULL by default for unauthenticated visitors!
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('bdih_user_session_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // Unauthenticated visitor by default
    }
    return null;
  });

  // Supabase Auth Listener & Session Introspection
  useEffect(() => {
    if (!supabase) return;

    // Check existing active Supabase session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userObj = await mapSessionToAuthUser(session.user);
        setCurrentUser(userObj);
      }
    }).catch(err => {
      console.warn('[BDIH Auth] Session check note:', err);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userObj = await mapSessionToAuthUser(session.user);
        setCurrentUser(userObj);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bdih_courses_v2', JSON.stringify(courses));
      localStorage.setItem('bdih_products_v2', JSON.stringify(products));
      localStorage.setItem('bdih_categories_v2', JSON.stringify(categories));
      localStorage.setItem('bdih_orders_v2', JSON.stringify(orders));
      localStorage.setItem('bdih_entitlements_v2', JSON.stringify(entitlements));
      localStorage.setItem('bdih_course_progress_v2', JSON.stringify(courseProgress));
      localStorage.setItem('bdih_reviews_v2', JSON.stringify(reviews));
      localStorage.setItem('bdih_blogs_v2', JSON.stringify(blogs));
      localStorage.setItem('bdih_faqs_v2', JSON.stringify(faqs));
      localStorage.setItem('bdih_settings_v2', JSON.stringify(settings));
      localStorage.setItem('bdih_cart_v2', JSON.stringify(cart));
      if (currentUser) {
        localStorage.setItem('bdih_user_session_v2', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('bdih_user_session_v2');
      }
    } catch (e) {
      console.warn('Storage sync issue:', e);
    }
  }, [courses, products, categories, orders, entitlements, courseProgress, reviews, blogs, faqs, settings, cart, currentUser]);

  // Navigation Controller with Safe Path Memory
  const setView = (view: ViewType, slug?: string, extraId?: string) => {
    setCurrentView(view);
    if (slug) setActiveSlug(slug);
    if (extraId) setActiveLessonId(extraId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // LMS Navigation Helper
  const startLearningCourse = (courseSlug: string, lessonId?: string) => {
    const course = courses.find(c => c.slug === courseSlug || c.id === courseSlug);
    if (!course) return;

    setActiveSlug(course.slug);
    const targetLessonId = lessonId || course.modules[0]?.lessons[0]?.id || '';
    setActiveLessonId(targetLessonId);
    setCurrentView('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Course Progress & Completion Tracking
  const markLessonCompleted = (courseId: string, lessonId: string) => {
    const targetCourse = courses.find(c => c.id === courseId || c.slug === courseId);
    if (!targetCourse) return;

    const allLessons = targetCourse.modules.flatMap(m => m.lessons);
    const userEmail = currentUser?.email || 'guest';
    const currentProg = courseProgress[targetCourse.id] || {
      userId: userEmail,
      courseId: targetCourse.id,
      completedLessonIds: [],
      lastLessonId: lessonId,
      progressPercent: 0,
      updatedAt: new Date().toISOString()
    };

    const newCompleted = currentProg.completedLessonIds.includes(lessonId)
      ? currentProg.completedLessonIds
      : [...currentProg.completedLessonIds, lessonId];

    const percent = Math.min(100, Math.round((newCompleted.length / Math.max(1, allLessons.length)) * 100));

    const updated = {
      ...currentProg,
      completedLessonIds: newCompleted,
      lastLessonId: lessonId,
      progressPercent: percent,
      updatedAt: new Date().toISOString()
    };

    setCourseProgress(prev => ({
      ...prev,
      [targetCourse.id]: updated
    }));

    if (isSupabaseConfigured && currentUser?.email) {
      saveCourseProgressToSupabase(updated);
    }
  };

  const getCourseProgressPercent = (courseId: string): number => {
    return courseProgress[courseId]?.progressPercent || 0;
  };

  const hasAccessToCourse = (courseId: string): boolean => {
    if (isAuthorizedForAdmin(currentUser)) return true;
    if (!currentUser) return false;

    return entitlements.some(e => 
      e.status === 'active' && 
      e.itemType === 'course' && 
      e.itemId === courseId &&
      (e.userId === currentUser.email || (currentUser.id && e.userId === currentUser.id))
    );
  };

  const hasAccessToProduct = (productId: string): boolean => {
    if (isAuthorizedForAdmin(currentUser)) return true;
    if (!currentUser) return false;

    return entitlements.some(e => 
      e.status === 'active' && 
      (e.itemType === 'product' || e.itemType === 'indicator') && 
      e.itemId === productId &&
      (e.userId === currentUser.email || (currentUser.id && e.userId === currentUser.id))
    );
  };

  // Order Approval -> Automatic Digital Entitlement Generation (Idempotent)
  const approveOrder = (orderId: string) => {
    setOrders(prev => {
      const order = prev.find(o => o.id === orderId);
      if (!order) return prev;

      // Idempotent: if already approved, return unmodified
      if (order.paymentProofStatus === 'approved' && order.entitlementsCreated) {
        return prev;
      }

      // Automatically generate entitlements for each ordered item
      const freshEntitlements: DigitalEntitlement[] = order.items.map(item => ({
        id: `ent-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        orderId: order.id,
        userId: order.customerEmail,
        itemType: item.itemType || 'product',
        itemId: item.productId,
        title: item.title_en,
        grantedAt: new Date().toISOString().split('T')[0],
        status: 'active',
        licenseKey: `BDIH-${(item.itemType || 'PRO').toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
      }));

      setEntitlements(currentEnts => [...currentEnts, ...freshEntitlements]);

      if (isSupabaseConfigured) {
        approveOrderInSupabase(orderId, freshEntitlements);
      }

      return prev.map(o => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          paymentProofStatus: 'approved',
          trackingStatus: 'verified',
          entitlementsCreated: true
        };
      });
    });
  };

  const rejectOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentProofStatus: 'rejected', trackingStatus: 'cancelled' } : o));
  };

  // Cart Management
  const addToCart = (item: Product | Course, itemType: 'course' | 'product' = 'product') => {
    setCart(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p => p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { item, itemType, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(c => c.item.id !== id));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((acc, curr) => {
      const priceUsd = curr.item.discount_usd || curr.item.price_usd;
      const priceBdt = curr.item.discount_bdt || curr.item.price_bdt;
      return {
        usd: acc.usd + priceUsd * curr.quantity,
        bdt: acc.bdt + priceBdt * curr.quantity
      };
    }, { usd: 0, bdt: 0 });
  };

  // Mutations
  const addCourse = (c: Course) => setCourses(prev => [c, ...prev]);
  const updateCourse = (c: Course) => setCourses(prev => prev.map(item => item.id === c.id ? c : item));
  const deleteCourse = (id: string) => setCourses(prev => prev.filter(item => item.id !== id));

  const addProduct = (p: Product) => setProducts(prev => [p, ...prev]);
  const updateProduct = (p: Product) => setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(item => item.id !== id));

  const grantEntitlement = (e: DigitalEntitlement) => setEntitlements(prev => [e, ...prev]);
  const revokeEntitlement = (id: string) => setEntitlements(prev => prev.map(e => e.id === id ? { ...e, status: 'revoked' } : e));

  const addCategory = (cat: Category) => setCategories(prev => [...prev, cat]);
  const updateCategory = (cat: Category) => setCategories(prev => prev.map(c => c.id === cat.id ? cat : c));
  const deleteCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    if (isSupabaseConfigured) {
      saveOrderToSupabase(order);
    }
  };

  const updateOrder = (order: Order) => setOrders(prev => prev.map(o => o.id === order.id ? order : o));

  const addReview = (rev: Review) => setReviews(prev => [rev, ...prev]);
  const updateReview = (rev: Review) => setReviews(prev => prev.map(r => r.id === rev.id ? rev : r));

  const addBlog = (blog: BlogPost) => setBlogs(prev => [blog, ...prev]);
  const updateBlog = (blog: BlogPost) => setBlogs(prev => prev.map(b => b.id === blog.id ? blog : b));
  const deleteBlog = (id: string) => setBlogs(prev => prev.filter(b => b.id !== id));

  const addFAQ = (faq: FAQ) => setFaqs(prev => [...prev, faq]);
  const updateFAQ = (faq: FAQ) => setFaqs(prev => prev.map(f => f.id === faq.id ? faq : f));
  const deleteFAQ = (id: string) => setFaqs(prev => prev.filter(f => f.id !== id));

  const updateSettings = (st: SiteSettings) => setSettings(st);

  // Authoritative Auth Helpers
  const loginAsDemoStudent = () => {
    setCurrentUser({
      name: 'Kazi Farhan',
      email: 'student@bdih.com',
      phone: '01712-345678',
      isAdmin: false,
      isOwner: false,
      role: 'CUSTOMER',
      permissions: getRolePermissions('CUSTOMER')
    });
  };

  const loginAsAdmin = () => {
    setCurrentUser({
      name: 'BDIH Operations Admin',
      email: 'admin@bdih.com',
      phone: '01711-223344',
      isAdmin: true,
      isOwner: false,
      role: 'ADMIN',
      permissions: getRolePermissions('ADMIN')
    });
  };

  const loginAsOwner = () => {
    setCurrentUser({
      name: 'BDIH Sovereign Owner',
      email: 'owner@bdih.com',
      phone: '01711-000000',
      isAdmin: true,
      isOwner: true,
      role: 'OWNER',
      permissions: getRolePermissions('OWNER')
    });
  };

  const logout = async () => {
    if (supabase) {
      await signOut();
    }
    setCurrentUser(null);
    setAuthReturnUrl(undefined);
  };

  const loginWithGoogle = async (returnUrl = '/account') => {
    const res = await signInWithGoogleOAuth(returnUrl);
    return { error: res.error };
  };

  const loginWithEmailPassword = async (email: string, pass: string) => {
    const res = await signInWithEmail(email, pass);
    if (res.data?.user) {
      const userObj = await mapSessionToAuthUser(res.data.user);
      setCurrentUser(userObj);
    }
    return { error: res.error };
  };

  const signUpWithEmailPassword = async (email: string, pass: string, name?: string) => {
    const res = await signUpWithEmail(email, pass, name);
    return { error: res.error };
  };

  // Localization and formatting
  const formatPrice = (usd: number, bdt: number): string => {
    if (currency === 'BDT') {
      return `৳${bdt.toLocaleString('en-US')}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  const t = (en: string, bn: string): string => {
    return lang === 'bn' ? (bn || en) : (en || bn);
  };

  const tKey = (key: string, fallbackEn = '', fallbackBn = ''): string => {
    if (settings.uiTranslations && settings.uiTranslations[key]) {
      return lang === 'bn' ? settings.uiTranslations[key].bn : settings.uiTranslations[key].en;
    }
    return t(fallbackEn, fallbackBn);
  };

  return (
    <AppContext.Provider value={{
      lang, setLang,
      currency, setCurrency,
      currentView, setView,
      activeSlug, activeLessonId,
      adminTab, setAdminTab,
      authReturnUrl, setAuthReturnUrl,

      courses, addCourse, updateCourse, deleteCourse,
      courseProgress, startLearningCourse, markLessonCompleted, getCourseProgressPercent, hasAccessToCourse,

      products, addProduct, updateProduct, deleteProduct, hasAccessToProduct,
      entitlements, grantEntitlement, revokeEntitlement,

      categories, addCategory, updateCategory, deleteCategory,
      orders, addOrder, updateOrder, approveOrder, rejectOrder,
      reviews, addReview, updateReview,
      blogs, addBlog, updateBlog, deleteBlog,
      faqs, addFAQ, updateFAQ, deleteFAQ,
      settings, updateSettings,

      cart, addToCart, removeFromCart, clearCart, getCartTotal,
      currentUser, isSupabaseActive: isSupabaseConfigured,
      loginAsDemoStudent, loginAsAdmin, loginAsOwner, setCurrentUser, logout,
      loginWithGoogle, loginWithEmailPassword, signUpWithEmailPassword,
      formatPrice, t, tKey
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
