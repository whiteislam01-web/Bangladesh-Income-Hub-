/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabaseClient } from './client';
import { Order, DigitalEntitlement } from '../../types';

/**
 * Persists an order to Supabase
 */
export async function createOrderRecord(order: Order): Promise<{ success: boolean; error?: string }> {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase client unconfigured' };
  }

  const { error } = await supabaseClient.from('orders').insert([
    {
      id: order.id,
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      customer_phone: order.customerPhone,
      telegram_username: order.telegramUsername,
      gateway_name: order.gatewayName,
      transaction_id: order.transactionId,
      sender_phone: order.senderPhone,
      payment_proof_status: order.paymentProofStatus,
      total_amount_bdt: order.totalAmountBDT,
      total_amount_usd: order.totalAmountUSD,
      order_date: order.orderDate,
      tracking_status: order.trackingStatus,
      entitlements_created: order.entitlementsCreated,
    },
  ]);

  if (error) {
    console.warn('[BDIH Orders] Insert error:', error.message);
    return { success: false, error: error.message };
  }

  // Insert associated line items
  if (order.items?.length > 0) {
    const itemsPayload = order.items.map(it => ({
      id: it.id,
      order_id: order.id,
      product_id: it.productId,
      title_en: it.title_en,
      title_bn: it.title_bn,
      price_usd: it.price_usd,
      price_bdt: it.price_bdt,
      quantity: it.quantity,
      item_type: it.itemType || 'course',
    }));

    await supabaseClient.from('order_items').insert(itemsPayload);
  }

  return { success: true };
}

/**
 * Fetches order list with role-aware filtering
 */
export async function fetchOrdersFromSupabase(userEmail?: string, isAdmin = false): Promise<Order[]> {
  if (!supabaseClient) return [];

  let query = supabaseClient.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
  if (!isAdmin && userEmail) {
    query = query.eq('customer_email', userEmail);
  }

  const { data, error } = await query;
  if (error) {
    console.warn('[BDIH Orders] Query error:', error.message);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    telegramUsername: row.telegram_username,
    gatewayName: row.gateway_name,
    transactionId: row.transaction_id,
    senderPhone: row.sender_phone,
    paymentProofStatus: row.payment_proof_status,
    totalAmountBDT: Number(row.total_amount_bdt),
    totalAmountUSD: Number(row.total_amount_usd),
    orderDate: row.order_date,
    trackingStatus: row.tracking_status,
    entitlementsCreated: row.entitlements_created,
    items: (row.order_items || []).map((it: any) => ({
      id: it.id,
      productId: it.product_id,
      title_en: it.title_en,
      title_bn: it.title_bn,
      price_usd: Number(it.price_usd),
      price_bdt: Number(it.price_bdt),
      quantity: it.quantity,
      itemType: it.item_type,
    })),
  }));
}

/**
 * Verify order and issue entitlements via client or server endpoint
 */
export async function processOrderApproval(orderId: string, entitlements: DigitalEntitlement[]): Promise<boolean> {
  // If the server proxy is available, delegate privileged approval to server
  try {
    const res = await fetch('/api/admin/verify-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, entitlements }),
    });
    if (res.ok) {
      return true;
    }
  } catch {
    // Fall back to direct client call if server endpoint is not running
  }

  if (!supabaseClient) return false;

  const { error: orderErr } = await supabaseClient
    .from('orders')
    .update({
      payment_proof_status: 'approved',
      tracking_status: 'verified',
      entitlements_created: true,
    })
    .eq('id', orderId);

  if (orderErr) {
    console.warn('[BDIH Orders] Approval error:', orderErr.message);
    return false;
  }

  if (entitlements.length > 0) {
    await supabaseClient.from('entitlements').insert(
      entitlements.map(e => ({
        id: e.id,
        order_id: e.orderId,
        user_email: e.userId,
        item_type: e.itemType,
        item_id: e.itemId,
        title: e.title,
        granted_at: e.grantedAt,
        status: e.status,
        license_key: e.licenseKey,
      }))
    );
  }

  return true;
}
