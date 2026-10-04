/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Info, AlertTriangle, Scale } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LegalDisclaimerProps {
  compact?: boolean;
}

export const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ compact = false }) => {
  const { t } = useApp();

  if (compact) {
    return (
      <div 
        id="compact_legal_disclaimer" 
        className="p-4 bg-[#0B1F45]/20 border border-white/5 rounded-2xl text-[10px] sm:text-xs text-slate-400 font-sans leading-relaxed flex items-start gap-3 backdrop-blur-sm"
      >
        <ShieldCheck className="w-4 h-4 text-[#4DA3FF] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-300 mr-1">{t('Collector Guarantee & Packaging Policy:', 'কালেক্টর গ্যারান্টি ও প্যাকেজিং পলিসি:')}</span>
          {t(
            'Velocity Diecast Hub provides authentic 1:64 and premium scale models. Every item is packed with collector-grade bubble wrap and sturdy outer boxes to prevent blister or card creasing.',
            'ভেলোসিটি ডাইকাস্ট হাব ১০০% আসল ১:৬৪ এবং প্রিমিয়াম স্কেল মডেল সরবরাহ করে। কার্ড ও ব্লিস্টার সুরক্ষিত রাখতে প্রতিটি পণ্য উন্নত বাবল র‍্যাপ ও মজবুত কার্টন বক্সে পাঠানো হয়।'
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      id="comprehensive_legal_disclaimer_card" 
      className="w-full max-w-5xl mx-auto p-6 sm:p-8 bg-[#0B1F45]/35 border border-[#4DA3FF]/15 rounded-3xl relative overflow-hidden backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
    >
      {/* Background soft blue glow layer */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#4DA3FF]/5 rounded-full blur-2xl pointer-events-none"></div>
      
      {/* Structural layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* Guard scale visual label */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start gap-3.5 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/5 lg:pr-6">
          <div className="p-3 bg-gradient-to-tr from-[#4DA3FF]/10 to-[#66E3FF]/15 border border-[#4DA3FF]/20 rounded-2xl text-[#4DA3FF] shadow-[0_0_15px_rgba(77,163,255,0.15)]">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-sans">{t('Collector Assurance', 'কালেক্টর অঙ্গীকার ও নিশ্চয়তা')}</h4>
            <span className="text-[10px] font-mono text-[#66E3FF] uppercase tracking-widest block mt-0.5">
              ⭐ {t('100% Authentic Diecast', '১০০% অরিজিনাল ডাইকাস্ট')}
            </span>
          </div>
        </div>

        {/* Detailed clause segments */}
        <div className="lg:col-span-9 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          
          <div className="flex gap-2.5 items-start">
            <Info className="w-4 h-4 text-[#4DA3FF] shrink-0 mt-0.5" />
            <p>
              {t(
                'Velocity Diecast Hub curates factory-sealed, authentic diecast scale models from verified global distributors and manufacturers including Hot Wheels (Mattel), CCA, Inno64, and Tarmac Works.',
                'ভেলোসিটি ডাইকাস্ট হাব ভেরিফাইড গ্লোবাল ডিস্ট্রিবিউটর ও প্রস্তুতকারক (হট হুইলস, ম্যাটেল, সিসিএ, ইনো৬৪, টারম্যাক ওয়ার্কস) থেকে শতভাগ আসল ও ইনট্যাক্ট সিলড স্কেল মডেল সরবরাহ করে।'
              )}
            </p>
          </div>

          <div className="flex gap-2.5 items-start">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              {t(
                'Collector Notice: Precision scale miniature cars contain delicate components and small parts. These collectible items are designed for enthusiasts and hobbyists (ages 14+), not intended as heavy-impact toys for young infants.',
                'কালেক্টর সতর্কতা: প্রেসিশন স্কেল ডাইকাস্ট গাড়িতে সূক্ষ্ম যন্ত্রাংশ ও ক্ষুদ্র পার্টস থাকে। এগুলো মূলত সৌখিন কালেক্টরদের প্রদর্শনী ও সংগ্রহের জন্য তৈরি (১৪+ বছর), ছোট শিশুদের খেলনা হিসেবে ব্যবহারযোগ্য নয়।'
              )}
            </p>
          </div>

          <div className="flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[#66E3FF]/90">
              {t(
                'Mint Condition Protection: Every order undergoes multi-point inspection prior to dispatch. If a package arrives with significant transit damage to the blister or acrylic display casing, our customer team will promptly arrange a return or replacement.',
                'মিন্ট কন্ডিশন প্রটেকশন: প্রতিটি অর্ডার প্রেরণের আগে পুঙ্খানুপুঙ্খভাবে চেক করা হয়। ট্রানজিটে কোনো কারণে কার্ড বা অ্যাক্রিলিক কেস ক্ষতিগ্রস্ত হলে আমাদের কাস্টমার সাপোর্ট টিম দ্রুত রিটার্ন বা রিপ্লেসমেন্ট প্রদান করবে।'
              )}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
