'use server';

import { getServerClient } from '@/lib/vendure/client';
import { ADD_ITEM_TO_ORDER, ADJUST_ORDER_LINE, REMOVE_ORDER_LINE } from '@/lib/vendure/mutations/cart';
import { GET_ACTIVE_ORDER } from '@/lib/vendure/queries/cart';
import { revalidatePath } from 'next/cache';

export async function addToCart(productVariantId: string, quantity: number) {
  const client = await getServerClient();
  try {
    const data = await client.request(ADD_ITEM_TO_ORDER, { productVariantId, quantity });
    revalidatePath('/', 'layout');
    return { success: true, data };
  } catch (error) {
    console.error('addToCart error:', error);
    return { success: false, error: 'Could not add item to cart' };
  }
}

export async function updateCartLine(orderLineId: string, quantity: number) {
  const client = await getServerClient();
  try {
    const data = await client.request(ADJUST_ORDER_LINE, { orderLineId, quantity });
    revalidatePath('/', 'layout');
    return { success: true, data };
  } catch (error) {
    console.error('updateCartLine error:', error);
    return { success: false, error: 'Could not update cart' };
  }
}

export async function removeFromCart(orderLineId: string) {
  const client = await getServerClient();
  try {
    const data = await client.request(REMOVE_ORDER_LINE, { orderLineId });
    revalidatePath('/', 'layout');
    return { success: true, data };
  } catch (error) {
    console.error('removeFromCart error:', error);
    return { success: false, error: 'Could not remove item from cart' };
  }
}

export async function getCart() {
  const client = await getServerClient();
  try {
    const data = await client.request(GET_ACTIVE_ORDER);
    return { success: true, data };
  } catch (error) {
    return { success: false, data: null };
  }
}
