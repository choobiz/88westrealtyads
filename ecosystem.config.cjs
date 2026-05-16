/**
 * PM2 process registry for the 88west-go-landing data engine.
 *
 *   88w-scraper-cron   daily scrape — runs cron-runner.mjs at 14:17 UTC
 *                      (07:17 Pacific). Pulls latest main, runs all 3
 *                      scrapers, commits any data/ changes, pushes back.
 *                      Vercel auto-deploys on push.
 *
 * Cron timing chosen to avoid the :00 mark and the 03:00–06:00 UTC band
 * already used by other guesty-vm cron jobs.
 *
 * Kill switches (set in process env):
 *   ENABLE_CRON=false       — cron-runner exits without running scrapers
 *   ENABLE_SCRAPE=false     — only the listing-detail scraper short-circuits
 *                             (stats + developer scrapers still run)
 */

module.exports = {
  apps: [
    {
      name: '88w-scraper-cron',
      script: 'scripts/cron-runner.mjs',
      cwd: '/home/amir/88west-go-landing',
      autorestart: false,
      cron_restart: '17 14 * * *',
      watch: false,
      env: {
        ENABLE_CRON: 'true',
        ENABLE_SCRAPE: 'true',
      },
    },
  ],
};
