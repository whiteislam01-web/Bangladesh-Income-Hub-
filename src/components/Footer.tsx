/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, Mail, Facebook, Youtube, ShieldCheck, BookOpen, GraduationCap, 
  TrendingUp, FileText, ArrowRight, Lock, CheckCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView, settings, t } = useApp();

  const handleLink = (view: any, slug?: string) => {
    setView(view, slug);
  };

  return (
    <footer id="bdih_site_footer" className="bg-[#02040d]/90 border-t border-white/10 text-slate-300 relative overflow-hidden backdrop-blur-md">
      {/* Ambient background volumetric glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/[0.03] rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-sky-500/[0.03] rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Intro & Community Links */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              className="flex items-center gap-3 cursor-pointer group select-none" 
              onClick={() => handleLink('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-blue-600/30 border border-sky-400/40 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm tracking-wider font-mono">BDIH</span>
              </div>
              <span className="text-white font-extrabold text-base tracking-tight group-hover:text-sky-400 transition-colors">
                BANGLADESH <span className="text-sky-400">INCOME HUB</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
              {t(
                'Bangladesh Income Hub (BDIH) is the premier digital education and software ecosystem empowering traders with institutional Smart Money Concepts (SMC) masterclasses, proprietary TradingView & MT5 indicators, and high-performance digital tools.',
                'বাংলাদেশ ইনকাম হাব (বিডিআইএইচ) হচ্ছে প্রাতিষ্ঠানিক স্মার্ট মানি কনসেপ্টস (SMC) মাস্টারক্লাস, প্রিমিয়াম ট্রেডিংভিউ ও MT5 ইন্ডিকেটর এবং হাই-পারফরম্যান্স ডিজিটাল রিসোর্সের নির্ভরযোগ্য প্ল্যাটফর্ম।'
              )}
            </p>

            <div className="p-3 bg-sky-500/5 border-l-2 border-sky-400 rounded-r-xl max-w-sm">
              <p className="text-[10px] font-mono text-slate-300">
                "{settings.taglineText || 'জ্ঞান ও প্রযুক্তিতে ট্রেডিংয়ে অর্থনৈতিক মুক্তি'}"
              </p>
            </div>

            {/* Social & Community Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href={settings.contactTelegram} 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 bg-white/5 hover:bg-sky-500/15 border border-white/5 hover:border-sky-500/40 rounded-xl text-slate-400 hover:text-sky-400 transition-all cursor-pointer"
                title="Official Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href={settings.contactFacebook} 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 bg-white/5 hover:bg-sky-500/15 border border-white/5 hover:border-sky-500/40 rounded-xl text-slate-400 hover:text-sky-400 transition-all cursor-pointer"
                title="Facebook Community"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={settings.contactYoutube} 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 bg-white/5 hover:bg-red-500/15 border border-white/5 hover:border-red-500/40 rounded-xl text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${settings.contactEmail}`}
                className="p-2.5 bg-white/5 hover:bg-sky-500/15 border border-white/5 hover:border-sky-500/40 rounded-xl text-slate-400 hover:text-sky-400 transition-all cursor-pointer"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Masterclasses & Courses */}
          <div className="space-y-3.5">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase font-mono flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>{t('Courses', 'কোর্সসমূহ')}</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleLink('course-details', 'smc-institutional-masterclass')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('SMC Masterclass (Flagship)', 'এসএমসি মাস্টারক্লাস')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('course-details', 'price-action-scalping-bootcamp')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('Price Action Scalping', 'প্রাইস অ্যাকশন বুটক্যাম্প')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('course-details', 'algorithmic-trading-automation')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('Pine Script & MQL5 Algo', 'অ্যালগো ট্রেডিং ও অটোমেশন')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('courses')} 
                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>{t('View All Masterclasses', 'সকল কোর্স দেখুন')}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Precision Indicators & Tools */}
          <div className="space-y-3.5">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span>{t('Indicators & Tools', 'ইন্ডিকেটর ও টুলস')}</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleLink('product-details', 'bdih-orderblock-liquidity-radar')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('Order Block Radar (TradingView)', 'অর্ডার ব্লক রাডার')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('product-details', 'bdih-fvg-imbalance-sniper-mt5')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('FVG Sniper (MT4/MT5)', 'এফভিজি স্নাইপার')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('product-details', 'ultimate-prop-firm-notion-journal-os')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('Prop Firm Notion OS', 'নোশন ট্রেডিং জার্নাল')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('indicators')} 
                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>{t('All Digital Products', 'সকল ইন্ডিকেটর ও টুলস')}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Student Hub & Verification */}
          <div className="space-y-3.5">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>{t('Student Hub', 'স্টুডেন্ট পোর্টাল')}</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleLink('my-courses')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('My Enrolled Courses', 'আমার কোর্সসমূহ')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('my-products')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('My Digital Downloads', 'ডাউনলোড ফাইলস')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('order-tracking')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('Verify Payment TrxID', 'পেমেন্ট ট্র্যাকিং')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('contact')} 
                  className="hover:text-sky-400 transition-colors text-slate-400 text-left cursor-pointer"
                >
                  {t('Telegram Help Desk', 'টেলিগ্রাম সাপোর্ট')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bangladesh-First Payment Gateways Trust Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              {t('Supported Payment Gateways:', 'সাপোর্টেড পেমেন্ট মেথড:')}
            </span>
            <span className="px-2.5 py-1 rounded bg-pink-950/40 border border-pink-500/20 text-pink-300 text-[10px] font-bold font-mono">bKash (বিকাশ)</span>
            <span className="px-2.5 py-1 rounded bg-orange-950/40 border border-orange-500/20 text-orange-300 text-[10px] font-bold font-mono">Nagad (নগদ)</span>
            <span className="px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/20 text-purple-300 text-[10px] font-bold font-mono">Rocket (রকেট)</span>
            <span className="px-2.5 py-1 rounded bg-blue-950/40 border border-blue-500/20 text-blue-300 text-[10px] font-bold font-mono">Bank Wire</span>
            <span className="px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">Binance Pay</span>
          </div>

          <div className="text-[10px] text-slate-400 font-mono text-center md:text-right">
            © {new Date().getFullYear()} BDIH — Bangladesh Income Hub. {t('All Rights Reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="mt-6 text-[10px] text-slate-400 leading-relaxed font-sans text-center max-w-4xl mx-auto border-t border-white/5 pt-4">
          {t(
            'Educational Disclaimer: Financial market trading involves risk. All BDIH courses, indicators, and software tools are provided strictly for educational and technical analytical purposes. Past performance does not guarantee future results. Manage your risk responsibly.',
            'শিক্ষামূলক ঘোষণা: বৈশ্বিক ফাইনান্সিয়াল মার্কেট ট্রেডিং ঝুঁকি সাপেক্ষ। বিডিআইএইচের সকল কোর্স, ইন্ডিকেটর ও সফটওয়্যার শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে নির্মিত। অতীতের ফলাফল ভবিষ্যতের নিশ্চয়তা নয়। সর্বদা যথাযথ রিস্ক ম্যানেজমেন্ট মেনে চলুন।'
          )}
        </div>
      </div>
    </footer>
  );
};
