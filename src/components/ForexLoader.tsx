/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface ForexLoaderProps {
  progress: number;
  stepLabel?: string;
}

export const ForexLoader: React.FC<ForexLoaderProps> = ({ progress, stepLabel }) => {
  return (
    <div 
      id="bdih_minimal_premium_loader"
      className="absolute inset-0 w-full h-full bg-[#030612] flex flex-col items-center justify-center select-none pointer-events-none z-[9999] overflow-hidden"
    >
      {/* Subtle ambient luxury light vignette */}
      <div className="absolute w-[480px] h-[480px] rounded-full bg-sky-500/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Minimalist BDIH Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 rounded-2xl bg-sky-400/10 blur-xl scale-125" />
          
          <div className="relative w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <span className="text-white font-black text-lg tracking-wider font-mono">BDIH</span>
          </div>
        </motion.div>

        {/* Brand Title */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold text-sm tracking-[0.2em] uppercase font-sans">
              BANGLADESH
            </span>
            <span className="text-sky-400 font-extrabold text-sm tracking-[0.2em] uppercase font-sans">
              INCOME HUB
            </span>
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-slate-400 mt-1 font-mono">
            Digital Education & Trading Tools
          </span>
        </motion.div>

        {/* Minimal Hairline Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-56 mt-8"
        >
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
              }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] font-mono">
            <span className="text-slate-400 tracking-wide truncate max-w-[170px] text-left">
              {stepLabel || 'Loading platform...'}
            </span>
            <span className="text-slate-200 font-medium ml-2">
              {progress}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
