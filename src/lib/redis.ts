import Redis from 'ioredis';

const REDIS_URL = process.env['REDIS_URL'] ?? 'redis://localhost:6379';

declare global {
  // eslint-disable-next-line no-var
  var _redis: Redis | undefined;
}

function createRedisClient(): Redis {
  const client = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    lazyConnect: true,
  });

  client.on('error', (err) => {
    // Log Redis errors without crashing the server
    console.error('[Redis] Connection error:', err.message);
  });

  return client;
}

// Singleton to avoid multiple connections in development (Next.js hot reload)
export const redis: Redis =
  process.env['NODE_ENV'] === 'production'
    ? createRedisClient()
    : (globalThis._redis ?? (globalThis._redis = createRedisClient()));
