/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Send, Users, ShieldCheck, X, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';

export const TelegramWidget: React.FC = () => {
  const { settings, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // Floating button bobbing motion
  const floatTransition = {
    animate: {
      y: [0, -8, 0],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div id="telegram_floating_widget_root" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="telegram_quick_popup_modal"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="mb-4 w-80 sm:w-96 bg-[#020512]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-slate-100 overflow-hidden relative"
          >
            {/* Ambient background blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4DA3FF]/5 rounded-full blur-2xl pointer-events-none"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#4DA3FF]/10 flex items-center justify-center text-[#4DA3FF]">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#020512]"></span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-tight">{t('BDIH Telegram Desk', 'বিডিআইএইচ টেলিগ্রাম ডেস্ক')}</h4>
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                    <span>{t('Mentors Online: Active', 'মেন্টর সাপোর্ট অ্যাক্টিভ')}</span>
                  </span>
                </div>
              </div>
              <button 
                id="close_tg_popup"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Content Body */}
            <div className="space-y-4 pt-4 relative z-10">
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {t(
                  'Connect with 4,800+ traders in our official BDIH Telegram community or chat directly with our mentor desk for course & indicator guidance.',
                  'আমাদের অফিশিয়াল বিডিআইএইচ টেলিগ্রাম গ্রুপে যুক্ত হোন অথবা যেকোনো কোর্স ও ইন্ডিকেটর সংক্রান্ত তথ্যের জন্য সরাসরি মেন্টর ডেস্কে যোগাযোগ করুন।'
                )}
              </p>

              {/* Action 1: Personal Support Contact */}
              <a 
                id="tg_popup_personal_link"
                href={settings.contactTelegram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-3 bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-[#4DA3FF]/20 rounded-xl transition-all duration-300 font-sans cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-450/5 text-sky-400 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <strong className="block text-xs text-white tracking-wider font-bold">{t('Mentor Support Desk', 'মেন্টর সাপোর্ট ডেস্ক')}</strong>
                    <span className="text-[9px] text-slate-500 block font-mono">{settings.ownerTelegramUsername}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#4DA3FF] transition-all group-hover:translate-x-0.5" />
              </a>

              {/* Action 2: Premium Group Portal */}
              <a 
                id="tg_popup_group_link"
                href={settings.contactTelegramGroup}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-3 bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-yellow-500/10 rounded-xl transition-all duration-300 font-sans cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-450/5 text-yellow-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <strong className="block text-xs text-white tracking-wider font-bold">{t('Collector Alerts Channel', 'প্রিমিয়াম কালেক্টর কমিউনিটি')}</strong>
                    <span className="text-[9px] text-slate-500 block font-mono">{t('Scale Model News Feed', 'নতুন ড্রপ ও কার কালেকশন আপডেট')}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-yellow-400 transition-all group-hover:translate-x-0.5" />
              </a>

              {/* Status footer inside quick modal */}
              <div className="pt-2 flex items-center gap-1.5 text-[9px] uppercase font-mono text-slate-500 tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4DA3FF]" />
                <span>{t('SSL Encrypted Connection', 'নিরাপদ এনক্রিপ্টেড পেমেন্ট ও তথ্য আদান প্রদান')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Clean, Subtle Glow) */}
      <motion.button
        id="telegram_floating_action_trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(77, 163, 255, 0.4)" }}
        whileTap={{ scale: 0.94 }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: {
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="w-12 h-12 rounded-full bg-[#4DA3FF] hover:bg-[#66E3FF] text-[#020512] flex items-center justify-center shadow-[0_4px_20px_rgba(77,163,255,0.25)] border border-white/15 cursor-pointer relative group"
        title="Telegram Support"
      >
        <Send className="w-5 h-5 transition-transform group-hover:scale-105" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-cyan-500 border border-white text-[8px] font-sans font-bold text-white flex items-center justify-center shadow-lg">1</span>
      </motion.button>
    </div>
  );
};
