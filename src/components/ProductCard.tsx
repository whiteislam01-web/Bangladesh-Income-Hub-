/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  ArrowRight, Sparkles, BookOpen, GraduationCap, TrendingUp, HardDriveDownload, BadgePercent, ShieldCheck, ShoppingCart
} from 'lucide-react';
import { Product, ViewType } from '../types';
import { useApp } from '../context/AppContext';

export interface ProductCardProps {
  /** The backend-ready product data conforming to the standard Product interface */
  product: Product;
  /** Optional index for staggered list animations */
  index?: number;
  /** Custom click handler for overriding the default View Details redirection */
  onClick?: () => void;
  /** Custom handler for CTA button clicks */
  onCtaClick?: () => void;
  /** Forces a featured badge display in styling or overrides metadata */
  isFeaturedOverride?: boolean;
}

/**
 * A ultra-premium, reusable glassmorphic Product Card representing the pinnacle of Fintech/E-learning design systems.
 * It uses a blue/white luxury color palette, micro-interactive 3D parallax hover mechanics, dynamic shininess overlay, 
 * and dual BDT/USD pricing arrays ready for production databases.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  onClick,
  onCtaClick,
  isFeaturedOverride = false
}) => {
  const { setView, formatPrice, t, addToCart } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Interactive 3D parallax states
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120, mass: 1.2 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coords (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const bannerText = isFeaturedOverride || product.is_featured;
  const hasDiscount = product.discount_usd !== undefined && product.discount_usd < product.price_usd;

  // Derive percent saved if discount exists
  let discountPercent = 0;
  if (hasDiscount && product.price_usd > 0) {
    discountPercent = Math.round(((product.price_usd - product.discount_usd!) / product.price_usd) * 100);
  }

  // Choose visual helper icon based on product type
  const getTypeMetadata = (): { icon: React.ReactNode; label: string } => {
    switch (product.type) {
      case 'course':
        return {
          icon: <GraduationCap className="w-3.5 h-3.5 text-sky-400" />,
          label: t('Online Course', 'অনলাইন কোর্স')
        };
      case 'indicator':
        return {
          icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />,
          label: t(product.platform || 'Trading Indicator', 'ট্রেডিং ইন্ডিকেটর')
        };
      case 'template':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" />,
          label: t('Notion OS / Template', 'নোশন টেমপ্লেট')
        };
      case 'software':
        return {
          icon: <HardDriveDownload className="w-3.5 h-3.5 text-cyan-400" />,
          label: t('Trading Tool / EA', 'ট্রেডিং রোবট / টুল')
        };
      case 'ebook':
      case 'pdf':
        return {
          icon: <BookOpen className="w-3.5 h-3.5 text-amber-400" />,
          label: t('Strategy Ebook / PDF', 'স্ট্র্যাটেজি ইবুক')
        };
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" />,
          label: t('Digital Product', 'ডিজিটাল প্রোডাক্ট')
        };
    }
  };

  const meta = getTypeMetadata();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setView('product-details', product.slug);
    }
  };

  const handleMainCta = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation trigger
    if (onCtaClick) {
      onCtaClick();
    } else {
      // standard redirection to detail view for user consideration
      setView('product-details', product.slug);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col justify-between w-full h-[470px] rounded-3xl cursor-pointer bg-gradient-to-br from-white/[0.04] via-blue-950/[0.22] to-slate-950/[0.8] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 hover:border-white/25 hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_35px_rgba(77,163,255,0.18)]"
    >
      {/* Interactive Laser Shine overlay */}
      {hovered && (
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.18) 0%, rgba(77,163,255,0.04) 50%, transparent 100%)`,
          }}
        />
      )}

      {/* Surface Glossy Shine Refractions */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.007] to-white/[0.035] rounded-3xl" />
      
      {/* Absolute Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        {bannerText && (
          <span className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-[#00E5FF] text-slate-950 font-bold text-[9px] tracking-wide uppercase px-2.5 py-1 rounded-full shadow-lg font-mono">
            <Sparkles className="w-2.5 h-2.5 fill-slate-950 animate-pulse" />
            {t('BEST PRODUCT', 'সেরা প্রডাক্ট')}
          </span>
        )}
        {hasDiscount && (
          <span className="flex items-center gap-0.5 bg-rose-500/90 text-white font-extrabold text-[9px] tracking-wider px-2 py-0.5 rounded-full shadow-md font-mono">
            <BadgePercent className="w-3 h-3 mr-0.5" />
            {discountPercent}% {t('OFF', 'ছাড়')}
          </span>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="bg-slate-950/80 backdrop-blur-md border border-white/10 text-[9px] text-zinc-300 px-2 py-1 rounded-md font-mono flex items-center gap-1.5 shadow">
          {meta.icon}
          {meta.label}
        </span>
      </div>

      {/* Main card body container */}
      <div className="flex flex-col h-full">
        {/* Animated Image Wrapper */}
        <div className="relative h-[220px] w-full overflow-hidden bg-slate-950/40 rounded-t-3xl border-b border-white/5">
          {/* Shimmer Placeholder behind slow loading elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-blue-950/40 animate-pulse" />
          
          <img 
            src={product.image} 
            alt={t(product.title_en, product.title_bn)} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105" 
          />
          {/* Darker subtle bottom vignette overlay for rich contrast */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent" />
        </div>

        {/* Content Section: Title and descriptions */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-[10px] text-blue-400 font-mono tracking-widest uppercase font-semibold">
              <ShieldCheck className="w-3 h-3 inline text-emerald-400" />
              {t('Verified Hub Asset', 'যাচাইকৃত সলিউশন')}
            </div>
            
            <h3 className="text-white text-base sm:text-lg font-bold font-display line-clamp-1 group-hover:text-[#4DA3FF] transition-colors leading-snug">
              {t(product.title_en, product.title_bn)}
            </h3>
            
            <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
              {t(product.short_desc_en, product.short_desc_bn)}
            </p>
          </div>

          {/* Luxury Tags list representation */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 md:gap-1.5 pt-2">
              {product.tags.slice(0, 2).map((tg, i) => (
                <span key={i} className="text-[9px] font-mono text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full capitalize">
                  #{tg}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-[9px] font-mono text-blue-400 font-bold px-1.5 py-0.5">
                  +{product.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer bar containing Pricing details and elegant CTA */}
      <div className="px-5 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between rounded-b-3xl mt-auto">
        <div className="flex flex-col">
          {hasDiscount ? (
            <>
              <span className="text-[10px] sm:text-xs text-slate-500 line-through font-mono tracking-tight">
                {formatPrice(product.price_usd, product.price_bdt)}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-[#66E3FF] font-mono leading-none tracking-tight mt-0.5">
                {formatPrice(product.discount_usd!, product.discount_bdt!)}
              </span>
            </>
          ) : (
            <span className="text-base sm:text-lg font-bold text-white font-mono leading-none tracking-tight">
              {formatPrice(product.price_usd, product.price_bdt)}
            </span>
          )}
        </div>

        {/* Action Button styled as a high-end luxury CTA */}
        <button
          onClick={handleMainCta}
          className="flex lg:flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all border border-blue-500/30 bg-blue-500/10 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-[#00E5FF] hover:border-transparent hover:text-slate-950 shadow-md group-hover:scale-103"
        >
          <span>{product.type === 'service' ? t('Pre-Order', 'প্রি-অর্ডার') : t('Buy Now', 'এখনই কিনুন')}</span>
          <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};
