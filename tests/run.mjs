import { spawn, spawnSync } from 'node:child_process';

const server = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'dev', '--force', '--host', '127.0.0.1'], {
  env: { ...process.env, ASTRO_DEV_BACKGROUND: '0' },
  stdio: 'inherit',
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:4321', {
        signal: AbortSignal.timeout(500),
      });
      if (response.ok) return;
    } catch {
      // Server still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Astro dev server did not become ready.');
};

let exitCode = 1;
try {
  await waitForServer();
  const result = spawnSync(process.execPath, ['node_modules/playwright/cli.js', 'test'], {
    stdio: 'inherit',
  });
  exitCode = result.status ?? 1;
} finally {
  server.kill();
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:4321', {
        signal: AbortSignal.timeout(250),
      });
      if (response.ok && attempt === 19) {
        throw new Error('Astro test server remained reachable after the harness exited.');
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('remained reachable')) {
        throw error;
      }
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

process.exit(exitCode);
