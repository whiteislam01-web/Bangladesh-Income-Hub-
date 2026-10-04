/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabaseClient } from './client';
import { SiteSettings } from '../../types';

/**
 * Saves site settings to Supabase
 */
export async function persistSiteSettings(settings: SiteSettings): Promise<boolean> {
  if (!supabaseClient) return false;

  const { error } = await supabaseClient.from('site_settings').upsert({
    id: 'primary_config',
    site_name: settings.logoText || 'Bangladesh Income Hub',
    site_tagline: settings.seoTitle_en || 'Professional Trading Masterclasses, Indicators & Digital Products',
    custom_logo_url: settings.customLogoUrl,
    support_email: settings.contactEmail,
    official_telegram_group: settings.contactTelegramGroup || settings.contactTelegram,
    payment_bkash_wallet: settings.paymentBkashWallet,
    payment_nagad_wallet: settings.paymentNagadWallet,
    payment_rocket_wallet: settings.paymentRocketWallet,
    payment_bank_account: settings.paymentBankAccount,
    payment_binance_id: settings.paymentBinanceId,
    announcement_banner_en: settings.announcementText_en,
    announcement_banner_bn: settings.announcementText_bn,
    announcement_banner_active: settings.showAnnouncement,
    updated_at: new Date().toISOString(),
  });

  return !error;
}
