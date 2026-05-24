'use server';

import { getServerClient } from '@/lib/vendure/client';
import { LOGIN, LOGOUT, REGISTER_CUSTOMER, GET_CURRENT_CUSTOMER } from '@/lib/vendure/mutations/account';
import { setSession, destroySession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export async function loginCustomer(email: string, password: string) {
  const client = await getServerClient();
  try {
    const data = await client.request(LOGIN, { username: email, password });
    const result = data?.login;
    if (result?.__typename === 'CurrentUser') {
      await setSession({
        id: result.id,
        email: result.identifier,
        firstName: '',
        lastName: '',
        vendureToken: result.channels?.[0]?.token,
      });
      return { success: true };
    }
    return { success: false, error: result?.message ?? 'Invalid credentials' };
  } catch {
    return { success: false, error: 'Authentication failed' };
  }
}

export async function logoutCustomer() {
  const client = await getServerClient();
  await client.request(LOGOUT);
  await destroySession();
  redirect('/');
}

export async function registerCustomer(data: {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}) {
  const client = await getServerClient();
  try {
    const result = await client.request(REGISTER_CUSTOMER, { input: data });
    return { success: true, data: result };
  } catch {
    return { success: false, error: 'Could not create account' };
  }
}

export async function getCurrentCustomer() {
  const client = await getServerClient();
  try {
    const data = await client.request(GET_CURRENT_CUSTOMER);
    return { success: true, customer: data?.activeCustomer ?? null };
  } catch {
    return { success: false, customer: null };
  }
}
