import { redis } from '@/lib/redis';
import { cookies } from 'next/headers';
import type { SessionUser } from '@/types/account';

const SESSION_TTL = parseInt(process.env['SESSION_TTL'] ?? '2592000', 10);
const SESSION_PREFIX = 'ag:session:';
const SESSION_COOKIE = 'ag_session';

// Low-level: use explicit session ID (for raw use cases)
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
    if (!sessionId) return null;
    const data = await redis.get(`${SESSION_PREFIX}${sessionId}`);
    if (!data) return null;
    return JSON.parse(data) as SessionUser;
  } catch {
    return null;
  }
}

export async function setSession(user: SessionUser): Promise<void> {
  const sessionId = generateSessionId();
  await redis.setex(`${SESSION_PREFIX}${sessionId}`, SESSION_TTL, JSON.stringify(user));
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env['NODE_ENV'] === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL,
    path: '/',
  });
}

export async function destroySession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
    if (sessionId) {
      await redis.del(`${SESSION_PREFIX}${sessionId}`);
    }
    cookieStore.delete(SESSION_COOKIE);
  } catch {
    // Session may already be expired
  }
}

export async function refreshSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
    if (sessionId) {
      await redis.expire(`${SESSION_PREFIX}${sessionId}`, SESSION_TTL);
    }
  } catch {
    // ignore
  }
}

export function generateSessionId(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}
