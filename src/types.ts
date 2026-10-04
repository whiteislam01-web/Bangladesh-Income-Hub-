/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'bn';
export type Currency = 'USD' | 'BDT';

export type UserRole = 'OWNER' | 'ADMIN' | 'EDITOR' | 'SUPPORT' | 'CUSTOMER';

export type UserPermission = 
  | 'manage_users'
  | 'manage_courses'
  | 'manage_products'
  | 'manage_orders'
  | 'manage_payments'
  | 'manage_blog'
  | 'manage_media'
  | 'manage_reviews'
  | 'manage_settings'
  | 'manage_coupons'
  | 'view_analytics'
  | 'manage_homepage'
  | 'manage_navigation'
  | 'manage_site_content';

export interface AuthUser {
  id?: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isOwner?: boolean;
  phone?: string;
  role: UserRole;
  permissions?: UserPermission[];
}

export type ProductType = 
  | 'indicator' 
  | 'software' 
  | 'template' 
  | 'ebook' 
  | 'pdf' 
  | 'tool'
  | 'course' 
  | 'signals'
  | 'download';

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'zip' | 'link' | 'code' | 'excel';
  download_url: string;
  file_size?: string;
}

export interface CourseLesson {
  id: string;
  title_en: string;
  title_bn: string;
  order: number;
  duration_minutes: number;
  video_url: string; // Embed or mp4 stream url
  notes_en?: string;
  notes_bn?: string;
  resources?: LessonResource[];
  is_free_preview: boolean;
}

export interface CourseModule {
  id: string;
  title_en: string;
  title_bn: string;
  order: number;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title_en: string;
  title_bn: string;
  slug: string;
  short_desc_en: string;
  short_desc_bn: string;
  full_desc_en: string;
  full_desc_bn: string;
  price_usd: number;
  price_bdt: number;
  discount_usd?: number;
  discount_bdt?: number;
  level: 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  promo_video_url?: string;
  duration_hours: number;
  total_lessons: number;
  instructor_name: string;
  instructor_role: string;
  instructor_bio: string;
  modules: CourseModule[];
  is_published: boolean;
  is_featured: boolean;
  tags: string[];
  learning_outcomes_en: string[];
  learning_outcomes_bn: string[];
  prerequisites_en?: string[];
  prerequisites_bn?: string[];
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  lastLessonId: string;
  progressPercent: number;
  updatedAt: string;
}

export interface DigitalEntitlement {
  id: string;
  orderId: string;
  userId: string;
  itemType: 'course' | 'indicator' | 'product';
  itemId: string;
  title: string;
  grantedAt: string;
  accessUrl?: string;
  licenseKey?: string;
  status: 'active' | 'revoked';
}

export interface Product {
  id: string;
  title_en: string;
  title_bn: string;
  slug: string;
  short_desc_en: string;
  short_desc_bn: string;
  full_desc_en: string;
  full_desc_bn: string;
  price_usd: number;
  price_bdt: number;
  discount_usd?: number;
  discount_bdt?: number;
  category: string; // matches Category slug
  type: ProductType;
  platform?: 'TradingView' | 'MT4' | 'MT5' | 'Universal' | 'Web' | 'Notion' | 'PDF';
  image: string;
  video_url?: string;
  is_active: boolean;
  is_featured: boolean;
  download_file_url?: string;
  license_type?: 'Lifetime' | 'Single Account' | 'Unlimited';
  licenseKey?: string;
  access_instructions_en?: string;
  access_instructions_bn?: string;
  cta_text_en?: string;
  cta_text_bn?: string;
  tags: string[];
}

export interface Category {
  id: string;
  name_en: string;
  name_bn: string;
  slug: string;
  icon: string; // Lucide icon name
  description_en?: string;
  description_bn?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  title_en: string;
  title_bn: string;
  price_usd: number;
  price_bdt: number;
  quantity: number;
  itemType?: 'course' | 'indicator' | 'product';
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  telegramUsername?: string;
  paymentScreenshot?: string; // base64 screenshot proof
  gatewayName: 'bkash' | 'nagad' | 'rocket' | 'bank' | 'binance' | 'card';
  transactionId: string;
  senderPhone?: string;
  paymentProofStatus: 'pending' | 'approved' | 'rejected';
  items: OrderItem[];
  totalAmountBDT: number;
  totalAmountUSD: number;
  orderDate: string;
  trackingStatus: 'processing' | 'verified' | 'delivered' | 'cancelled';
  note?: string;
  deliveryLink?: string;
  entitlementsCreated?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  telegram?: string;
  role: 'student' | 'admin';
  enrolledCourseIds: string[];
  purchasedProductIds: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment_en: string;
  comment_bn: string;
  role_en: string;
  role_bn: string;
  approved: boolean;
  is_featured: boolean;
  country?: string;
  telegram?: string;
  screenshotUrl?: string;
  targetType?: 'course' | 'indicator' | 'general';
  targetId?: string;
}

export interface BlogPost {
  id: string;
  title_en: string;
  title_bn: string;
  slug: string;
  excerpt_en: string;
  excerpt_bn: string;
  content_en: string;
  content_bn: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
  category: string;
  views: number;
  tags: string[];
}

export interface FAQ {
  id: string;
  question_en: string;
  question_bn: string;
  answer_en: string;
  answer_bn: string;
  category?: 'courses' | 'indicators' | 'payment' | 'access';
}

export interface SiteSettings {
  logoText: string;
  exchangeRate: number; // 1 USD = X BDT
  contactTelegram: string;
  contactEmail: string;
  contactFacebook: string;
  contactYoutube: string;
  announcementText_en: string;
  announcementText_bn: string;
  showAnnouncement: boolean;
  paymentBkashWallet: string;
  paymentNagadWallet: string;
  paymentRocketWallet: string;
  paymentBankAccount: string;
  paymentBinanceId?: string;
  seoTitle_en: string;
  seoTitle_bn: string;
  seoDesc_en: string;
  seoDesc_bn: string;
  maintenanceMode: boolean;
  ownerTelegramUsername: string;
  contactTelegramGroup: string;
  heroTitle_en: string;
  heroTitle_bn: string;
  heroSubtitle_en: string;
  heroSubtitle_bn: string;
  heroBtnShop_en: string;
  heroBtnShop_bn: string;
  heroBtnTelegram_en: string;
  heroBtnTelegram_bn: string;
  enableGlassEffects: boolean;
  accentColor: string;
  footerText_en: string;
  footerText_bn: string;
  statsAccuracy: number;
  statsMembers: number;
  statsEarnings: string;
  newsletterTitle_en: string;
  newsletterTitle_bn: string;
  newsletterSubtitle_en: string;
  newsletterSubtitle_bn: string;
  customLogoUrl?: string;
  customTimeText?: string;
  taglineText?: string;
  bloomIntensity?: number;
  bloomRadius?: number;
  uiTranslations?: Record<string, { en: string; bn: string }>;
}

export type ViewType =
  | 'home'
  | 'shop'
  | 'product-details'
  | 'courses'
  | 'course-details'
  | 'learn'
  | 'signals'
  | 'indicators'
  | 'products'
  | 'services'
  | 'blog'
  | 'blog-details'
  | 'reviews'
  | 'faq'
  | 'about'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'login'
  | 'account'
  | 'my-courses'
  | 'my-products'
  | 'order-tracking'
  | 'downloads'
  | 'privacy'
  | 'terms'
  | 'refund'
  | 'admin'
  | 'owner'
  | 'forbidden'
  | 'auth-error';

export type AdminTab =
  | 'dashboard'
  | 'courses'
  | 'products'
  | 'indicators'
  | 'categories'
  | 'orders'
  | 'entitlements'
  | 'content'
  | 'settings'
  | 'reviews'
  | 'blogs'
  | 'faqs';
