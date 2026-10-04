/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { 
  CoursesView, 
  CourseDetailsView, 
  IndicatorsView, 
  ProductsView, 
  ProductDetailsView, 
  BlogView, 
  AboutView, 
  ContactView 
} from './components/ClientViews';
import { LearningPortal } from './components/LearningPortal';
import { 
  CartView, 
  CheckoutView, 
  LoginView, 
  AccountView, 
  OrderTrackingView, 
  DownloadsView,
  PrivacyPolicyView,
  TermsView,
  RefundPolicyView
} from './components/CheckoutFlow';
import { AdminPanel } from './components/AdminPanel';
import { ForbiddenView, AuthErrorView } from './components/SecurityViews';
import { TelegramWidget } from './components/TelegramWidget';
import { BackgroundVisuals } from './components/BackgroundVisuals';
import { CustomCursor } from './components/CustomCursor';
import { ForexLoader } from './components/ForexLoader';
import { evaluateRouteAccess } from './lib/auth/rbac';

function AppContent() {
  const { currentView, setView, currentUser, authReturnUrl } = useApp();
  const [initLoading, setInitLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepLabel, setLoadingStepLabel] = useState('Loading platform...');
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync route on initial browser load
  useEffect(() => {
    const rawPath = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (rawPath === 'admin' || rawPath.startsWith('admin/')) {
      setView('admin');
    } else if (rawPath === 'owner' || rawPath.startsWith('owner/')) {
      setView('owner');
    } else if (rawPath === 'forbidden') {
      setView('forbidden');
    } else if (rawPath.startsWith('auth/auth-code-error')) {
      setView('auth-error');
    } else if (rawPath === 'account' || rawPath === 'dashboard') {
      setView('account');
    } else if (rawPath === 'my-courses') {
      setView('my-courses');
    } else if (rawPath === 'my-products') {
      setView('my-products');
    } else if (rawPath === 'login') {
      setView('login');
    }
  }, []);

  // Fast minimal initialization logic
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setInitLoading(false), 200);
          return 100;
        }
        
        const next = prev + Math.floor(Math.random() * 15) + 12;
        const bounded = Math.min(next, 100);
        
        if (bounded < 40) {
          setLoadingStepLabel('Connecting to BDIH security mesh...');
        } else if (bounded < 80) {
          setLoadingStepLabel('Verifying student entitlements & masterclasses...');
        } else {
          setLoadingStepLabel('Welcome to Bangladesh Income Hub');
        }
        
        return bounded;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  // Tracking page scrolling motion
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        setScrollProgress((currentScrollY / totalScrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Render correct view block with STRICT Server-Grade Access Enforcement
  const renderActiveView = () => {
    // Authoritative Route Protection Check (Deny by default)
    const routeCheck = evaluateRouteAccess(currentView, currentUser);
    if (!routeCheck.allowed) {
      if (routeCheck.reason === 'unauthenticated') {
        return <LoginView returnUrl={currentView} />;
      }
      if (routeCheck.reason === 'unauthorized') {
        return <ForbiddenView />;
      }
    }

    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'courses':
        return <CoursesView />;
      case 'course-details':
        return <CourseDetailsView />;
      case 'learn':
        return <LearningPortal />;
      case 'indicators':
      case 'signals':
        return <IndicatorsView />;
      case 'products':
      case 'shop':
        return <ProductsView />;
      case 'product-details':
        return <ProductDetailsView />;
      case 'blog':
      case 'blog-details':
        return <BlogView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'login':
        return <LoginView returnUrl={authReturnUrl} />;
      case 'account':
      case 'my-courses':
      case 'my-products':
      case 'downloads':
        return <AccountView />;
      case 'order-tracking':
        return <OrderTrackingView />;
      case 'privacy':
        return <PrivacyPolicyView />;
      case 'terms':
        return <TermsView />;
      case 'refund':
        return <RefundPolicyView />;
      case 'admin':
      case 'owner':
        return <AdminPanel />;
      case 'forbidden':
        return <ForbiddenView />;
      case 'auth-error':
        return <AuthErrorView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div id="application_root_container" className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-hidden bg-[#02040b]">
      {/* Real-time Scrolling Glow Bar */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_1px_6px_rgba(56,189,248,0.35)] z-[99999] pointer-events-none transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cinematic Abstract 3D Background */}
      <BackgroundVisuals />

      {/* Loading Overlay */}
      <AnimatePresence>
        {initLoading ? (
          <motion.div
            key="market-loader-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[9999] pointer-events-auto"
          >
            <ForexLoader progress={loadingProgress} stepLabel={loadingStepLabel} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        <div>
          {/* Header is hidden during active full-screen lesson LMS player */}
          {currentView !== 'learn' && <Header />}
          <main id="view_workspace_container" className="w-full overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        {currentView !== 'learn' && <Footer />}
      </div>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {scrollY > 300 && currentView !== 'learn' && (
          <motion.button
            key="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(56, 189, 248, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 left-6 z-[999] p-3 rounded-full bg-[#04081c]/80 border border-sky-400/30 text-sky-400 backdrop-blur-md shadow-2xl cursor-pointer flex items-center justify-center group"
            title="Scroll to Top"
          >
            <svg 
              className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {currentView !== 'learn' && <TelegramWidget />}
      <CustomCursor />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
