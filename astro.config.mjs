// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://samland.minersonline.uk',
  integrations: [sitemap()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
    sessionKVBindingName: "Samland_Sessions"
  }),
  output: 'server',
});