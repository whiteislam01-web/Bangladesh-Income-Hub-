/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, Trash2, ArrowRight, ShieldCheck, CheckCircle, 
  CreditCard, Wallet, Lock, Upload, Download, PlayCircle, Clock, 
  AlertTriangle, Copy, ExternalLink, RefreshCw, User, LogIn, FileText, Sparkles,
  Search, GraduationCap, TrendingUp
} from 'lucide-react';
import { Order, OrderItem } from '../types';

/* ==========================================================================
   1. SHOPPING CART VIEW
   ========================================================================== */
export const CartView: React.FC = () => {
  const { cart, removeFromCart, clearCart, getCartTotal, setView, formatPrice, t } = useApp();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4 text-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-6 text-sky-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t('Your Cart is Empty', 'আপনার কার্ট খালি রয়েছে')}</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          {t(
            'Explore our institutional SMC courses, precision TradingView indicators, or digital trading tools to add items.',
            'কোর্স বা ইন্ডিকেটর নির্বাচন করতে ক্যাটালগ পেজ ভিজিট করুন।'
          )}
        </p>
        <button 
          onClick={() => setView('courses')}
          className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
        >
          {t('Explore Masterclasses', 'কোর্সসমূহ দেখুন')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-sky-400" />
          <span>{t('Shopping Cart', 'আপনার শপিং কার্ট')}</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-rose-400 font-mono transition-colors cursor-pointer"
        >
          {t('Clear Cart', 'কার্ট খালি করুন')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Item Rows */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((cartItem) => {
            const item = cartItem.item;
            const priceUsd = item.discount_usd || item.price_usd;
            const priceBdt = item.discount_bdt || item.price_bdt;

            return (
              <div 
                key={item.id}
                className="p-5 rounded-2xl bg-[#04081c]/70 border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 truncate">
                  <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                    <img 
                      src={'thumbnail' in item ? item.thumbnail : item.image} 
                      alt={item.title_en} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-400/20 mb-1 inline-block">
                      {cartItem.itemType === 'course' ? 'Masterclass' : 'Digital Product'}
                    </span>
                    <h3 className="text-white text-xs sm:text-sm font-bold truncate">
                      {t(item.title_en, item.title_bn)}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm sm:text-base font-black text-white font-mono">
                    {formatPrice(priceUsd, priceBdt)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/15 text-xs text-slate-300 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
            <span>
              {t(
                'Digital Delivery: Instant unlock on your account dashboard immediately upon bKash/Nagad verification.',
                'ডিজিটাল ডেলিভারি: পেমেন্ট ভেরিফিকেশনের সাথে সাথে আপনার একাউন্টে ইনস্ট্যান্ট এক্সেস চালু হয়ে যাবে।'
              )}
            </span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#04081c]/90 border border-sky-400/20 shadow-2xl space-y-6">
          <h2 className="text-white font-bold text-base uppercase tracking-wider font-mono">
            {t('Summary', 'অর্ডার সামারি')}
          </h2>

          <div className="space-y-3 text-xs text-slate-300 border-b border-white/10 pb-4">
            <div className="flex justify-between">
              <span>{t('Total Items', 'মোট পণ্য')}</span>
              <span className="font-mono text-white">{cart.length}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('Delivery Type', 'ডেলিভারি মেথড')}</span>
              <span className="text-emerald-400 font-mono font-bold">{t('Instant Digital', 'ডিজিটাল এক্সেস')}</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-300 font-semibold">{t('Grand Total', 'সর্বমোট')}</span>
            <span className="text-2xl font-black text-white font-mono">
              {formatPrice(total.usd, total.bdt)}
            </span>
          </div>

          <button
            onClick={() => setView('checkout')}
            className="w-full py-4 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t('Proceed to Checkout', 'চেকআউটে এগিয়ে যান')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

/* ==========================================================================
   2. CHECKOUT VIEW (Bangladesh-First Payment & Verification Flow)
   ========================================================================== */
export const CheckoutView: React.FC = () => {
  const { cart, getCartTotal, addOrder, clearCart, setView, settings, currentUser, formatPrice, t } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'bank' | 'binance'>('bkash');
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Kazi Farhan');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'farhan@example.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '01712-345678');
  const [telegramUsername, setTelegramUsername] = useState('@farhan_bd');
  const [transactionId, setTransactionId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxError, setTrxError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4 text-slate-100">
        <h2 className="text-xl font-bold text-white mb-2">{t('Your Cart is Empty', 'কোনো আইটেম নেই')}</h2>
        <button onClick={() => setView('courses')} className="mt-4 px-6 py-2.5 bg-sky-500 text-slate-950 font-bold rounded-xl text-xs">
          {t('Explore Courses', 'কোর্সে ফিরে যান')}
        </button>
      </div>
    );
  }

  const getTargetWallet = () => {
    switch (paymentMethod) {
      case 'bkash': return settings.paymentBkashWallet;
      case 'nagad': return settings.paymentNagadWallet;
      case 'rocket': return settings.paymentRocketWallet;
      case 'bank': return settings.paymentBankAccount;
      case 'binance': return settings.paymentBinanceId || 'Binance Pay ID: 84920412';
      default: return settings.paymentBkashWallet;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/[^0-9\-]/g, ''));
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 3000);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setTrxError(null);
    if (!transactionId.trim()) {
      setTrxError(t('Please enter your Transaction ID (TrxID)', 'দয়া করে ট্রানজেকশন আইডি (TrxID) প্রদান করুন।'));
      return;
    }

    setIsSubmitting(true);

    const freshOrderId = `BDIH-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderItems: OrderItem[] = cart.map(c => ({
      id: `item-${Date.now()}-${Math.random()}`,
      productId: c.item.id,
      title_en: c.item.title_en,
      title_bn: c.item.title_bn,
      price_usd: c.item.discount_usd || c.item.price_usd,
      price_bdt: c.item.discount_bdt || c.item.price_bdt,
      quantity: 1,
      itemType: c.itemType
    }));

    const newOrder: Order = {
      id: freshOrderId,
      customerName,
      customerEmail,
      customerPhone,
      telegramUsername,
      gatewayName: paymentMethod,
      transactionId: transactionId.trim().toUpperCase(),
      senderPhone: senderPhone.trim() || customerPhone,
      paymentProofStatus: 'pending',
      items: orderItems,
      totalAmountBDT: total.bdt,
      totalAmountUSD: total.usd,
      orderDate: new Date().toISOString().split('T')[0],
      trackingStatus: 'processing',
      entitlementsCreated: false
    };

    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      // Route directly to Order Verification tracking screen
      setView('order-tracking', freshOrderId);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('Secure Checkout & Verification', 'নিরাপদ চেকআউট ও পেমেন্ট ভেরিফিকেশন')}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('Complete payment via bKash, Nagad, Rocket, or Bank to unlock your course and indicator access.', 'বিকাশ, নগদ বা রকেটে পেমেন্ট সম্পন্ন করে ট্রানজেকশন আইডি প্রদান করুন।')}
        </p>
      </div>

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Customer Info & Payment Method Instructions */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Customer Details */}
          <div className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-mono flex items-center gap-2">
              <User className="w-4 h-4 text-sky-400" />
              <span>1. {t('Student Information', 'শিক্ষার্থীর তথ্য')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">{t('Full Name', 'পুরো নাম')}</label>
                <input 
                  required
                  type="text" 
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">{t('Email Address', 'ইমেইল অ্যাড্রেস')}</label>
                <input 
                  required
                  type="email" 
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">{t('WhatsApp / Mobile Phone', 'মোবাইল নাম্বার')}</label>
                <input 
                  required
                  type="text" 
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">{t('Telegram Username (Optional)', 'টেলিগ্রাম ইউজারনেম')}</label>
                <input 
                  type="text" 
                  value={telegramUsername}
                  onChange={e => setTelegramUsername(e.target.value)}
                  placeholder="@your_username"
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>
          </div>

          {/* 2. Bangladesh-First Payment Selector */}
          <div className="p-6 rounded-2xl bg-[#04081c]/70 border border-white/10 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-mono flex items-center gap-2">
              <Wallet className="w-4 h-4 text-sky-400" />
              <span>2. {t('Select Payment Gateway', 'পেমেন্ট মেথড নির্বাচন করুন')}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'bkash', label: 'bKash (বিকাশ)', color: 'border-pink-500/40 text-pink-400' },
                { id: 'nagad', label: 'Nagad (নগদ)', color: 'border-orange-500/40 text-orange-400' },
                { id: 'rocket', label: 'Rocket (রকেট)', color: 'border-purple-500/40 text-purple-400' },
                { id: 'binance', label: 'Binance Pay', color: 'border-amber-500/40 text-amber-400' },
              ].map(gw => (
                <button
                  type="button"
                  key={gw.id}
                  onClick={() => setPaymentMethod(gw.id as any)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    paymentMethod === gw.id 
                      ? `${gw.color} bg-white/10 shadow-lg scale-102` 
                      : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {gw.label}
                </button>
              ))}
            </div>

            {/* Step-by-Step Payment Instructions */}
            <div className="p-5 rounded-2xl bg-[#020514] border border-sky-400/20 space-y-3 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono uppercase">{t('Send Money To:', 'সেন্ড মানি করার নাম্বার:')}</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">{paymentMethod.toUpperCase()} PERSONAL</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-white font-mono font-bold text-sm sm:text-base select-all tracking-wider">
                  {getTargetWallet()}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(getTargetWallet())}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedWallet ? t('Copied!', 'কপি হয়েছে!') : t('Copy', 'কপি')}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-300 leading-relaxed space-y-1">
                <p>1. Open your {paymentMethod.toUpperCase()} App or dial USSD.</p>
                <p>2. Select <strong>Send Money (সেন্ড মানি)</strong> to the above number.</p>
                <p>3. Enter total amount: <strong className="text-sky-400 font-mono">{formatPrice(total.usd, total.bdt)}</strong>.</p>
                <p>4. After sending, copy the <strong>Transaction ID (TrxID)</strong> and input below.</p>
              </div>
            </div>

            {/* 3. Transaction Proof Submission Inputs */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-xs font-bold block mb-1">
                  {t('Transaction ID (TrxID) *', 'ট্রানজেকশন আইডি (TrxID) *')}
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. 9AKL894J92"
                  value={transactionId}
                  onChange={e => {
                    setTransactionId(e.target.value);
                    if (trxError) setTrxError(null);
                  }}
                  className="w-full bg-[#020514] border border-sky-400/40 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-sky-300 tracking-wider uppercase"
                />
                {trxError && (
                  <p className="text-[11px] text-rose-400 mt-1 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>{trxError}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-slate-300 text-xs font-semibold block mb-1">
                  {t('Sender Phone Number (last 4 digits or full)', 'প্রেরক মোবাইল নাম্বার')}
                </label>
                <input 
                  type="text" 
                  placeholder="017xxxxxxxx"
                  value={senderPhone}
                  onChange={e => setSenderPhone(e.target.value)}
                  className="w-full bg-[#020514] border border-white/10 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Items Summary & Submit Button */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#04081c]/90 border border-sky-400/25 shadow-2xl space-y-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider font-mono">
            {t('Order Items', 'অর্ডারের বিবরণ')}
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map(c => (
              <div key={c.item.id} className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                <div className="truncate pr-2">
                  <div className="text-white font-medium truncate">{t(c.item.title_en, c.item.title_bn)}</div>
                  <span className="text-[10px] text-slate-400 font-mono capitalize">{c.itemType}</span>
                </div>
                <span className="text-white font-mono font-bold shrink-0">
                  {formatPrice(c.item.discount_usd || c.item.price_usd, c.item.discount_bdt || c.item.price_bdt)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 flex items-baseline justify-between">
            <span className="text-xs text-slate-300 font-semibold">{t('Total Payable', 'মোট প্রদেয়')}</span>
            <span className="text-2xl font-black text-sky-400 font-mono">
              {formatPrice(total.usd, total.bdt)}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>{t('Submitting Verification...', 'ভেরিফিকেশন সাবমিট হচ্ছে...')}</span>
            ) : (
              <>
                <span>{t('Submit Payment Proof', 'পেমেন্ট প্রুফ জমা দিন')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 leading-relaxed text-center font-sans">
            {t(
              'Once submitted, the BDIH admin desk verifies the transaction within 5-20 minutes. You can track status anytime.',
              'সাবমিটের পর সাধারণত ৫-২০ মিনিটের মধ্যে ট্রানজেকশন ভেরিফাই হয়ে কোর্স আনলক হবে।'
            )}
          </p>
        </div>

      </form>
    </div>
  );
};

/* ==========================================================================
   3. ORDER TRACKING & PAYMENT VERIFICATION VIEW
   ========================================================================== */
export const OrderTrackingView: React.FC = () => {
  const { orders, approveOrder, activeSlug, setView, formatPrice, t } = useApp();
  const [searchId, setSearchId] = useState(activeSlug || '');

  // Look for target order or most recent
  const order = orders.find(o => o.id.toLowerCase() === searchId.toLowerCase().trim()) || orders[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t('Order & Payment Verification Status', 'অর্ডার ও পেমেন্ট ভেরিফিকেশন স্ট্যাটাস')}
        </h1>
        <p className="text-xs text-slate-400">
          {t('Enter your BDIH Order ID to check your digital entitlement and course unlock progress.', 'আপনার অর্ডার আইডি দিয়ে পেমেন্ট অনুমোদন স্ট্যাটাস চেক করুন।')}
        </p>

        {/* Search Bar */}
        <div className="flex items-center gap-2 max-w-md mx-auto mt-4 bg-[#04081c] border border-white/10 rounded-xl px-4 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="e.g. BDIH-98421"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            className="w-full bg-transparent text-xs text-white focus:outline-none font-mono uppercase"
          />
        </div>
      </div>

      {order ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#04081c]/80 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t('Order Reference', 'অর্ডার আইডি')}</span>
              <div className="text-xl font-bold font-mono text-white mt-0.5">{order.id}</div>
              <span className="text-xs text-slate-400">{order.orderDate}</span>
            </div>

            {/* Status Badge */}
            <div>
              {order.paymentProofStatus === 'approved' ? (
                <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{t('Payment Verified & Access Granted', 'পেমেন্ট অনুমোদিত • এক্সেস সক্রিয়')}</span>
                </div>
              ) : order.paymentProofStatus === 'rejected' ? (
                <div className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t('Verification Declined', 'পেমেন্ট বাতিল করা হয়েছে')}</span>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-2 animate-pulse">
                  <Clock className="w-4 h-4" />
                  <span>{t('Pending Admin Verification', 'ভেরিফিকেশন প্রক্রিয়াধীন...')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment & Customer Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5">{t('Method', 'পেমেন্ট মেথড')}</span>
              <strong className="text-white font-mono uppercase">{order.gatewayName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">{t('Transaction ID', 'ট্রানজেকশন আইডি')}</span>
              <strong className="text-sky-400 font-mono">{order.transactionId}</strong>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">{t('Sender Phone', 'প্রেরক নাম্বার')}</span>
              <strong className="text-white font-mono">{order.senderPhone || order.customerPhone}</strong>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">{t('Total Paid', 'পরিশোধিত টাকা')}</span>
              <strong className="text-white font-mono">{formatPrice(order.totalAmountUSD, order.totalAmountBDT)}</strong>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">
              {t('Purchased Items', 'আইটেম তালিকা')}
            </h4>
            {order.items.map(item => (
              <div key={item.id} className="p-4 rounded-xl bg-[#020512] border border-white/5 flex items-center justify-between">
                <div>
                  <h5 className="text-white text-xs font-bold">{t(item.title_en, item.title_bn)}</h5>
                  <span className="text-[10px] text-slate-400 font-mono capitalize">{item.itemType || 'Product'}</span>
                </div>

                {order.paymentProofStatus === 'approved' ? (
                  item.itemType === 'course' ? (
                    <button
                      onClick={() => setView('learn', item.productId)}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>{t('Launch Course in LMS', 'কোর্সে প্রবেশ করুন')}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setView('my-products')}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t('Download Files', 'ডাউনলোড ফাইল')}</span>
                    </button>
                  )
                ) : (
                  <span className="text-[11px] text-amber-400 font-mono">
                    🔒 {t('Unlocks on Approval', 'অনুমোদনের পর সক্রিয় হবে')}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Simulation Helper for Testing without waiting */}
          {order.paymentProofStatus === 'pending' && (
            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-300">
                <strong className="text-sky-300 block mb-0.5">{t('Simulate Instant Approval (Developer & Demo Mode):', 'ইনস্ট্যান্ট ভেরিফিকেশন টেস্ট (ডেমো মোড):')}</strong>
                <span>{t('Click to immediately approve this order and generate real digital entitlements.', 'ক্লিক করলেই তাৎক্ষণিকভাবে পেমেন্ট অনুমোদন হয়ে কোর্সটি আনলক হয়ে যাবে।')}</span>
              </div>
              <button
                onClick={() => approveOrder(order.id)}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs shrink-0 cursor-pointer shadow-md"
              >
                {t('Simulate Approval ✓', 'অনুমোদন সিমুলেট করুন ✓')}
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-xs">
          {t('No order found with that ID.', 'এই আইডিতে কোনো অর্ডার পাওয়া যায়নি।')}
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   4. CUSTOMER ACCOUNT & STUDENT PORTAL VIEW
   ========================================================================== */
export const AccountView: React.FC = () => {
  const { 
    currentUser, courses, products, orders, entitlements, 
    startLearningCourse, setView, logout, formatPrice, t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'products' | 'orders'>('courses');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-slate-100 text-center">
        <div className="p-8 rounded-3xl bg-[#04081c]/90 border border-white/10 shadow-2xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">{t('Authentication Required', 'লগইন প্রয়োজন')}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('You must be signed in to access your student dashboard, courses, and purchase history.', 'আপনার ড্যাশবোর্ড ও কোর্স পরিচালনা করতে লগইন করুন।')}
          </p>
          <button 
            onClick={() => setView('login')}
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg"
          >
            {t('Sign In to Account', 'একাউন্টে লগইন করুন')}
          </button>
        </div>
      </div>
    );
  }

  // Filter items owned by student
  const activeCourseEntitlements = entitlements.filter(e => e.status === 'active' && e.itemType === 'course');
  const activeProductEntitlements = entitlements.filter(e => e.status === 'active' && (e.itemType === 'product' || e.itemType === 'indicator'));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-100">
      
      {/* Student Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#04081c]/80 border border-white/10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{currentUser?.name || 'Student Portal'}</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{currentUser?.email || 'student@bdih.com'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 text-xs font-semibold transition-colors cursor-pointer"
        >
          {t('Sign Out', 'লগ আউট')}
        </button>
      </div>

      {/* Account Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8">
        {[
          { id: 'courses', label: t('My Courses (LMS)', 'আমার কোর্সসমূহ'), count: activeCourseEntitlements.length },
          { id: 'products', label: t('My Indicators & Products', 'আমার প্রোডাক্টস ও ইন্ডিকেটর'), count: activeProductEntitlements.length },
          { id: 'orders', label: t('Order History', 'অর্ডারের ইতিহাস'), count: orders.length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-sky-500 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-950/20 text-[10px] font-mono">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: My Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {activeCourseEntitlements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCourseEntitlements.map(ent => {
                const targetCourse = courses.find(c => c.id === ent.itemId || c.slug === ent.itemId) || courses[0];
                return (
                  <div 
                    key={ent.id}
                    className="p-5 rounded-2xl bg-[#04081c]/70 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                        <img src={targetCourse.thumbnail} alt={targetCourse.title_en} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-500/80 text-slate-950 text-[10px] font-mono font-bold uppercase">
                          Enrolled
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-1">{t(targetCourse.title_en, targetCourse.title_bn)}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{t(targetCourse.short_desc_en, targetCourse.short_desc_bn)}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">{targetCourse.total_lessons} {t('Lessons', 'ক্লাস')}</span>
                      <button
                        onClick={() => startLearningCourse(targetCourse.slug)}
                        className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>{t('Continue Learning', 'ক্লাস শুরু করুন')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl space-y-3">
              <GraduationCap className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-white font-bold text-sm">{t('No courses enrolled yet', 'কোনো কোর্সে এখনও এনরোল করেননি')}</h3>
              <p className="text-xs text-slate-400">{t('Explore our Smart Money Concepts masterclass to unlock lifetime learning.', 'আমাদের এসএমসি মাস্টারক্লাসে এনরোল করুন।')}</p>
              <button onClick={() => setView('courses')} className="px-6 py-2.5 bg-sky-500 text-slate-950 font-bold rounded-xl text-xs">
                {t('Browse Masterclasses', 'কোর্সসমূহ দেখুন')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Products & Indicators */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {activeProductEntitlements.length > 0 ? (
            <div className="space-y-4">
              {activeProductEntitlements.map(ent => {
                const targetProd = products.find(p => p.id === ent.itemId) || products[0];
                return (
                  <div key={ent.id} className="p-5 rounded-2xl bg-[#04081c]/70 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-400/20">
                          {targetProd.platform || 'Digital Tool'}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">Active License</span>
                      </div>
                      <h4 className="text-white font-bold text-sm">{t(targetProd.title_en, targetProd.title_bn)}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">License Key: <strong className="text-sky-300">{ent.licenseKey || 'BDIH-IND-LIFETIME'}</strong></p>
                    </div>

                    <a 
                      href={targetProd.download_file_url || '#'} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t('Download Files & Setup', 'ফাইল ডাউনলোড')}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl space-y-3">
              <TrendingUp className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-white font-bold text-sm">{t('No indicators or tools purchased', 'কোনো ইন্ডিকেটর বা প্রোডাক্ট এখনও কেনেননি')}</h3>
              <button onClick={() => setView('indicators')} className="px-6 py-2.5 bg-sky-500 text-slate-950 font-bold rounded-xl text-xs">
                {t('Browse Indicators', 'ইন্ডিকেটর দেখুন')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="p-5 rounded-2xl bg-[#04081c]/70 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <strong className="text-white font-mono text-xs">{o.id}</strong>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400">{o.orderDate}</span>
                </div>
                <div className="text-xs text-slate-300">
                  {o.items.map(it => t(it.title_en, it.title_bn)).join(', ')}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">TrxID: {o.transactionId} via {o.gatewayName.toUpperCase()}</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-white font-mono">{formatPrice(o.totalAmountUSD, o.totalAmountBDT)}</span>
                <button
                  onClick={() => setView('order-tracking', o.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-sky-400"
                >
                  {t('View Status', 'স্ট্যাটাস')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

/* ==========================================================================
   5. LOGIN & AUTHENTICATION VIEW (Google OAuth + Supabase Auth + Fast Demo)
   ========================================================================== */
export const LoginView: React.FC<{ returnUrl?: string }> = ({ returnUrl }) => {
  const { 
    loginAsDemoStudent, 
    loginAsAdmin, 
    loginAsOwner,
    loginWithGoogle, 
    loginWithEmailPassword, 
    signUpWithEmailPassword, 
    isSupabaseActive, 
    setView, 
    t 
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const destination = (returnUrl && returnUrl !== 'login' && returnUrl !== 'forbidden' && returnUrl !== 'auth-error')
    ? (returnUrl as any)
    : 'account';

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setLoading(true);
    const { error } = await loginWithGoogle(destination);
    if (error) {
      setAuthError(error.message || 'Google OAuth sign-in could not be completed. Please check your Supabase Google OAuth provider settings.');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!email || !password) {
      setAuthError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    if (mode === 'signup') {
      const { error } = await signUpWithEmailPassword(email, password, fullName);
      setLoading(false);
      if (error) {
        setAuthError(error.message);
      } else {
        setView(destination);
      }
    } else {
      const { error } = await loginWithEmailPassword(email, password);
      setLoading(false);
      if (error) {
        setAuthError(error.message);
      } else {
        const isAdmin = email.toLowerCase() === 'admin@bdih.com' || email.toLowerCase() === 'owner@bdih.com';
        setView(destination !== 'account' ? destination : (isAdmin ? 'admin' : 'account'));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-slate-100">
      <div className="p-8 rounded-3xl bg-[#04081c]/90 border border-white/10 space-y-5 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto">
          <LogIn className="w-6 h-6" />
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold text-white">
            {mode === 'signin' 
              ? t('Student & Member Portal', 'বিডিআইএইচ লগইন পোর্টাল')
              : t('Create Student Account', 'নতুন শিক্ষার্থী একাউন্ট খুলুন')}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {returnUrl && returnUrl !== 'account' ? (
              <span className="text-amber-400 font-mono text-[11px]">
                Authentication required to access: <strong className="text-white uppercase">{returnUrl}</strong>
              </span>
            ) : (
              t('Access your purchased masterclasses, precision indicators, and community.', 'আপনার কোর্স, লাইসেন্স ও টুলস পরিচালনা করুন।')
            )}
          </p>
        </div>

        {/* Error notification */}
        {authError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="leading-tight">{authError}</span>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-sm disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>{t('Continue with Google', 'গুগল দিয়ে প্রবেশ করুন')}</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[10px] text-slate-500 font-mono uppercase">{t('Or with email', 'অথবা ইমেইলে')}</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="text-slate-300 text-[11px] font-semibold block mb-1">{t('Full Name', 'পুরো নাম')}</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full bg-[#020514] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          )}

          <div>
            <label className="text-slate-300 text-[11px] font-semibold block mb-1">{t('Email Address', 'ইমেইল এড্রেস')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#020514] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="text-slate-300 text-[11px] font-semibold block mb-1">{t('Password', 'পাসওয়ার্ড')}</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#020514] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {loading 
              ? t('Authenticating...', 'যাচাই করা হচ্ছে...') 
              : mode === 'signin' 
                ? t('Sign In', 'লগইন করুন') 
                : t('Create Account', 'একাউন্ট খুলুন')}
          </button>
        </form>

        {/* Mode switch */}
        <div className="text-center text-xs text-slate-400">
          {mode === 'signin' ? (
            <span>
              {t("Don't have an account?", 'নতুন শিক্ষার্থী?')}{' '}
              <button
                type="button"
                onClick={() => { setMode('signup'); setAuthError(null); }}
                className="text-sky-400 font-semibold hover:underline"
              >
                {t('Sign Up', 'রেজিস্টার করুন')}
              </button>
            </span>
          ) : (
            <span>
              {t('Already registered?', 'আগে থেকেই একাউন্ট আছে?')}{' '}
              <button
                type="button"
                onClick={() => { setMode('signin'); setAuthError(null); }}
                className="text-sky-400 font-semibold hover:underline"
              >
                {t('Sign In', 'লগইন করুন')}
              </button>
            </span>
          )}
        </div>

        {/* Quick Testing Access Presets */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <span className="text-[10px] text-slate-500 font-mono uppercase block text-center">
            {t('Quick Access Presets (Instant Demo)', 'দ্রুত ডেমো লগইন')}
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => { loginAsDemoStudent(); setView(destination); }}
              className="py-2 px-1.5 bg-white/5 hover:bg-white/10 text-sky-300 font-semibold text-[10px] rounded-lg border border-sky-400/20 transition-all cursor-pointer truncate text-center"
            >
              {t('Student', 'শিক্ষার্থী')}
            </button>
            <button
              type="button"
              onClick={() => { loginAsAdmin(); setView('admin'); }}
              className="py-2 px-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-[10px] rounded-lg border border-amber-500/30 transition-all cursor-pointer truncate text-center"
            >
              {t('Admin', 'অ্যাডমিন')}
            </button>
            <button
              type="button"
              onClick={() => { loginAsOwner(); setView('admin'); }}
              className="py-2 px-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-semibold text-[10px] rounded-lg border border-purple-500/30 transition-all cursor-pointer truncate text-center"
            >
              {t('Owner', 'ওনার')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export const PrivacyPolicyView: React.FC = () => <div className="max-w-4xl mx-auto px-4 py-12 text-xs text-slate-300 leading-relaxed font-sans">BDIH Privacy Policy: We respect student privacy. Data submitted for payment verification is strictly confidential.</div>;
export const TermsView: React.FC = () => <div className="max-w-4xl mx-auto px-4 py-12 text-xs text-slate-300 leading-relaxed font-sans">BDIH Terms of Service: Masterclass content and indicators are protected under intellectual property copyright. Unauthorized sharing is prohibited.</div>;
export const RefundPolicyView: React.FC = () => <div className="max-w-4xl mx-auto px-4 py-12 text-xs text-slate-300 leading-relaxed font-sans">BDIH Refund Policy: Due to immediate digital delivery of proprietary indicator source codes and full video masterclasses, purchases are non-refundable once unlocked.</div>;
export const DownloadsView: React.FC = () => <AccountView />;
