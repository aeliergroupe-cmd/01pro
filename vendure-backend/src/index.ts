import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';

const isMigrationRun = process.argv.includes('--run-migrations');

async function main() {
  if (isMigrationRun) {
    await runMigrations(config);
    process.exit(0);
  }

  const app = await bootstrap(config);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('[Vendure] Bootstrap failed:', err);
  process.exit(1);
});
