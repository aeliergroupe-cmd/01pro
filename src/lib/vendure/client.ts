import { GraphQLClient } from 'graphql-request';

const VENDURE_API_URL =
  process.env['NEXT_PUBLIC_VENDURE_SHOP_API_URL'] ?? 'http://localhost:3000/shop-api';

const CHANNEL_TOKEN = process.env['VENDURE_CHANNEL_TOKEN'];

const baseHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  ...(CHANNEL_TOKEN ? { 'vendure-token': CHANNEL_TOKEN } : {}),
};

/**
 * Server-side GraphQL client — forwards the Vendure session cookie
 * from the incoming Next.js request so the user's cart and auth state
 * are preserved across server component renders.
 */
export async function getServerClient(): Promise<GraphQLClient> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('vendure-auth-token')?.value;

  return new GraphQLClient(VENDURE_API_URL, {
    headers: {
      ...baseHeaders,
      ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
    },
    fetch: (url, options) =>
      fetch(url as string, {
        ...options,
        next: { revalidate: 0 },
        cache: 'no-store',
      }),
  });
}

/**
 * Client-side GraphQL client — the browser manages the session cookie
 * automatically via credentials: 'include'.
 */
export const vendureClient = new GraphQLClient(VENDURE_API_URL, {
  headers: baseHeaders,
  credentials: 'include',
});

/**
 * Execute a query/mutation server-side with optional revalidation.
 * Use `revalidate: 3600` for product/collection pages, `revalidate: 0`
 * for cart and account data.
 */
export async function serverQuery<T, V extends Record<string, unknown> = Record<string, unknown>>(
  document: string,
  variables?: V,
  revalidate: number | false = false
): Promise<T> {
  const client = await getServerClient();

  if (revalidate !== false) {
    client.setHeader(
      'cache-control',
      revalidate === 0 ? 'no-store' : `max-age=${revalidate}`
    );
  }

  return client.request<T>(document, variables);
}
