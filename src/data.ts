/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Product, Category, FAQ, Review, BlogPost, SiteSettings } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-courses',
    name_en: 'Trading Courses',
    name_bn: 'ট্রেডিং কোর্সেস',
    slug: 'trading-courses',
    icon: 'GraduationCap',
    description_en: 'Comprehensive step-by-step masterclasses on SMC, Price Action, and Algorithmic Trading.',
    description_bn: 'এসএমসি, প্রাইস অ্যাকশন ও অ্যালগো ট্রেডিংয়ের ওপর স্টেপ-বাই-স্টেপ প্রফেশনাল মাস্টারক্লাস।'
  },
  {
    id: 'cat-indicators',
    name_en: 'TradingView Indicators',
    name_bn: 'ট্রেডিংভিউ ইন্ডিকেটরস',
    slug: 'tradingview-indicators',
    icon: 'TrendingUp',
    description_en: 'Proprietary Pine Script indicators for institutional order blocks, FVGs, and session killzones.',
    description_bn: 'অর্ডার ব্লক, ফেয়ার ভ্যালু গ্যাপ ও সেশন কিলজোন ডিটেকশন প্রিমিয়াম পাইনস্ক্রিপ্ট টুলস।'
  },
  {
    id: 'cat-mt-tools',
    name_en: 'MT4 & MT5 Tools',
    name_bn: 'মেটাট্রেডার ৪ ও ৫ টুলস',
    slug: 'mt4-mt5-tools',
    icon: 'Sliders',
    description_en: 'Custom indicators, expert advisors (EA), and risk managers for MT4 and MT5 terminals.',
    description_bn: 'মেটাট্রেডার ৪ ও ৫ এর জন্য তৈরি কাস্টম ইন্ডিকেটর, ইএ এবং অটোমেটেড রিস্ক ম্যানেজার।'
  },
  {
    id: 'cat-ebooks',
    name_en: 'Ebooks & Playbooks',
    name_bn: 'ইবুক ও স্ট্র্যাটেজি গাইড',
    slug: 'ebooks-playbooks',
    icon: 'BookOpen',
    description_en: 'Digital PDFs, cheat sheets, and actionable high-probability institutional entry setups.',
    description_bn: 'ডিজিটাল হ্যান্ডবুক, এন্ট্রি চিটশিট এবং হাই-প্রোবাবিলিটি ট্রেডিং স্ট্র্যাটেজি পিডিএফ।'
  },
  {
    id: 'cat-templates',
    name_en: 'Templates & Software',
    name_bn: 'টেমপ্লেট ও সফটওয়্যার',
    slug: 'templates-software',
    icon: 'HardDriveDownload',
    description_en: 'Notion trading journals, prop-firm risk calculators, and automated trading utilities.',
    description_bn: 'নোটেশন ট্রেডিং জার্নাল, প্রপ ফার্ম রিস্ক ক্যালকুলেটর ও স্বয়ংক্রিয় সফটওয়্যার টুলস।'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-smc-mastery',
    title_en: 'Smart Money Concepts (SMC) & Institutional Order Flow Masterclass',
    title_bn: 'স্মার্ট মানি কনসেপ্টস (SMC) ও প্রাতিষ্ঠানিক অর্ডার ফ্লো মাস্টারক্লাস',
    slug: 'smc-institutional-masterclass',
    short_desc_en: 'Master institutional liquidity, order blocks, fair value gaps, and pass prop-firm challenges with systematic edge.',
    short_desc_bn: 'প্রাতিষ্ঠানিক লিকুইডিটি, অর্ডার ব্লক, ফেয়ার ভ্যালু গ্যাপ আয়ত্ত করুন এবং প্রপ ফার্ম চ্যালেঞ্জ সফলভাবে পাস করার পূর্ণাঙ্গ গাইড।',
    full_desc_en: 'This comprehensive BDIH flagship masterclass demystifies how central banks, financial institutions, and algorithmic market makers move global liquidity in Forex, Gold, and Crypto markets. You will learn to identify real Market Structure shifts (BOS, CHoCH), pinpoint unmitigated Order Blocks, trade imbalance rebalances (FVG), and construct strict multi-timeframe trade entries with exceptional Risk-to-Reward ratios (1:5 to 1:15). Includes dedicated prop-firm passing blueprints, daily psychological journaling habits, and live case breakdowns.',
    full_desc_bn: 'বিডিআইএইচের এই ফ্ল্যাগশিপ মাস্টারক্লাসে শিখুন কীভাবে কেন্দ্রীয় ব্যাংক, শীর্ষ আর্থিক প্রতিষ্ঠান এবং অ্যালগরিদমিক মার্কেট মেকাররা ফরেক্স, গোল্ড ও ক্রিপ্টো মার্কেটে লিকুইডিটি নিয়ন্ত্রণ করে। রিটেইল ফাঁদ এড়িয়ে মার্কেট স্ট্রাকচার ব্রেক (BOS), চেঞ্জ অফ ক্যারেক্টার (CHoCH), আনমিটিগেটেড অর্ডার ব্লক এবং ফেয়ার ভ্যালু গ্যাপ (FVG) নিখুঁতভাবে চিহ্নিত করার সম্পূর্ণ নিয়মাবলী। এতে রয়েছে প্রপ ফার্ম পাস করার গাইডলাইন, সাইকোলজি এবং লাইভ মার্কেট টেস্ট।',
    price_usd: 80,
    price_bdt: 9600,
    discount_usd: 55,
    discount_bdt: 6600,
    level: 'All Levels',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    promo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration_hours: 18.5,
    total_lessons: 14,
    instructor_name: 'Engr. Tanvir Ahmed',
    instructor_role: 'Chief Market Analyst & Funded Trader',
    instructor_bio: 'Full-time institutional forex and commodities trader with 7+ years market experience. Funded with $300k across FTMO and FundedNext. Mentored over 1,500+ successful traders across Bangladesh.',
    is_published: true,
    is_featured: true,
    tags: ['SMC', 'Forex', 'Prop Firm', 'Institutional Trading', 'Gold Scalping'],
    learning_outcomes_en: [
      'Understand how institutional algorithms accumulate and hunt retail liquidity',
      'Identify genuine Order Blocks vs invalid retail support/resistance levels',
      'Execute high RR trades with 3 to 5 pip stop losses on Gold and Major Currencies',
      'Formulate a risk-first framework specifically designed to pass FTMO/MFF/FundedNext challenges',
      'Access proprietary SMC checklist PDFs, Notion journal templates, and private mentor community'
    ],
    learning_outcomes_bn: [
      'প্রাতিষ্ঠানিক অ্যালগরিদম কীভাবে লিকুইডিটি সংগ্রহ করে তা পরিষ্কারভাবে বোঝা',
      'ভুয়া রিটেইল সাপোর্ট/রেজিস্ট্যান্স বাদ দিয়ে আসল অর্ডার ব্লক নিখুঁতভাবে শনাক্ত করা',
      'গোল্ড ও প্রধান কারেন্সিতে মাত্র ৩-৫ পিপ স্টপ লস দিয়ে ১:৫ থেকে ১:১০ রেশিওতে এন্ট্রি নেওয়া',
      'FTMO ও FundedNext এর মতো প্রপ ফার্ম চ্যালেঞ্জ পাস করার সঠিক রিস্ক ম্যানেজমেন্ট ফ্রেমওয়ার্ক',
      'এক্সক্লুসিভ এসএমসি চেকলিস্ট পিডিএফ, নোশন ট্রেডিং জার্নাল এবং প্রাইভেট ডিসকর্ড কমিউনিটি এক্সেস'
    ],
    prerequisites_en: ['Basic understanding of candlestick charts and trading platforms (TradingView / MT5)'],
    prerequisites_bn: ['ক্যান্ডেলস্টিক চার্ট ও ট্রেডিংভিউ/মেটাট্রেডার ব্যবহারের প্রাথমিক ধারণা'],
    modules: [
      {
        id: 'mod-1',
        title_en: 'Module 1: True Market Structure & Liquidity Architecture',
        title_bn: 'মডিউল ১: রিয়াল মার্কেট স্ট্রাকচার ও লিকুইডিটি আর্কিটেকচার',
        order: 1,
        lessons: [
          {
            id: 'les-1-1',
            title_en: '1.1 The Retail Trap vs Institutional Mechanics',
            title_bn: '১.১ রিটেইল ফাঁদ বনাম প্রাতিষ্ঠানিক মেকানিক্স',
            order: 1,
            duration_minutes: 32,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: true,
            notes_en: 'Introduction to how interbank price delivery algorithms engineer liquidity pools above equal highs and equal lows.'
          },
          {
            id: 'les-1-2',
            title_en: '1.2 Mapping BOS (Break of Structure) & Valid CHoCH',
            title_bn: '১.২ বিওএস (BOS) ও ভ্যালিড সিএইচওসিএইচ (CHoCH) ম্যাপিং',
            order: 2,
            duration_minutes: 48,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false,
            notes_en: 'Step-by-step rules to differentiate real structural breaks from liquidity sweeps (wick breaches).'
          },
          {
            id: 'les-1-3',
            title_en: '1.3 Inducement & Internal vs External Range Liquidity',
            title_bn: '১.৩ ইনডিউসমেন্ট এবং ইন্টারনাল বনাম এক্সটারনাল লিকুইডিটি',
            order: 3,
            duration_minutes: 42,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false,
            notes_en: 'Never be the liquidity. How to identify inducement highs/lows before placing your limits.'
          }
        ]
      },
      {
        id: 'mod-2',
        title_en: 'Module 2: Order Blocks, Breakers & Imbalance (FVG)',
        title_bn: 'মডিউল ২: অর্ডার ব্লক, ব্রেকার ব্লক ও ফেয়ার ভ্যালু গ্যাপ (FVG)',
        order: 2,
        lessons: [
          {
            id: 'les-2-1',
            title_en: '2.1 Refining High-Probability Order Blocks',
            title_bn: '২.১ হাই-প্রোবাবিলিটি অর্ডার ব্লক নিখুঁতভাবে চিহ্নিতকরণ',
            order: 1,
            duration_minutes: 50,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false,
            notes_en: 'Filtering out false zones. Only trading order blocks that swept liquidity and created clear imbalance.'
          },
          {
            id: 'les-2-2',
            title_en: '2.2 Fair Value Gaps (FVG) & Volume Imbalances',
            title_bn: '২.২ ফেয়ার ভ্যালু গ্যাপ (FVG) ও ভলিউম ইমব্যালেন্স ট্রেডিং',
            order: 2,
            duration_minutes: 38,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false,
            notes_en: 'How algorithms deliver repricing to rebalance unfilled inefficiencies (FVG/BIS/SIB).'
          },
          {
            id: 'les-2-3',
            title_en: '2.3 Breaker Blocks & Mitigation Sequences',
            title_bn: '২.৩ ব্রেকার ব্লক ও মিটিগেশন সিকোয়েন্স',
            order: 3,
            duration_minutes: 45,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false
          }
        ]
      },
      {
        id: 'mod-3',
        title_en: 'Module 3: Killzones, Sessions & Precision Entry Models',
        title_bn: 'মডিউল ৩: কিলজোন, সেশন টাইমিং ও প্রেসিশন এন্ট্রি মডেলস',
        order: 3,
        lessons: [
          {
            id: 'les-3-1',
            title_en: '3.1 London Open & New York AM Killzone Timing',
            title_bn: '৩.১ লন্ডন ওপেন ও নিউ ইয়র্ক এএম কিলজোন টাইম ফ্রেম',
            order: 1,
            duration_minutes: 40,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false
          },
          {
            id: 'les-3-2',
            title_en: '3.2 Multi-Timeframe Alignment: 4H/15M/1M Confirmation',
            title_bn: '৩.২ মাল্টি-টাইমফ্রেম অ্যালাইনমেন্ট: ৪ঘণ্টা/১৫মি/১মি কনফার্মেশন',
            order: 2,
            duration_minutes: 55,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false
          }
        ]
      },
      {
        id: 'mod-4',
        title_en: 'Module 4: Prop Firm Passing & Risk Management Blueprint',
        title_bn: 'মডিউল ৪: প্রপ ফার্ম পাসিং ও রিস্ক ম্যানেজমেন্ট ব্লুপ্রিন্ট',
        order: 4,
        lessons: [
          {
            id: 'les-4-1',
            title_en: '4.1 Daily Drawdown & Equity Preservation Math',
            title_bn: '৪.১ ডেইলি ড্র-ডাউন ও ইকুইটি প্রটেকশনের গাণিতিক হিসাব',
            order: 1,
            duration_minutes: 44,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false
          },
          {
            id: 'les-4-2',
            title_en: '4.2 Psychology of Funded Trading & Consistency',
            title_bn: '৪.২ ফান্ডেড ট্রেডিং সাইকোলজি ও ধারাবাহিকতা ধরে রাখা',
            order: 2,
            duration_minutes: 50,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-price-action-bootcamp',
    title_en: 'Advanced Price Action & High-Frequency Scalping Bootcamp',
    title_bn: 'অ্যাডভান্সড প্রাইস অ্যাকশন ও হাই-ফ্রিকোয়েন্সি স্ক্যাল্পিং বুটক্যাম্প',
    slug: 'price-action-scalping-bootcamp',
    short_desc_en: 'Learn bare-chart candlestick confluence, momentum shifts, and fast intraday execution for Gold and US30.',
    short_desc_bn: 'কোনো জটিল ইন্ডিকেটর ছাড়া খালি চার্টে ক্যান্ডেলস্টিক কনফ্লুয়েন্স, মোমেন্টাম শিফট এবং গোল্ড/ইউএস৩০ স্ক্যাল্পিং কৌশল।',
    full_desc_en: 'A high-impact, direct-to-execution trading bootcamp focused on reading live order flow without cluttered laggy indicators. Master candlestick rejections, key supply/demand flips, false breakout exploitation, and high-speed multi-lot scalping methods on 1-minute and 5-minute timeframes.',
    full_desc_bn: 'একটি বাস্তবমুখী ট্রেডিং বুটক্যাম্প যা আপনাকে কোনো ল্যাগিং ইন্ডিকেটর ছাড়াই ক্যান্ডেলের স্পিড, মোমেন্টাম এবং রিয়েল-টাইম প্রাইস বিহেভিয়ার বুঝতে শেখাবে। গোল্ড ও নাসডাক/ইউএস৩০ স্ক্যাল্পিংয়ের জন্য উপযোগী বিশেষ কৌশল।',
    price_usd: 50,
    price_bdt: 6000,
    discount_usd: 35,
    discount_bdt: 4200,
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
    promo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration_hours: 12.0,
    total_lessons: 10,
    instructor_name: 'Mahmudul Hasan (Rony)',
    instructor_role: 'Senior Scalper & Technical Analyst',
    instructor_bio: 'Prop-firm funded scalper specializing in XAUUSD (Gold) intraday momentum. Over 5 years of active market trading.',
    is_published: true,
    is_featured: true,
    tags: ['Price Action', 'Gold Scalping', 'US30', 'Candlestick Patterns'],
    learning_outcomes_en: [
      'Trade purely using raw price delivery and key levels',
      'Exploit false breakouts and liquidity grab wicks',
      'Execute high-probability 1-minute scalps with disciplined partial profit taking'
    ],
    learning_outcomes_bn: [
      'কোনো অতিরিক্ত ইন্ডিকেটর ছাড়া র’ প্রাইস চার্ট দেখে দ্রুত সিদ্ধান্ত নেওয়া',
      'ফলস ব্রেকআউট চিনে রিটেইলারদের বিপরীতে ট্রেড ধরা',
      '১ মিনিট চার্টে ডিসিপ্লিনড স্ক্যাল্পিং এবং সিস্টেমেটিক প্রফিট বুকিং'
    ],
    modules: [
      {
        id: 'mod-pa-1',
        title_en: 'Module 1: Candlestick Velocity & Key Zone Flips',
        title_bn: 'মডিউল ১: ক্যান্ডেলস্টিক ভেলোসিটি ও সাপোর্ট-রেজিস্ট্যান্স ফ্লিপ',
        order: 1,
        lessons: [
          {
            id: 'les-pa-1',
            title_en: '1.1 Decoding Wicks: Absorption vs Exhaustion',
            title_bn: '১.১ উইক অ্যানালাইসিস: অ্যাবসর্পশন বনাম এক্সহশন',
            order: 1,
            duration_minutes: 35,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: true
          },
          {
            id: 'les-pa-2',
            title_en: '1.2 Gold (XAUUSD) Volatility & London Breakout Rules',
            title_bn: '১.২ গোল্ড ভলাটিলিটি ও লন্ডন ব্রেকআউট ট্র্যাপ',
            order: 2,
            duration_minutes: 45,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-algo-python',
    title_en: 'Algorithmic Trading & Automated Strategy Development (Pine Script & MQL5)',
    title_bn: 'অ্যালগরিদমিক ট্রেডিং ও স্ট্র্যাটেজি অটোমেশন (পাইনস্ক্রিপ্ট ও এমকিউএল৫)',
    slug: 'algorithmic-trading-automation',
    short_desc_en: 'Build, backtest, and automate your trading strategies into custom TradingView indicators and MT5 Expert Advisors.',
    short_desc_bn: 'আপনার নিজস্ব ট্রেডিং স্ট্র্যাটেজি কোডিং করে স্বয়ংক্রিয় ট্রেডিংভিউ ইন্ডিকেটর এবং এমটি৫ রোবট/ইএ তৈরি করার কমপ্লিট কোর্স।',
    full_desc_en: 'Designed for traders who want to eliminate human emotion and scale their edge with automated systems. You will learn Pine Script v5 from scratch to create custom indicators and alert strategies, followed by MQL5 fundamentals to build robust Expert Advisors running 24/7 on Virtual Private Servers (VPS).',
    full_desc_bn: 'ইমোশনলেস ট্রেডিং এবং সম্পূর্ণ অটোমেশনের জন্য তৈরি এই কোর্সে আপনি জিরো থেকে পাইন স্ক্রিপ্ট v5 শিখবেন যা দিয়ে ট্রেডিংভিউতে কাস্টম অ্যালার্ট ও ইন্ডিকেটর তৈরি করা যায়। এছাড়া MQL5 দিয়ে মেটাট্রেডারের জন্য রোবট (EA) তৈরি করে ভিপিএসে চালানোর সম্পূর্ণ বাস্তবধর্মী প্রশিক্ষণ।',
    price_usd: 90,
    price_bdt: 10800,
    discount_usd: 65,
    discount_bdt: 7800,
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    promo_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration_hours: 15.0,
    total_lessons: 11,
    instructor_name: 'Sadman Sakib',
    instructor_role: 'Quantitative Developer & Algo Architect',
    instructor_bio: 'Full-stack software engineer and quant trader with 6 years experience building algorithmic execution engines.',
    is_published: true,
    is_featured: true,
    tags: ['Pine Script', 'MQL5', 'Algo Trading', 'Automation', 'Python'],
    learning_outcomes_en: [
      'Write custom Pine Script v5 indicators and strategies with webhook alerts',
      'Code MT5 Expert Advisors with fixed risk percentage and trailing stop logic',
      'Conduct rigorous backtests avoiding lookahead bias and curve-fitting'
    ],
    learning_outcomes_bn: [
      'পাইন স্ক্রিপ্ট v5 দিয়ে কাস্টম ইন্ডিকেটর ও অটোমেটেড অ্যালার্ট তৈরি',
      'মেটাট্রেডার ৫ এর জন্য নিজস্ব ইএ (EA) ও ট্রেইলিং স্টপ কোডিং',
      'ওভারফিটিং এড়িয়ে নিখুঁত হিস্টোরিকাল ব্যাকটেস্টিং মেথডোলজি'
    ],
    modules: [
      {
        id: 'mod-algo-1',
        title_en: 'Module 1: Pine Script v5 Essentials for TradingView',
        title_bn: 'মডিউল ১: ট্রেডিংভিউ পাইনস্ক্রিপ্ট v5 ফান্ডামেন্টালস',
        order: 1,
        lessons: [
          {
            id: 'les-algo-1',
            title_en: '1.1 Setting up Pine Editor & Plotting Your First Setup',
            title_bn: '১.১ পাইন এডিটর সেটআপ ও প্রথম কোড রান করা',
            order: 1,
            duration_minutes: 40,
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            is_free_preview: true
          }
        ]
      }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-ind-ob-liquidity',
    title_en: 'BDIH Institutional Order Block & Liquidity Radar Pro',
    title_bn: 'বিডিআইএইচ প্রাতিষ্ঠানিক অর্ডার ব্লক ও লিকুইডিটি রাডার প্রো',
    slug: 'bdih-orderblock-liquidity-radar',
    short_desc_en: 'Automated multi-timeframe Order Block identification, real-time BOS/CHoCH mapping, and dynamic liquidity sweeps on TradingView.',
    short_desc_bn: 'ট্রেডিংভিউয়ের জন্য অটোমেটেড মাল্টি-টাইমফ্রেম অর্ডার ব্লক, স্ট্রাকচার ব্রেক ও লিকুইডিটি সুইপ নির্দেশক প্রিমিয়াম ইন্ডিকেটর।',
    full_desc_en: 'Eliminate subjective charting errors. The BDIH Order Block & Liquidity Radar script automatically tracks institutional liquidity injection across multiple timeframes simultaneously. Features include: automated premium/discount equilibrium boxes, unmitigated order block tracking with live volume metrics, fair value gap highlights with touch count filters, and instant push/Telegram alert webhooks for confirmed structural breaks.',
    full_desc_bn: 'ম্যানুয়াল চার্টিংয়ের ভুল এড়িয়ে স্বয়ংক্রিয়ভাবে প্রাতিষ্ঠানিক লিকুইডিটি জোন চিহ্নিত করুন। এই ইন্ডিকেটরটি স্বয়ংক্রিয়ভাবে প্রিমিয়াম ও ডিসকাউন্ট জোন, আনমিটিগেটেড অর্ডার ব্লক এবং ফেয়ার ভ্যালু গ্যাপ লাইভ চার্টে এঁকে দেয়। এটি কনফার্মড ব্রেকআউট হলে সরাসরি টেলিগ্রাম ও ট্রেডিংভিউ অ্যালার্ট পাঠাতে সক্ষম।',
    price_usd: 45,
    price_bdt: 5400,
    discount_usd: 35,
    discount_bdt: 4200,
    category: 'tradingview-indicators',
    type: 'indicator',
    platform: 'TradingView',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    is_active: true,
    is_featured: true,
    download_file_url: 'https://bdih.com/indicators/BDIH_Liquidity_Radar_v4.2.pine',
    license_type: 'Lifetime',
    licenseKey: 'BDIH-TV-OB8942-LIFETIME',
    access_instructions_en: 'Upon purchase approval, you will receive instant TradingView Invite-Only script access directly to your TradingView username, along with the source Pine Script code and a 20-minute video walkthrough.',
    access_instructions_bn: 'পেমেন্ট অনুমোদনের পর সরাসরি আপনার ট্রেডিংভিউ ইউজারনেমে ইনভাইট-অনলি স্ক্রিপ্ট অ্যাক্টিভ করে দেওয়া হবে এবং সাথে থাকবে ভিডিও সেটআপ গাইড।',
    cta_text_en: 'Get Lifetime Access',
    cta_text_bn: 'লাইফটাইম এক্সেস নিন',
    tags: ['TradingView', 'Pine Script', 'SMC', 'Order Blocks', 'Indicator']
  },
  {
    id: 'prod-ind-fvg-mt5',
    title_en: 'BDIH Fair Value Gap (FVG) & Imbalance Sniper (MT4 / MT5)',
    title_bn: 'বিডিআইএইচ ফেয়ার ভ্যালু গ্যাপ (FVG) স্নাইপার ইন্ডিকেটর (MT4 / MT5)',
    slug: 'bdih-fvg-imbalance-sniper-mt5',
    short_desc_en: 'Precision MQL5/MQL4 indicator marking live imbalance zones, multi-candle gaps, and mitigation fill alerts with zero chart lag.',
    short_desc_bn: 'মেটাট্রেডার ৪ ও ৫ এর জন্য তৈরি নির্ভুল FVG ও ইমব্যালেন্স নির্দেশক সফটওয়্যার, কোনো প্রকার ল্যাগ বা রিপেইন্ট ছাড়াই।',
    full_desc_en: 'Built specifically for high-frequency scalpers and intraday traders on MetaTrader 4 & 5. It calculates candle body-to-wick velocity, automatically highlights fresh unmitigated imbalances, draws midline (consequent encroachment 50%) levels, and triggers desktop audio notifications as soon as price tests the zone.',
    full_desc_bn: 'মেটাট্রেডার ৪ ও ৫ প্ল্যাটফর্মের জন্য বিশেষভাবে নির্মিত। এটি কোনো রি-পেইন্ট ছাড়া তাৎক্ষণিকভাবে চার্টে ফেয়ার ভ্যালু গ্যাপ চিহ্নিত করে এবং প্রাইস সেই জোনে টাচ করার সাথে সাথে সাউন্ড ও নোটিফিকেশন অ্যালার্ট প্রদান করে।',
    price_usd: 35,
    price_bdt: 4200,
    discount_usd: 28,
    discount_bdt: 3360,
    category: 'mt4-mt5-tools',
    type: 'indicator',
    platform: 'MT5',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    is_active: true,
    is_featured: true,
    download_file_url: 'https://bdih.com/downloads/BDIH_FVG_Sniper_MT5_v2.ex5',
    license_type: 'Lifetime',
    licenseKey: 'BDIH-MT5-FVG-99321',
    access_instructions_en: 'Download the compiled .ex5 and .ex4 files from your dashboard. Copy to your MT5/MT4 MQL Indicators directory and restart terminal. Full PDF guide included.',
    access_instructions_bn: 'ড্যাশবোর্ড থেকে .ex5 বা .ex4 ফাইল ডাউনলোড করে আপনার মেটাট্রেডার ইন্ডিকেটর ফোল্ডারে পেস্ট করুন। সাথে বিস্তারিত পিডিএফ গাইড রয়েছে।',
    cta_text_en: 'Download MT4/MT5 Tool',
    cta_text_bn: 'টুলটি ডাউনলোড করুন',
    tags: ['MT5', 'MT4', 'FVG', 'Indicator', 'Gold']
  },
  {
    id: 'prod-ind-killzone-radar',
    title_en: 'BDIH Session Killzones & Volume Profile Radar (TradingView)',
    title_bn: 'বিডিআইএইচ সেশন কিলজোন ও ভলিউম প্রোফাইল রাডার (ট্রেডিংভিউ)',
    slug: 'bdih-session-killzone-volume-radar',
    short_desc_en: 'Dynamic London, New York & Asian session tracking with automated Initial Balance, Killzone boxes, and POC/VAH/VAL profile levels.',
    short_desc_bn: 'লন্ডন, নিউইয়র্ক ও এশিয়ান সেশনের হাই/লো, ওপেনিং রেঞ্জ এবং ভলিউম পয়েন্ট অফ কন্ট্রোল স্বয়ংক্রিয়ভাবে চার্টে প্রদর্শন।',
    full_desc_en: 'Trade when the true market volume enters. Automatically marks Asian Range sweep levels, London Open Killzone (02:00 - 05:00 EST), NY Open Killzone (07:00 - 10:00 EST), and London Close. Displays previous day high/low extensions and Point of Control (POC) magnets.',
    full_desc_bn: 'সঠিক সময়ে সঠিক সেশনে ট্রেড করার জন্য সেরা টুল। এটি স্বয়ংক্রিয়ভাবে এশিয়ান রেঞ্জ লিকুইডিটি, লন্ডন ওপেন এবং নিউইয়র্ক ওপেন কিলজোন হাইলাইট করে এবং প্রিভিয়াস ডে হাই/লো এক্সটেনশন দেখায়।',
    price_usd: 30,
    price_bdt: 3600,
    discount_usd: 22,
    discount_bdt: 2640,
    category: 'tradingview-indicators',
    type: 'indicator',
    platform: 'TradingView',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    is_featured: false,
    download_file_url: 'https://bdih.com/indicators/BDIH_Killzones_v3.pine',
    license_type: 'Lifetime',
    licenseKey: 'BDIH-TV-KZ-4482',
    tags: ['TradingView', 'Killzones', 'Volume Profile', 'Sessions']
  },
  {
    id: 'prod-tool-prop-notion',
    title_en: 'Ultimate Prop Firm Challenge Risk Management OS & Notion Journal',
    title_bn: 'প্রপ ফার্ম চ্যালেঞ্জ রিস্ক ম্যানেজমেন্ট ওএস ও নোশন ট্রেডিং জার্নাল',
    slug: 'ultimate-prop-firm-notion-journal-os',
    short_desc_en: 'Professional Notion dashboard for tracking trade metrics, daily drawdown buffers, emotional check-ins, and equity growth curve.',
    short_desc_bn: 'প্রপ ফার্ম পাস করার জন্য প্রফেশনাল নোশন ড্যাশবোর্ড: ড্র-ডাউন ক্যালকুলেশন, সাইকোলজি চেকলিস্ট ও অটোমেটেড ইকুইটি ট্র্যাকার।',
    full_desc_en: 'Over 80% of prop firm challenge failures happen due to poor risk management and daily loss limit breaches. This Notion Workspace calculates maximum allowable lot size per trade based on account balance, tracks daily loss headroom in real time, logs win-rate by setup category, and generates performance review analytics.',
    full_desc_bn: '৮০% ট্রেডার ড্র-ডাউন ভায়োলেশনের কারণে প্রপ ফার্ম একাউন্ট হারায়। এই নোশন ওএস স্বয়ংক্রিয়ভাবে আপনার একাউন্ট ব্যালেন্স অনুযায়ী সর্বোচ্চ লট সাইজ নির্ধারণ করে, ডেইলি লস লিমিটের এলার্ট দেয় এবং প্রতিটি ট্রেডের উইন-রেট বিশ্লেষণ করে।',
    price_usd: 25,
    price_bdt: 3000,
    discount_usd: 18,
    discount_bdt: 2160,
    category: 'templates-software',
    type: 'template',
    platform: 'Notion',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    is_featured: true,
    download_file_url: 'https://bdih.notion.site/BDIH-Prop-Firm-OS-Duplicate-Template',
    license_type: 'Unlimited',
    access_instructions_en: 'One-click Notion template duplication link delivered instantly upon purchase verification. Includes complete video walkthrough.',
    access_instructions_bn: 'পেমেন্ট অনুমোদনের সাথে সাথে ওয়ান-ক্লিক নোশন ডুপ্লিকেট লিংক এবং ভিডিও টিউটোরিয়াল আপনার ড্যাশবোর্ডে পাবেন।',
    tags: ['Notion', 'Trading Journal', 'Risk Management', 'Prop Firm']
  },
  {
    id: 'prod-ebook-smc-playbook',
    title_en: 'The Institutional SMC Entry Playbook: High-Probability Setups (PDF Ebook)',
    title_bn: 'ইনস্টিটিউশনাল এসএমসি এন্ট্রি প্লেবুক: হাই-প্রোবাবিলিটি সেটআপস (পিডিএফ ইবুক)',
    slug: 'institutional-smc-entry-playbook-pdf',
    short_desc_en: '130+ page high-resolution PDF guide containing 25 verified institutional trade models, entry blueprints, and cheat sheets.',
    short_desc_bn: '১৩০+ পৃষ্ঠার রঙিন ডিজিটাল হ্যান্ডবুক যাতে রয়েছে ২৫টি প্রমাণিত প্রাতিষ্ঠানিক ট্রেড এন্ট্রি মডেল এবং দ্রুত চার্ট রিডিং চিটশিট।',
    full_desc_en: 'A visual, full-color master PDF playbook breaking down the exact entry criteria for every major institutional trade setup: Liquidity Run into OB, Turtle Soup pattern, Breaker mitigation scalps, and London lunch reversals. Features pristine high-resolution annotated charts with exact stop-loss placement and take-profit targets.',
    full_desc_bn: 'ট্রেডিংয়ের সময় পাশে রাখার মতো একটি অসাধারণ রেফারেন্স বুক। এতে ২৫টি পরীক্ষিত ট্রেড সেটআপের চিত্রসহ বিশদ ব্যাখ্যা রয়েছে: লিকুইডিটি রান, টার্টল স্যুপ, ব্রেকার মিটিগেশন এবং লন্ডন রিভার্সাল। হাই-রেজোলিউশন চার্ট ও নিখুঁত এন্ট্রি পয়েন্ট নির্দেশিত।',
    price_usd: 20,
    price_bdt: 2400,
    discount_usd: 14,
    discount_bdt: 1680,
    category: 'ebooks-playbooks',
    type: 'ebook',
    platform: 'PDF',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    is_featured: false,
    download_file_url: 'https://bdih.com/downloads/BDIH_SMC_Playbook_2026_Edition.pdf',
    license_type: 'Lifetime',
    tags: ['Ebook', 'PDF', 'SMC', 'Playbook', 'Cheat Sheet']
  },
  {
    id: 'prod-tool-ea-risk-manager',
    title_en: 'BDIH Auto-Breakeven & Partial Take-Profit Utility (MT5 EA)',
    title_bn: 'বিডিআইএইচ অটো-ব্রেকইভেন ও পার্শিয়াল টেক-প্রফিট ইউটিলিটি (MT5 EA)',
    slug: 'bdih-auto-breakeven-partial-tp-ea-mt5',
    short_desc_en: 'Intelligent MT5 Expert Advisor that automatically moves SL to entry, closes partial lots at 1:2 RR, and trails stop losses.',
    short_desc_bn: 'ট্রেড ওপেন করার পর স্বয়ংক্রিয়ভাবে স্টপ লস ব্রেকইভেনে নিয়ে যাওয়া এবং পার্সিয়াল প্রফিট বুক করার এমটি৫ রোবট/ইউটিলিটি।',
    full_desc_en: 'Never let a winning trade turn into a loss again. Once attached to your MT5 chart, this lightweight EA automatically monitors your open positions. When price reaches your defined risk-reward milestone (e.g., 1:2 RR or 1:3 RR), it automatically locks in 50% partial profit and moves the stop loss to Entry + Spread buffer.',
    full_desc_bn: 'একটি প্রফিটেবল ট্রেড যেন কখনও লসে পরিণত না হয় তা নিশ্চিত করার জন্য সেরা ইউটিলিটি। ১:২ বা ১:৩ রিস্ক রিওয়ার্ডে পৌঁছানোর সাথে সাথে এটি স্বয়ংক্রিয়ভাবে ৫০% প্রফিট বুক করে স্টপ লস এন্ট্রি প্রাইসে নিয়ে আসবে।',
    price_usd: 35,
    price_bdt: 4200,
    discount_usd: 25,
    discount_bdt: 3000,
    category: 'mt4-mt5-tools',
    type: 'software',
    platform: 'MT5',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    is_featured: false,
    download_file_url: 'https://bdih.com/downloads/BDIH_Auto_Manager_MT5.ex5',
    license_type: 'Lifetime',
    tags: ['MT5', 'EA', 'Automation', 'Risk Utility']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Kazi Farhan',
    rating: 5,
    role_en: 'Funded Trader ($100k FTMO)',
    role_bn: 'ফান্ডেড ট্রেডার ($১০০k এফটিএমও)',
    country: 'Dhaka, Bangladesh',
    telegram: '@farhan_smc_bd',
    comment_en: 'BDIH Smart Money Masterclass completely changed my trading perspective. Before this, I failed 3 prop firm challenges relying on lagging indicators. Tanvir bhai’s module on liquidity sweeps helped me pass my $100k FTMO challenge in 28 days! The BDIH Order Block indicator is also a huge time saver on my charts.',
    comment_bn: 'বিডিআইএইচ এর এসএমসি মাস্টারক্লাস আমার ট্রেডিং ক্যারিয়ার সম্পূর্ণ বদলে দিয়েছে। এর আগে আমি ৩টি প্রপ ফার্ম চ্যালেঞ্জ হারিয়েছিলাম। তানভীর ভাইয়ের লিকুইডিটি সুইপ এবং অর্ডার ব্লক কনসেপ্ট অনুসরণ করে মাত্র ২৮ দিনে আমি $১০০k FTMO চ্যালেঞ্জ পাস করেছি। ইন্ডিকেটরটিও চার্টে দারুণ সাপোর্ট দেয়।',
    approved: true,
    is_featured: true
  },
  {
    id: 'rev-2',
    author: 'Arifur Rahman',
    rating: 5,
    role_en: 'Full-time Scalper',
    role_bn: 'ফুল-টাইম স্ক্যাল্পার',
    country: 'Chittagong, Bangladesh',
    telegram: '@arif_gold_scalp',
    comment_en: 'The BDIH FVG Sniper tool for MT5 combined with the Killzone Radar on TradingView is pure gold. My win rate on Gold 1-minute scalping improved from 42% to 68%. Best investment I have made in digital trading education.',
    comment_bn: 'এমটি৫ এর জন্য BDIH FVG স্নাইপার এবং ট্রেডিংভিউ কিলজোন রাডার সত্যিই অসাধারণ। গোল্ড ১-মিনিট চার্টে আমার ট্রেডিং উইন-রেট ৪২% থেকে ৬৮% এ উন্নীত হয়েছে। অত্যন্ত কার্যকর কোর্স ও টুলস।',
    approved: true,
    is_featured: true
  },
  {
    id: 'rev-3',
    author: 'Nasimul Karim',
    rating: 5,
    role_en: 'FundedNext Trader ($50k)',
    role_bn: 'ফান্ডেডনেক্সট ট্রেডার ($৫০k)',
    country: 'Sylhet, Bangladesh',
    comment_en: 'Paid via bKash, and within 15 minutes of submitting the transaction ID my course dashboard was unlocked. The video lessons are well-structured, crystal clear in Bangla, and the Notion journal OS keeps my daily risk tightly controlled. 10/10 recommend BDIH!',
    comment_bn: 'বিকাশে পেমেন্ট করে ট্রানজেকশন আইডি সাবমিট করার ১৫ মিনিটের মধ্যেই আমার কোর্স ও ডাউনলোড আনলক হয়ে যায়। ভিডিওগুলো অত্যন্ত সাবলীল বাংলায় সাজানো। নোশন জার্নালটি আমার ড্র-ডাউন নিয়ন্ত্রণে রাখতে জাদুর মতো কাজ করে।',
    approved: true,
    is_featured: true
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title_en: 'How to Pass Prop Firm Challenges (FTMO / FundedNext) Using Smart Money Concepts',
    title_bn: 'স্মার্ট মানি কনসেপ্ট (SMC) ব্যবহার করে কীভাবে প্রপ ফার্ম চ্যালেঞ্জ পাস করবেন',
    slug: 'how-to-pass-prop-firm-challenges-smc-guide',
    excerpt_en: 'A strategic blueprint on avoiding the 5% daily drawdown trap, timing institutional killzones, and maintaining a positive expectancy.',
    excerpt_bn: '৫% ডেইলি ড্র-ডাউন ট্র্যাপ এড়ানো, সঠিক কিলজোনে ট্রেড ধরা এবং পজিটিভ রিস্ক-রিওয়ার্ড ধরে রাখার সম্পূর্ণ স্ট্র্যাটেজিক গাইড।',
    content_en: `Proprietary trading firms have provided retail traders across Bangladesh and the world with unprecedented leverage. However, industry data shows that over 85% of applicants fail challenge phases. The reason is rarely the lack of profitable trades—it is the violation of strict drawdown rules.\n\n### 1. The Asymmetry of Risk\nWhen managing a $100,000 account with a 5% maximum daily loss limit ($5,000), your true functional risk capital is not $100k—it is $5,000. Risking 1% of the total account balance ($1,000) means you are risking 20% of your allowable buffer per trade! Instead, scale your risk to 0.25% - 0.50% per trade.\n\n### 2. Trading Only During High-Volume Killzones\nDo not trade during the dead Asian session or pre-market lulls. Confine your setups to the London Open (02:00 - 05:00 EST) and New York Open (07:00 - 10:00 EST) when bank liquidity rebalances fair value gaps.\n\n### 3. Confluence Over Quantity\nOne 1:5 Risk-to-Reward trade per week is all you need to comfortably achieve the 8% Phase-1 target within the allotted timeframe.`,
    content_bn: `প্রপ ফার্মগুলো বর্তমান সময়ে সাধারণ ট্রেডারদের বড় ক্যাপিটালে ট্রেড করার দারুণ সুযোগ করে দিয়েছে। কিন্তু পরিসংখ্যানে দেখা যায় ৮৫% এর বেশি ট্রেডার চ্যালেঞ্জে ব্যর্থ হন। এর মূল কারণ টেকনিক্যাল নলেজের অভাব নয়, বরং ড্র-ডাউন ম্যানেজমেন্টের ভুল।\n\n১. রিয়েল রিস্কের হিসাব:\n$১০০,০০০ এর একাউন্টে সর্বোচ্চ দৈনিক লস সীমা ৫% ($৫,০০০)। অর্থাৎ আপনার আসল লাইসেন্সড বাফার ক্যাপিটাল কিন্তু $৫,০০০। প্রতি ট্রেডে মোট একাউন্টের ১% ($১,০০০) রিস্ক নেওয়া মানে হলো আপনার বাফারের ২০% রিস্ক নেওয়া! তাই প্রতি ট্রেডে ০.২৫% থেকে ০.৫০% এর বেশি রিস্ক নেওয়া যাবে না।\n\n২. কিলজোন টাইমিং মেনে চলা:\nসারাদিন ট্রেড না করে শুধুমাত্র লন্ডন ওপেন ও নিউইয়র্ক ওপেনের সময় এন্ট্রি খুঁজুন যখন বড় বড় ব্যাংকগুলো বাজারে লিকুইডিটি ইনজেক্ট করে।`,
    date: 'October 2, 2026',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    author: 'Engr. Tanvir Ahmed',
    readTime: '6 min read',
    category: 'Prop Firm Blueprint',
    views: 1420,
    tags: ['Prop Firm', 'SMC', 'Risk Management', 'FTMO']
  },
  {
    id: 'blog-2',
    title_en: 'Understanding Fair Value Gaps (FVG) vs Order Blocks in High-Probability Setups',
    title_bn: 'হাই-প্রোবাবিলিটি ট্রেডিংয়ে ফেয়ার ভ্যালু গ্যাপ (FVG) ও অর্ডার ব্লকের পার্থক্য এবং ব্যবহার',
    slug: 'understanding-fvg-vs-orderblocks-trading',
    excerpt_en: 'Learn how algorithms pair liquidity voids with unmitigated institutional order blocks for pin-point reversal entries.',
    excerpt_bn: 'অ্যালগরিদমিক মার্কেটে ফেয়ার ভ্যালু গ্যাপ কীভাবে তৈরি হয় এবং অর্ডার ব্লকের সাথে মিলিয়ে কীভাবে নিখুঁত এন্ট্রি নেওয়া যায়।',
    content_en: `Many beginner SMC traders confuse an Order Block with a standard supply/demand zone. In reality, a genuine Order Block is the origin candle responsible for initiating an aggressive liquidity sweep followed immediately by a Fair Value Gap (imbalance).\n\nWhen price returns to test an Order Block, look for the overlapping FVG. The combination of these two elements provides the highest statistical probability of institutional mitigation.`,
    content_bn: `অনেক শিক্ষানবিস ট্রেডার সাধারণ সাপোর্ট-রেজিস্ট্যান্সকে অর্ডার ব্লক মনে করে ভুল করেন। কিন্তু আসল অর্ডার ব্লক হলো সেই ক্যান্ডেল যা লিকুইডিটি সুইপ করার পর একটি শক্তিশালী ফেয়ার ভ্যালু গ্যাপ (FVG) তৈরি করে। প্রাইস যখন পুনরায় সেই জোনে আসে, তখন এফভিজি এবং অর্ডার ব্লকের কনফ্লুয়েন্স সবচেয়ে শক্তিশালী রিভার্সাল সিগন্যাল তৈরি করে।`,
    date: 'September 24, 2026',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
    author: 'Mahmudul Hasan',
    readTime: '5 min read',
    category: 'Technical Strategy',
    views: 980,
    tags: ['FVG', 'Order Block', 'Technical Analysis']
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'payment',
    question_en: 'How do I pay with bKash, Nagad, or Rocket and receive my course/product?',
    question_bn: 'বিকাশ, নগদ বা রকেটে পেমেন্ট করার পর কীভাবে কোর্স বা প্রোডাক্ট এক্সেস পাব?',
    answer_en: 'Simply select your desired course or digital indicator, proceed to Checkout, and choose bKash, Nagad, or Rocket. Follow the instructions to Send Money to our official wallet number, then enter your Transaction ID (TrxID) and sender phone number. Once submitted, our system and admin desk verify the payment. Upon approval (usually within 5-20 minutes), your digital entitlement is automatically created, unlocking the course in "My Courses" and download files in "My Products" on your account dashboard.',
    answer_bn: 'আপনার পছন্দের কোর্স বা ডিজিটাল প্রোডাক্ট কার্টে নিয়ে চেকআউটে বিকাশ, নগদ বা রকেট নির্বাচন করুন। নির্দেশিত নাম্বারে সেন্ড মানি করে আপনার ট্রানজেকশন আইডি (TrxID) ও প্রেরক মোবাইল নাম্বার দিন। সাধারণত ৫-২০ মিনিটের মধ্যে পেমেন্ট ভেরিফাই করে সরাসরি আপনার একাউন্টে কোর্স ও ডাউনলোড ফাইল স্বয়ংক্রিয়ভাবে সক্রিয় হয়ে যাবে।'
  },
  {
    id: 'faq-2',
    category: 'courses',
    question_en: 'Are the courses recorded or live? Do I get lifetime access?',
    question_bn: 'কোর্সগুলো কি রেকর্ডেড নাকি লাইভ? কতদিনের এক্সেস পাওয়া যাবে?',
    answer_en: 'All BDIH courses feature high-definition on-demand video lessons, step-by-step curriculum modules, downloadable PDFs, and supplementary resources with Lifetime Access. You can learn at your own pace from mobile, tablet, or desktop, resume lessons anytime, and receive future curriculum updates at no extra cost.',
    answer_bn: 'সকল কোর্স ফুল এইচডি রেকর্ডেড মডিউল, লেকচার নোটস ও পিডিএফ রিসোর্স সহ আজীবন (লাইফটাইম) এক্সেস থাকে। যেকোনো সময় মোবাইল বা কম্পিউটার থেকে দেখতে পারবেন এবং ভবিষ্যতের সকল নতুন আপডেট সম্পূর্ণ ফ্রিতে পাবেন।'
  },
  {
    id: 'faq-3',
    category: 'indicators',
    question_en: 'How do I install the indicators on TradingView or MetaTrader 5?',
    question_bn: 'ট্রেডিংভিউ বা মেটাট্রেডার ৫ এ ইন্ডিকেটরগুলো কীভাবে ইন্সটল করব?',
    answer_en: 'For TradingView indicators, we grant direct Invite-Only script access to your TradingView profile and provide the Pine Script source code. For MT4/MT5 tools, compiled .ex4/.ex5 files and presets are available directly in your "My Products" portal with step-by-step video installation guides.',
    answer_bn: 'ট্রেডিংভিউ ইন্ডিকেটরের ক্ষেত্রে সরাসরি আপনার ট্রেডিংভিউ প্রোফাইলে ইনভাইট-অনলি এক্সেস ও পাইনস্ক্রিপ্ট কোড দেওয়া হয়। মেটাট্রেডার ৪ ও ৫ এর জন্য .ex4/.ex5 ফাইল এবং পূর্ণাঙ্গ ভিডিও টিউটোরিয়াল ড্যাশবোর্ডে পাবেন।'
  },
  {
    id: 'faq-4',
    category: 'access',
    question_en: 'Can I get 1-on-1 mentorship support if I have questions?',
    question_bn: 'শেখার সময় কোনো সমস্যা হলে কি সরাসরি মেন্টর সাপোর্ট পাওয়া যাবে?',
    answer_en: 'Yes! Every enrolled student and product owner receives direct access to our private BDIH Telegram Community and dedicated student support desk where instructors review charts, clarify setups, and host weekly Q&A sessions.',
    answer_bn: 'হ্যাঁ! প্রতিটি কোর্সের সাথে আমাদের প্রাইভেট বিডিআইএইচ টেলিগ্রাম গ্রুপ ও স্টুডেন্ট সাপোর্ট ডেস্কের এক্সেস পাবেন, যেখানে মেন্টররা সরাসরি চার্ট রিভিউ ও প্রশ্নের উত্তর দেন।'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  logoText: 'BANGLADESH INCOME HUB',
  exchangeRate: 120, // 1 USD = 120 BDT
  contactTelegram: 'https://t.me/bdih_official',
  contactEmail: 'support@bdih.com',
  contactFacebook: 'https://facebook.com/bangladeshincomehub',
  contactYoutube: 'https://youtube.com/c/bangladeshincomehub',
  announcementText_en: '🎓 New Enrollment Open: Smart Money Concepts (SMC) Masterclass 2026 Edition is now live! Use code BDIH50 for special discounts.',
  announcementText_bn: '🎓 নতুন ব্যাচ এনরোলমেন্ট শুরু: স্মার্ট মানি কনসেপ্টস (SMC) মাস্টারক্লাস ২০২৬ এডিশন এখন লাইভ! বিশেষ ছাড়ে আজই জয়েন করুন।',
  showAnnouncement: true,
  paymentBkashWallet: '01711-223344 (Personal / Send Money)',
  paymentNagadWallet: '01811-223344 (Personal / Send Money)',
  paymentRocketWallet: '01911-223344-7 (Personal / Send Money)',
  paymentBankAccount: 'City Bank Ltd, A/C: 1204859341001, Branch: Gulshan 2, Dhaka',
  paymentBinanceId: 'Binance Pay ID: 84920412 (USDT TRC20/BEP20)',
  seoTitle_en: 'BDIH - Bangladesh Income Hub | Digital Education, Precision Indicators & Trading Tools',
  seoTitle_bn: 'বিডিআইএইচ - বাংলাদেশ ইনকাম হাব | প্রফেশনাল ট্রেডিং কোর্স ও ডিজিটাল ইন্ডিকেটর প্ল্যাটফর্ম',
  seoDesc_en: 'The premier digital education platform in Bangladesh for institutional Smart Money Concepts (SMC), TradingView & MT5 indicators, prop-firm passing blueprints, and financial skills.',
  seoDesc_bn: 'বাংলাদেশি ট্রেডারদের জন্য প্রাতিষ্ঠানিক স্মার্ট মানি কনসেপ্টস (SMC), প্রিমিয়াম ট্রেডিংভিউ ও MT5 ইন্ডিকেটর এবং নির্ভরযোগ্য ডিজিটাল এডুকেশন প্ল্যাটফর্ম।',
  maintenanceMode: false,
  ownerTelegramUsername: '@bdih_admin_support',
  contactTelegramGroup: 'https://t.me/bdih_community',
  heroTitle_en: 'Master Institutional Trading & Digital Income Skills',
  heroTitle_bn: 'স্মার্ট মানি ট্রেডিং এবং ডিজিটাল স্কিলে তৈরি করুন আপনার ভবিষ্যৎ',
  heroSubtitle_en: 'Empowering Bangladeshi traders and learners with institutional Smart Money Concepts (SMC) masterclasses, proprietary TradingView & MT5 indicators, and high-performance digital tools.',
  heroSubtitle_bn: 'বাংলাদেশি ট্রেডার ও লার্নারদের জন্য প্রাতিষ্ঠানিক SMC কোর্স, এক্সক্লুসিভ ট্রেডিংভিউ ও MT5 ইন্ডিকেটর এবং হাই-পারফরম্যান্স ডিজিটাল রিসোর্সের নির্ভরযোগ্য হাব।',
  heroBtnShop_en: '🎓 Explore Masterclasses',
  heroBtnShop_bn: '🎓 সকল কোর্স দেখুন',
  heroBtnTelegram_en: '⚡ Precision Indicators',
  heroBtnTelegram_bn: '⚡ ট্রেডিং ইন্ডিকেটরস',
  enableGlassEffects: true,
  accentColor: '#38bdf8',
  footerText_en: 'Bangladesh Income Hub (BDIH) is the leading digital education and software ecosystem empowering traders and digital professionals with systematic edge.',
  footerText_bn: 'বাংলাদেশ ইনকাম হাব (বিডিআইএইচ) হচ্ছে আধুনিক ডিজিটাল এডুকেশন, স্মার্ট মানি ট্রেডিং কোর্স এবং অটোমেটেড ট্রেডিং ইন্ডিকেটরের নির্ভরযোগ্য প্ল্যাটফর্ম।',
  statsAccuracy: 92,
  statsMembers: 4850,
  statsEarnings: '$340K+',
  newsletterTitle_en: 'Join 4,800+ Smart Bangladeshi Traders & Learners',
  newsletterTitle_bn: 'যুক্ত হোন ৪,৮০০+ ট্রেডার ও লার্নারদের কমিউনিটিতে',
  newsletterSubtitle_en: 'Receive institutional weekly market analysis, new indicator release alerts, and exclusive student discounts straight to your inbox.',
  newsletterSubtitle_bn: 'সাপ্তাহিক মার্কেট আউটলুক, নতুন ইন্ডিকেটর রিলিজ এবং স্পেশাল ডিসকাউন্ট কুপন সরাসরি আপনার ইমেইলে পান।',
  customLogoUrl: '',
  customTimeText: 'সাপোর্ট ও ভেরিফিকেশন সময়: প্রতিদিন সকাল ০৯:০০ - রাত ১১:০০ টা পর্যন্ত',
  taglineText: 'জ্ঞান ও প্রযুক্তিতে ট্রেডিংয়ে অর্থনৈতিক মুক্তি',
  bloomIntensity: 2.5,
  bloomRadius: 1.2,
  uiTranslations: {
    nav_home: { en: 'Home', bn: 'হোম' },
    nav_courses: { en: 'Courses', bn: 'কোর্সসমূহ' },
    nav_indicators: { en: 'Indicators', bn: 'ট্রেডিং ইন্ডিকেটরস' },
    nav_products: { en: 'Digital Products', bn: 'ডিজিটাল প্রোডাক্টস' },
    nav_blog: { en: 'Blog & Analysis', bn: 'ব্লগ ও অ্যানালাইসিস' },
    nav_about: { en: 'About BDIH', bn: 'আমাদের সম্পর্কে' },
    nav_contact: { en: 'Contact Support', bn: 'যোগাযোগ' },
    cta_client_portal: { en: 'Student Dashboard', bn: 'স্টুডেন্ট ড্যাশবোর্ড' },
    cta_my_courses: { en: 'My Courses', bn: 'আমার কোর্সসমূহ' },
    cta_my_products: { en: 'My Products', bn: 'আমার প্রোডাক্টস' },
    cart_title: { en: 'My Cart', bn: 'শপিং কার্ট' },
    checkout_title: { en: 'Secure Checkout', bn: 'নিরাপদ চেকআউট' },
    order_tracking_title: { en: 'Order Verification & Status', bn: 'অর্ডার ভেরিফিকেশন স্ট্যাটাস' }
  }
};
